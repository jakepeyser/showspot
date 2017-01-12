import React from 'react';
import Helmet from 'react-helmet';
import Navbar from './Navbar';

export default ({ children }) => (
  <div id="content-wrapper">
    <Helmet
      defaultTitle="ShowSpot"
      titleTemplate="%s | ShowSpot"
    />
    <Navbar />
    <div id="content">
      { children }
    </div>
  </div>
);
