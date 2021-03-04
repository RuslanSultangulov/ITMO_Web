const supertest = require('supertest');
require('../../../lifecycle.test');

describe('DeleteController', () => {

  before(async () => {
    const agent = supertest.agent(sails.hooks.http.app);
    await agent
      .post('/favourites')
      .send({name: 'Paris', id: 8765});
  });

  it('Should delete city correctly and return status 410', async () => {
    const agent = supertest.agent(sails.hooks.http.app);
    await agent
      .delete('/favourites?id=8765')
      .send()
      .expect(410);
  });
  it('Should return status 404 if city does not exists', async () => {
    const agent = supertest.agent(sails.hooks.http.app);
    await agent
      .delete('/favourites?id=444')
      .send()
      .expect(404);
  });
});
