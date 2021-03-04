module.exports = {
  inputs: {
    cityName: {
      type: 'string',
      required: true
    }
  },
  fn: async function ({cityName}) {
    return cityName.replace(/-/g, ' ').replace(/ /g, '%20');
  }
};
