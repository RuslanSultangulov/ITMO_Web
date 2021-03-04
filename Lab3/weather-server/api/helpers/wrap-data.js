module.exports = {
  inputs: {
    json: {
      type: 'ref',
      required: true
    }
  },
  fn: async function ({json}) {
    return {
      name: json.name,
      id: json.id,
      iconsrc: 'img/' + json.weather[0].icon + '.png',
      temperature: parseFloat(json.main.temp - 273.15).toFixed(0) + '°С',
      wind: 'Degree: ' + json.wind.deg + '°, ' + json.wind.speed + ' m/s',
      clouds: json.clouds.all + ' %',
      pressure: json.main.pressure + ' hpa',
      humidity: json.main.humidity + ' %',
      coords: '[' + json.coord.lat + ', ' + json.coord.lon + ']',
      cod: 200
    };
  }
};
