/**
 * CoordsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fetch = require('node-fetch');

module.exports = {
  fn: async (req, res) => {
    const lat = req.param('lat');
    const lon = req.param('lon');
    const response = await fetch(sails.config.weatherApi.baseUrl +
      '?lat=' +
      lat +
      '&lon=' +
      lon +
      '&units=%22metric%22', {
      'method': 'GET',
      'headers': sails.config.weatherApi.headers
    });
    if (response.ok)
    {
      const data = await response.json();
      const result = await sails.helpers.wrapData(data);
      return res.send(result);
    }
    else {
      return res.status(404).send();
    }
  }
};

