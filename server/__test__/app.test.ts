import request from 'supertest';
import { app } from '../app';

const api = request(app);

describe('GET /teams', () => {
  test('Teams are returned as json', async () => {
    const res = await api.get('/api/v1/teams');

    expect(res.status).toEqual(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
  });
});

describe('GET /teams/:id', () => {
  test('Team is returned as json', async () => {
    const res = await api.get('/api/v1/teams/64');

    expect(res.status).toEqual(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
  });

  test('Id does not match a team', async () => {
    const res = await api.get('/api/v1/teams/-1');

    expect(res.status).toEqual(404);
    expect(res.body.message).toBe('Team not found');
  });

  test('Get incorrect ID', async () => {
    const res = await api.get('/api/v1/teams/asd');

    expect(res.status).toEqual(400);
    expect(res.body.message).toBe('Bad Request');
  });
});
