import request from 'supertest';
import { app } from '../app';

// const api = supertest(app);

describe('GET /teams', () => {
  test('teams are returned as json', async () => {
    const res = await request(app).get('/api/v1/teams');
    expect(res.status).toEqual(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
  });
});
