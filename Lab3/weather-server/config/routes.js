/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  '/': { view: 'pages/homepage' },
  '/*': { cors: true },
  '/weather/coordinates': { controller: 'weather/CoordinatesController', action: 'fn' },
  '/weather/city': { controller: 'weather/CityController', action: 'fn' },
  'POST /favourites': {controller: 'favourites/AddController', action: 'fn'},
  'GET /favourites': {controller: 'favourites/GetController', action: 'fn'},
  'DELETE /favourites': {controller: 'favourites/DeleteController', action: 'fn'}
};
