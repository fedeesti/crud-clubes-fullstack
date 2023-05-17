import request, { SuperTest, Test } from 'supertest';
import e from 'express';
import { Server } from 'http';
import { createApp } from '../app';

let app: e.Express;
let server: Server;
let api: SuperTest<Test>;

describe('Teams Service', () => {
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

  describe('GET by ID', () => {
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

  describe('DELETE by ID', () => {
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
    describe('Store a team successfully', () => {
      test('should respond with a 201 status code and message that has been created', async () => {
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
    });
    describe('Missing or wrong fields', () => {
      test('when the required fields are not specified, it should respond with an array of error details.', async () => {
        const teamWithoutRequiredData = {
          website: 'http://www.acmilan.com',
          founded: 1905,
          venue: 'San Siro',
        };
        const requiredErrors = [
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
            field: 'tla',
            message: 'TLA is required',
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
        expect(body.message).toBe('Bad Request');
        expect(body.data).toEqual(requiredErrors);
      });
      test('when the email is invalid it should throw error details', async () => {
        const invalidEmail = [
          {
            email: 'http://www.acmilan.com',
          },
          {
            email: 'hola@com',
          },
          {
            email: 'hola',
          },
          {
            email: '1234',
          },
        ];

        const dataError = [
          {
            field: 'email',
            message: 'Please provide valid email',
          },
        ];

        for (let i = 0; i < invalidEmail.length; i++) {
          const { statusCode, body } = await api
            .post('/api/v1/teams')
            .send(invalidEmail[i])
            .set('Accept', 'application/json');

          expect(statusCode).toEqual(400);
          expect(body.message).toBe('Bad Request');
          expect(body.data).toEqual(expect.arrayContaining(dataError));
        }
      });
      test('when the phone is invalid it should throw error details', async () => {
        const invalidPhone = [{ phone: '+44  hola 9841955' }, { phone: '+44 (0871) hola' }, { phone: 'hola' }];

        const dataError = [
          {
            field: 'phone',
            message: 'Phone should be a valid phone number',
          },
        ];

        for (let i = 0; i < invalidPhone.length; i++) {
          const { statusCode, body } = await api
            .post('/api/v1/teams')
            .send(invalidPhone[i])
            .set('Accept', 'application/json');

          expect(statusCode).toEqual(400);
          expect(body.message).toBe('Bad Request');
          expect(body.data).toEqual(expect.arrayContaining(dataError));
        }
      });
      test('when the website is invalid it should throw error details', async () => {
        const invalidWebsite = [
          { website: 'www.acmil@angmail.com' },
          { website: 'mailto://acmilan.com' },
          { website: 'hola' },
          { website: 'fdp://www.acmilan.com' },
          { website: 'htps://www.acmilan.com' },
        ];

        const dataError = [
          {
            field: 'website',
            message: 'Website should be a URL',
          },
        ];

        for (let i = 0; i < invalidWebsite.length; i++) {
          const { statusCode, body } = await api
            .post('/api/v1/teams')
            .send(invalidWebsite[i])
            .set('Accept', 'application/json');

          expect(statusCode).toEqual(400);
          expect(body.message).toBe('Bad Request');
          expect(body.data).toEqual(expect.arrayContaining(dataError));
        }
      });
      test('when the address is invalid it should throw error details', async () => {
        const invalidAddress = [
          { address: 'hola@hola.com' },
          { address: 'mailto://acmilan.com' },
          { address: 'Leeds_United.svg' },
          { address: 'AC-Milan 4042' },
          { address: 'hola' },
          { address: 'P.sherman calle wallaby 42 sydney  Buscando a Nemo' },
        ];

        const dataError = [
          {
            field: 'address',
            message: 'Address should be a valid address',
          },
          {
            field: 'address',
            message: 'Address should be at least 7 chars long and maximum of 40 chars',
          },
        ];

        for (let i = 0; i < invalidAddress.length; i++) {
          const { statusCode, body } = await api
            .post('/api/v1/teams')
            .send(invalidAddress[i])
            .set('Accept', 'application/json');

          expect(statusCode).toEqual(400);
          expect(body.message).toBe('Bad Request');

          i <= 3
            ? expect(body.data).toEqual(expect.arrayContaining([expect.objectContaining(dataError[0])]))
            : expect(body.data).toEqual(expect.arrayContaining([expect.objectContaining(dataError[1])]));
        }
      });
      test('when the TLA is invalid it should throw error details', async () => {
        const invalidTla = [
          {
            tla: '19',
          },
          {
            tla: 'h@l',
          },
          {
            tla: '-12',
          },
          {
            tla: 'hola',
          },
        ];

        const dataError = [
          {
            field: 'tla',
            message: 'TLA only contains letters',
          },
          {
            field: 'tla',
            message: 'TLA must contain 3 chars',
          },
        ];

        for (let i = 0; i < invalidTla.length; i++) {
          const { statusCode, body } = await api
            .post('/api/v1/teams')
            .send(invalidTla[i])
            .set('Accept', 'application/json');

          expect(statusCode).toEqual(400);
          expect(body.message).toBe('Bad Request');

          i <= 2
            ? expect(body.data).toEqual(expect.arrayContaining([expect.objectContaining(dataError[0])]))
            : expect(body.data).toEqual(expect.arrayContaining([expect.objectContaining(dataError[1])]));
        }
      });
      test('when the clubColors is invalid it should throw error details', async () => {
        const invalidClubColors = [
          {
            clubColors: 'red . black',
          },
          {
            clubColors: 'red @ black',
          },
          {
            clubColors: 'red _ black',
          },
          {
            clubColors: 'red - black',
          },
          {
            clubColors: 'red / black / white / orange / blue',
          },
        ];

        const dataError = [
          {
            field: 'clubColors',
            message: 'clubColors only contains words, spaces and slash',
          },
          {
            field: 'clubColors',
            message: 'clubColors should be at least 3 chars long and maximum of 20 chars',
          },
        ];

        for (let i = 0; i < invalidClubColors.length; i++) {
          const { statusCode, body } = await api
            .post('/api/v1/teams')
            .send(invalidClubColors[i])
            .set('Accept', 'application/json');

          expect(statusCode).toEqual(400);
          expect(body.message).toBe('Bad Request');

          i <= 3
            ? expect(body.data).toEqual(expect.arrayContaining([expect.objectContaining(dataError[0])]))
            : expect(body.data).toEqual(expect.arrayContaining([expect.objectContaining(dataError[1])]));
        }
      });
      test('when the venue is invalid it should throw error details', async () => {
        const invalidVenue = [
          { venue: 'hola@hotmail.com' },
          { venue: 'https://www.acmilan.com' },
          { venue: '-Milan' },
          { venue: 'Milan-' },
          { venue: '.Milan' },
          { venue: 'Milan.' },
          { venue: 'Milan_' },
          { venue: '_Milan' },
          { venue: 'AC / Milan' },
          { venue: 'San' },
          { venue: 'Lorem ipsum dolor sit amet consectetur adipiscing elit' },
        ];

        const dataError = [
          {
            field: 'venue',
            message: "Venue should only contain alphanumeric, spaces and the next symbol: '-'",
          },
          {
            field: 'venue',
            message: 'Venue should be at least 7 chars long and maximum of 40 chars',
          },
        ];

        for (let i = 0; i < invalidVenue.length; i++) {
          const { statusCode, body } = await api
            .post('/api/v1/teams')
            .send(invalidVenue[i])
            .set('Accept', 'application/json');

          expect(statusCode).toEqual(400);
          expect(body.message).toBe('Bad Request');

          i <= 8
            ? expect(body.data).toEqual(expect.arrayContaining([expect.objectContaining(dataError[0])]))
            : expect(body.data).toEqual(expect.arrayContaining([expect.objectContaining(dataError[1])]));
        }
      });
      test('when the name is invalid it should throw error details', async () => {
        const invalidName = [
          { name: 'hola@hotmail.com' },
          { name: 'https://www.acmilan.com' },
          { name: '-Milan' },
          { name: 'Milan-' },
          { name: '.Milan' },
          { name: 'Milan.' },
          { name: 'Milan_' },
          { name: '_Milan' },
          { name: 'Milan' },
          { name: 'Lorem ipsum dolor sit amet cons' },
        ];

        const dataError = [
          {
            field: 'name',
            message: "Name should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            field: 'name',
            message: 'Name should be at least 7 chars long and maximum of 30 chars',
          },
        ];

        for (let i = 0; i < invalidName.length; i++) {
          const { statusCode, body } = await api
            .post('/api/v1/teams')
            .send(invalidName[i])
            .set('Accept', 'application/json');

          expect(statusCode).toEqual(400);
          expect(body.message).toBe('Bad Request');

          i <= 7
            ? expect(body.data).toEqual(expect.arrayContaining([expect.objectContaining(dataError[0])]))
            : expect(body.data).toEqual(expect.arrayContaining([expect.objectContaining(dataError[1])]));
        }
      });
      test('when the shortName is invalid it should throw error details', async () => {
        const invalidShortName = [
          { shortName: 'hola@hotmail.com' },
          { shortName: 'https://www.acmilan.com' },
          { shortName: '-Milan' },
          { shortName: 'Milan-' },
          { shortName: '.Milan' },
          { shortName: 'Milan.' },
          { shortName: 'Milan_' },
          { shortName: '_Milan' },
          { shortName: 'Mil' },
          { shortName: 'Lorem ipsum dolor sit' },
        ];

        const dataError = [
          {
            field: 'shortName',
            message: "ShortName should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            field: 'shortName',
            message: 'ShortName should be at least 4 chars long and maximum of 20 chars',
          },
        ];

        for (let i = 0; i < invalidShortName.length; i++) {
          const { statusCode, body } = await api
            .post('/api/v1/teams')
            .send(invalidShortName[i])
            .set('Accept', 'application/json');

          expect(statusCode).toEqual(400);
          expect(body.message).toBe('Bad Request');

          i <= 7
            ? expect(body.data).toEqual(expect.arrayContaining([expect.objectContaining(dataError[0])]))
            : expect(body.data).toEqual(expect.arrayContaining([expect.objectContaining(dataError[1])]));
        }
      });
    });
  });
});
