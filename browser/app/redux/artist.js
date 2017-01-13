import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

export const RECEIVED_ARTIST = 'RECEIVED_ARTIST';
export const REMOVE_ARTIST = 'REMOVE_ARTIST';

/* ------------   ACTION CREATORS     ------------------ */

export const receivedArtist  = artist => ({ type: RECEIVED_ARTIST, artist });
export const removeArtist  = () => ({ type: REMOVE_ARTIST });

/* --------------      REDUCER     ------------------ */

const initialArtist = {};
export default function reducer(artist = initialArtist, action) {
  switch (action.type) {
    case RECEIVED_ARTIST:
      return action.artist;
    case REMOVE_ARTIST:
      return initialArtist;
    default:
      return artist;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchArtist = (artistId, cb) => dispatch => {
  axios.get(`https://api.spotify.com/v1/artists/${artistId}`)
    .then(res => {
      dispatch(receivedArtist(res.data))
      cb();
    })
    .catch(err => {
      console.error('Unable to retrieve artist', err)
      cb(err);
    });
};
