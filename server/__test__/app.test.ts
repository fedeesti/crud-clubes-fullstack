import request, { SuperTest, Test } from 'supertest';
import e from 'express';
import { Server } from 'http';
import { createApp } from '../app';

let app: e.Express;
let server: Server;
let api: SuperTest<Test>;

beforeEach(() => {
  app = createApp();
  server = app.listen(9000);
  api = request(app);
});

afterEach(() => {
  server.close();
});

describe('GET /teams', () => {
  test('should respond with a 200 status code and specify json as the content type in the http header', async () => {
    const { statusCode, headers, body } = await api.get('/api/v1/teams');
    const teams = body;

    expect(statusCode).toEqual(200);
    expect(headers['content-type']).toMatch(/application\/json/);
    expect(teams.length).toBe(20);
  });
});

describe('GET /teams/:id', () => {
  test('should respond with a 404 status code and show the message Team not found', async () => {
    const { statusCode, body } = await api.get('/api/v1/teams/-1');

    expect(statusCode).toEqual(404);
    expect(body.message).toBe('Team not found');
  });

  test('should respond with a 400 status code and show the message Bad Request', async () => {
    const { statusCode, body } = await api.get('/api/v1/teams/asd');

    expect(statusCode).toEqual(400);
    expect(body.message).toBe('Bad Request');
  });

  test('should respond with a 200 status code and json object that contains the team data', async () => {
    const { statusCode, headers, body } = await api.get('/api/v1/teams/64');

    expect(statusCode).toEqual(200);
    expect(headers['content-type']).toMatch(/application\/json/);
    expect(body.shortName).toBe('Liverpool');
    expect(body.tla).toBe('LIV');
    expect(body.venue).toBe('Anfield');
  });
});

describe('DELETE /teams/:id', () => {
  test('should respond with a 400 status code and show the message Bad Request', async () => {
    const { statusCode, body } = await api.delete('/api/v1/teams/asd');

    expect(statusCode).toEqual(400);
    expect(body.message).toBe('Bad Request');
  });
  test('should respond with a 404 status code and show the message Team not found', async () => {
    const { statusCode, body } = await api.delete('/api/v1/teams/-1');

    expect(statusCode).toEqual(404);
    expect(body.message).toBe('Team not found');
  });
  test('should respond with a 200 status code and show a message with the removed team ID', async () => {
    const { statusCode, body } = await api.delete('/api/v1/teams/64');

    expect(statusCode).toEqual(200);
    expect(body).toBe('the team with ID: 64 has been removed');
  });
});

describe('POST /teams', () => {
  test('should store a team with a 201 status code and the message that has been created successfully', async () => {
    const team = { name: 'AC Milan' };

    const res = await api.post('/api/v1/teams').send(team).set('Accept', 'application/json').expect(201);

    expect(res.body).toEqual('The team has been created successfully');
  });
});
