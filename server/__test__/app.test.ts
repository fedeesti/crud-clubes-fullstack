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
    const { statusCode, headers } = await api.get('/api/v1/teams');

    expect(statusCode).toEqual(200);
    expect(headers['content-type']).toMatch(/application\/json/);
  });
});

describe('GET /teams/:id', () => {
  test('should respond with a 200 status code and json object that contains the team data', async () => {
    const { statusCode, headers } = await api.get('/api/v1/teams/64');

    expect(statusCode).toEqual(200);
    expect(headers['content-type']).toMatch(/application\/json/);
  });

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
});
