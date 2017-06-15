// --> /artist
const express = require('express')
const router = express();
const request = require('request');
const async = require('async');

// retrieve related shows for the requested artist
router.get('/:artistId/recommended-shows', (req, res, next) => {
  // Double check authorization
  console.log(req.headers)
  if (!req.headers.authorization) {
    return next({
      status: 403,
      message: 'No token provided'
    })
  }

  // Retrieve related artists
  request({
    method: 'GET',
    uri: `https://api.spotify.com/v1/artists/${req.params.artistId}/related-artists`,
    headers: { 'Authorization': `Bearer ${req.headers.authorization}` }
  },
  (err, response, body) => {
    if (err) return next(err)
    body = JSON.parse(body)
    if (body.error) return next(body.error)

    // Construct the Bandsintown events search URI for each related artist
    const location = encodeURIComponent(req.query.location);
    const getRelatedArtists = body.artists.map(arty => {
      return `http://api.bandsintown.com/artists/${arty.name}/events/search.json
              ?location=${location}&radius=20&app_id=${process.env.BANDSINTOWN_APP_ID}&api_version=2.0&format=json`;
    });

    // Make the Bandsintown calls in parallel and return results
    async.map(getRelatedArtists, (url, callback) => {
      request(url, (error, bitRes, bitBody) => callback(error, bitBody));
    }, (bitErr, results) => {
      if (bitErr) next(err);

      // Reduce all shows into a single array
      // filter out the unrecognized artist errors
      // sand ort them by date
      const shows = results
        .reduce((allShows, artistShows) => {
          return allShows.concat(JSON.parse(artistShows));
        }, [])
        .filter(show => !show.errors || show.errors[0] !== 'Unknown Artist')
        .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

      // Examine shows for invalid location response
      // Otherwise, send shows as results
      if (shows.length && shows[0].errors &&
          shows[0].errors[0] === 'Unknown Location') {
        next({
          status: 400,
          message: 'Invalid location, please check your search query'
        });
      } else {
        res.send(shows);
      }
    });
  })
})

module.exports = router;
