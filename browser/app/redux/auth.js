import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

export const RECEIVED_TOKEN = 'RECEIVED_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

/* ------------   ACTION CREATORS     ------------------ */

export const receivedToken  = token => ({ type: RECEIVED_TOKEN, token });
export const removeToken  = () => ({ type: REMOVE_TOKEN });

/* --------------      REDUCER     ------------------ */

const initialToken = '';
export default function reducer(token = initialToken, action) {
  switch (action.type) {
    case RECEIVED_TOKEN:
      return action.token;
    case REMOVE_TOKEN:
      return initialToken;
    default:
      return token;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchToken = (cb) => dispatch => {
  axios.get('api/auth/token')
    .then(res => {
      dispatch(receivedToken(res.data.token))
      cb();
    })
    .catch(err => {
      console.error('Unable to get token', err)
      cb('Unable to connect to Spotify API');
    });
};
