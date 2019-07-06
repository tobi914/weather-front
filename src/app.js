const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define paths for express config
const viewsPath = path.join(__dirname, '../public/templates/views');
const partialsPath = path.join(__dirname, '../public/templates/partials');
const app = express();

const port = process.env.PORT || 3001;
console.log(port);

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Tobi',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About the weather app',
    name: 'Tobi',
    text: 'blabla blabla and much more!'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Tobi',
    message: 'Nothing can save you!',
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.address) res.send({
    error: 'No Address specified',
  });
  else {
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
      if(error) res.send({
        error
      });

      else {
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) res.send({
            error
          });
          res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address
          });
        })
      };
    });
  }
});

app.get('/products', (req, res) => {
  if(!req.query.search) {
    res.send({
      error: 'No search specified',
    })
  }
  else {
    console.log(req.query);
    res.send({
      products: [],
    });
  }
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Page not found',
    text: 'Help article not found',
    name: 'Tobi',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Page not found',
    text: 'Page not Found',
    name: 'Tobi'
  });
});

app.listen(port, () => {
  console.log('Server started correctly on port 3000');
});
