// --> /artist
const express = require('express')
const router = express();
const request = require('request');
const async = require('async');

// retrieve related shows for the requested artist
router.get('/:artistId/recommended-shows', (req, res, next) => {
  // Retrieve related artists
  request(`https://api.spotify.com/v1/artists/${req.params.artistId}/related-artists`, (err, response, body) => {
    if (err) next(err);

    // Construct the Bandsintown events search URI for each related artist
    const location = encodeURIComponent(req.query.location);
    const getRelatedArtists = JSON.parse(body).artists.map(arty => {
      return `http://api.bandsintown.com/artists/${arty.name}/events/search.json
              ?location=${location}&radius=20&app_id=${process.env.BANDSINTOWN_APP_ID}&api_version=2.0&format=json`;
    });

    // Make the Bandsintown calls in parallel and return results
    async.map(getRelatedArtists, (url, callback) => {
      request(url, (error, bitRes, bitBody) => callback(error, bitBody));
    }, (bitErr, results) => {
      if (bitErr) next(err);

      // Reduce all shows into a single array, sort them by date, and return them
      const shows = results
        .reduce((allShows, artistShows) => {
          return allShows.concat(JSON.parse(artistShows));
        }, [])
        .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

      res.send(shows)
    });
  })
})

module.exports = router;
