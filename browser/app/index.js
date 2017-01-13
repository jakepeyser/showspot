/* eslint-disable no-unused-vars*/

// React/Redux modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

// React containers and components
import App from './components/App';
import Search from './components/search/SearchContainer';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={ Search } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
