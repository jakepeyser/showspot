import React from 'react';
import { Link } from 'react-router';
import Logo from '../../src/images/logo.svg';

export default () => (
  <div id="navbar">
    <Link to="/">
      <div className="nav-title">
        <div className="logo-wrapper">
          <Logo />
        </div>
        <h1>ShowSpot</h1>
      </div>
    </Link>
  </div>
)
