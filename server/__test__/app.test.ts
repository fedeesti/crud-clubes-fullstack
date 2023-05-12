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
    const { statusCode, body } = await api.get('/api/v1/teams/99999999999');

    expect(statusCode).toEqual(404);
    expect(body.message).toBe('Team not found');
  });

  test('should respond with a 400 status code and show the message Bad Request', async () => {
    const errorsData = [{ field: 'id', message: 'ID is wrong, its must be a number' }];

    const { statusCode, body } = await api.get('/api/v1/teams/asd');

    expect(statusCode).toEqual(400);
    expect(body.message).toBe('Bad Request');
    expect(body.data).toEqual(expect.arrayContaining(errorsData));
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
    const errorsData = [{ field: 'id', message: 'ID is wrong, its must be a number' }];

    const { statusCode, body } = await api.delete('/api/v1/teams/asd');

    expect(statusCode).toEqual(400);
    expect(body.message).toBe('Bad Request');
    expect(body.data).toEqual(expect.arrayContaining(errorsData));
  });
  test('should respond with a 404 status code and show the message Team not found', async () => {
    const { statusCode, body } = await api.delete('/api/v1/teams/99999999999');

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
    const team = {
      id: 1,
      area: {
        id: 2002,
        name: 'Italy',
      },
      name: 'AC Milán',
      crestUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Leeds_United.svg',
      address: 'Anfield Road Liverpool L4 OTH',
      shortName: 'Milán',
      tla: 'MIL',
      phone: '+44 (0871) 9841955',
      website: 'http://www.acmilan.com',
      email: null,
      founded: 1905,
      clubColors: 'Red / Black',
      venue: 'San Siro',
      lastUpdated: '2020-05-14T02:41:41Z',
    };

    const { body } = await api.post('/api/v1/teams').send(team).set('Accept', 'application/json').expect(201);

    expect(body).toEqual('The team has been created successfully');
  });
  test('should respond with a 400 status code, show the message Bad Request and an array with required validator errors', async () => {
    const teamWithoutRequiredData = {
      website: 'http://www.acmilan.com',
      founded: 1905,
      venue: 'San Siro',
    };
    const requiredErrors = [
      {
        field: 'id',
        message: 'ID is required',
      },
      {
        field: 'area.id',
        message: 'Country ID is required',
      },
      {
        field: 'area.name',
        message: 'Country is required',
      },
      {
        field: 'name',
        message: 'Name is required',
      },
      {
        field: 'shortName',
        message: 'shortName is required',
      },
      {
        field: 'crestUrl',
        message: 'Image is required',
      },
      {
        field: 'clubColors',
        message: 'Team colors is required',
      },
    ];

    const { statusCode, body } = await api
      .post('/api/v1/teams')
      .send(teamWithoutRequiredData)
      .set('Accept', 'application/json');

    expect(statusCode).toEqual(400);
    expect(body.data).toEqual(requiredErrors);
  });
});
