import Pretender from 'pretender';
import get from './Get';

let server;

beforeEach(function() {
  server = new Pretender(function () {
    this.mockResponse = (statusCode, responseBody = null) => {
      return function () {
        return [statusCode, {
          'Content-Type': responseBody ? 'application/json' : 'text/plain',
        }, responseBody ? JSON.stringify(responseBody) : null];
      }
    }

    this.get('/api/success', this.mockResponse(200, { hello: 'Test success!' }));
    this.get('/api/invalid', this.mockResponse(400, { error: 'Test invalid!' }));
    this.get('/api/notfound', this.mockResponse(404, { error: 'Test not found!' }));
    this.get('/api/nobody', this.mockResponse(503));
  });
});

afterEach(function() {
  server.shutdown();
});

it('works with three code paths', async () => {

  // Success cases
  //
  let result = await get('/api/success');

  expect(result).toBeTruthy();
  expect(result.hello).toBe('Test success!');

  // API failure cases -- Jest crashes when an Error is instantiated.
  // So these get's need to be wrapped in a try/catch
  //
  try {
    result = await get('/api/notfound');
  } catch(e) {
    result = e;
  }

  expect(result).toBeTruthy();
  expect(result.status).toBe(404);
  expect(result.response).toBeTruthy();
  expect(result.response.error).toBe('Test not found!');

  try {
    result = await get('/api/invalid');
  } catch(e) {
    result = e;
  }

  expect(result).toBeTruthy();
  expect(result.status).toBe(400);
  expect(result.response).toBeTruthy();
  expect(result.response.error).toBe('Test invalid!');

  // API failure cases
  //
  try {
    result = await get('/api/nobody');
  } catch(e) {
    result = e;
  }

  expect(result).toBeTruthy();
  expect(result.status).toBe(503);
  expect(result.response).toBeFalsy();
  expect(result.message).toMatch(/unexpected end/i);
});
