/**
 * AddController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async (req, res) => {
    const name = req.param('name');
    const id = req.param('id');
    const cityName = await sails.helpers.formatName(name);

    console.log('Creating record for city:' + cityName);
    await Favourites.create({
      cityName: cityName,
      cityID: id
    });
    console.log('Created');
    return res.status(201).send();
  }
};

