// --> /artist
const express = require('express')
const router = express();
const request = require('request');

const authString = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;
const encodedAuth = Buffer.from(authString, 'ascii').toString('base64');

// get a fresh token from Spotify
router.get('/token', (req, res, next) => {
  // Retrieve related artists
  request({
    method: 'POST',
    uri: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${encodedAuth}`
    },
    form: { 'grant_type': 'client_credentials' }
  },
  (err, response, body) => {
    if (err) next(err);
    res.send({ token: JSON.parse(body).access_token })
  })
})

module.exports = router;
