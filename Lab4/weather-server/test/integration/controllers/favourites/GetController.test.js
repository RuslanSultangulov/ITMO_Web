const supertest = require('supertest');
require('../../../lifecycle.test');
const assert = require('chai').assert;

describe('GetController', () => {

  before(async () => {
    const agent = supertest.agent(sails.hooks.http.app);
    await agent
      .post('/favourites')
      .send({name: 'London', id: 12345678})
    await agent
      .post('/favourites')
      .send({name: 'Milan', id: 87654321})
  });

  it('Should return all cities if not parameters were passed', async () => {
    const agent = supertest.agent(sails.hooks.http.app);
    const result = await agent
      .get('/favourites')
      .send()
      .expect(200);
    const body = result.body;
    assert.typeOf(body, 'array');
    assert.lengthOf(body, 2);
  });
  it('Should return status 409 if city exists', async () => {
    const agent = supertest.agent(sails.hooks.http.app);
    await agent
      .get('/favourites?name=London')
      .send()
      .expect(409);
  });
  it('Should return status 200 if city does not exists', async () => {
    const agent = supertest.agent(sails.hooks.http.app);
    await agent
      .get('/favourites?name=123')
      .send()
      .expect(200);
  });
});
