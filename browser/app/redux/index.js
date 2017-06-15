import { combineReducers } from 'redux';
import artist from './artist';
import auth from './auth';

export default combineReducers({
  artist,
  token: auth
});
