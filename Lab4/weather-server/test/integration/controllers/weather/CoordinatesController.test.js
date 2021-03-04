const supertest = require('supertest');
require('../../../lifecycle.test');
const fetch = require('node-fetch');
const sinon = require('sinon');

describe('CoordinatesController', () => {

  it('Should fetch by coords correcly', async () => {

    const agent = supertest.agent(sails.hooks.http.app);
    await agent
      .get('/weather/coordinates?lat=59.89&lon=30.26')
      .send()
      .expect(200);
  });

  it('Should return status 404 if can not fetch coordinates', async () => {
    const agent = supertest.agent(sails.hooks.http.app);
    await agent
      .get('/weather/coordinates?lat=44444&lon=4444')
      .send()
      .expect(404);
  });
});
