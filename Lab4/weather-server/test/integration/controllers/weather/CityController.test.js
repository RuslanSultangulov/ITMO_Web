const supertest = require('supertest');
require('../../../lifecycle.test');
const fetch = require('node-fetch');
const sinon = require('sinon');

describe('CityController', () => {

  it('Should fetch city correcly', async () => {

    const fetchoutput = {
      clouds: {all: 90},
      coord: {lon: 30.37, lat: 59.92},
      main: {temp: 286.16, pressure: 1015, humidity: 93},
      weather: [
        {id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04n'}
      ],
      name: 'Smolenskoye',
      wind: {speed: 2, deg: 120},
      cod: 200
    };
    const cityName = 'Smolenskoye';

    // let stub = sinon.stub();
    // stub.expects('get')
    //   .once()
    //   .withArgs(sails.config.weatherApi.baseUrl +
    //   '?units=%2522metric%2522&q=' +
    //   cityName)
    //   .yields(null, fetchoutput);
    // // fetchMock.expects('get')
    // //   .once()
    // //   .withArgs(sails.config.weatherApi.baseUrl +
    // //   '?units=%2522metric%2522&q=' +
    // //   cityName)
    // //   .yields(null, fetchoutput);

    const agent = supertest.agent(sails.hooks.http.app);
   await agent
      .get('/weather/city?name=Smolenskoye')
      .send()
      .expect(200);
  });
  it('Should return status 404 if can not fetch city', async () => {

    const agent = supertest.agent(sails.hooks.http.app);
    await agent
      .get('/weather/city?name=UUU9777')
      .send()
      .expect(404);
  });
});
