/* eslint-disable no-unused-vars*/

// React/Redux modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

// Redux Actions and Thunks

import store from './store';
import { fetchArtist, removeArtist } from './redux/artist';
import { fetchToken } from './redux/auth';

// React containers and components
import App from './components/App';
import Search from './components/search/SearchContainer';
import Artist from './components/artist/Artist';

// Get Spotify token
const appEnter = (nextState, replace, cb) => {
  store.dispatch(fetchToken(cb));
};

// Entry/exit hooks for /artists/:id
const artistEnter = (nextState, replace, cb) => {
  store.dispatch(fetchArtist(nextState.params.artistId, cb));
};
const artistLeave = (nextState) => store.dispatch(removeArtist());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={ appEnter }>
        <Route path="/artists/:artistId" component= { Artist }
          onEnter={ artistEnter } onLeave={ artistLeave } />
        <IndexRoute component={ Search } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
