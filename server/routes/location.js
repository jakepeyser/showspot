// --> /location
const express = require('express')
const router = express();
const request = require('request');

// retrieve the city, state for the input lat/lon
router.get('/reverse-geocode', (req, res, next) => {
  const { lat, lon } = req.query;
  const apiKey = process.env.GOOGLE_API_KEY;
  request(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`, (err, response, body) => {
    if (err) return next(err);

    // Look for a result with both city & state
    const places = JSON.parse(body).results;
    for (let i = 0; i < places.length; i++) {
      let city, state;
      places[i].address_components.forEach(comps => {
        if (comps.types.indexOf('locality') !== -1) {
          city = comps.long_name;
        } else if (comps.types.indexOf('administrative_area_level_1') !== -1) {
          state = comps.short_name;
        }
      })
      // Send back result only if both city and state were found
      if (city && state) {
        return res.send({ city, state })
      } else {
        city = state = '';
      }
    }
    res.status(404).send('Location not found for input coordinates')
  });
})

module.exports = router;
