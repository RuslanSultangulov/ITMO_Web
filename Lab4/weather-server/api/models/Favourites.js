/**
 * Favourites.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'favourites',

  attributes: {
    cityName: {
      type: 'string',
      columnName: 'city_name',
      required: true
    },
    cityID: {
      type: 'number',
      columnName: 'city_id',
      required: true
    }
  },
};
