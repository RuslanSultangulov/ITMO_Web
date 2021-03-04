const supertest = require('supertest');
require('../../../lifecycle.test');

describe('AddController', () => {

  it('Should add cities correctly and return status 201', async () => {
    await supertest.agent(sails.hooks.http.app)
      .post('/favourites?name=SPB&id=1234')
      .send()
      .expect(201);
  });

  after(async () => {
    const agent = supertest.agent(sails.hooks.http.app);
    await agent
      .delete('/favourites?id=1234')
      .send();
  });
});
