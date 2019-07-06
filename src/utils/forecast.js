const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/e6d96180464b895205dfc59d519d77c8/${latitude},${longitude}?units=si`;
  request({
    url,
    json: true,
  }, (error, {body: data}) => {
    if(error) callback('A wild error appeared!', undefined);
    else if(data.error) callback('Invalid location given', undefined);
    else callback(undefined, data.daily.data[0].summary);
  })
};

module.exports = forecast;
