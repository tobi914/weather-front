const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidG9iaTkxNCIsImEiOiJjanhxNTRyaWkwbXh3M29ybmtkZGVlZDdlIn0.xwaGtAf-M1_2MQc-mcBmCw`;
  request({
    url,
    json: true
  }, (error, {body: data}) => {
    if(error) callback('Unable to connect to location services.', undefined);
    else if(data.features.length === 0) callback('Unable to find location. Please try another search', undefined);
    else callback(undefined, {
        latitude: data.features[0].center[1],
        longitude: data.features[0].center[0],
        location: data.features[0].place_name,
      })
  });
};

module.exports = geocode;
