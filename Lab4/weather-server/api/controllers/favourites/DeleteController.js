/**
 * DeleteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async (req, res) => {
    const id = req.param('id');
    console.log('Searching for city with city_id:' + id);
    const city = await Favourites.find({where: {cityID: id}});
    if (city.length !== 0 ) {
      console.log('Found city:' + city + '. Deleting.');
      await Favourites.destroy({where: {cityID: id}});
      console.log('Destroyed');
      return res.status(410).send();
    } else {
      console.log('Did not find city to destroy');
      return res.status(404).send();
    }
  }
};


