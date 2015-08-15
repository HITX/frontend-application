'use strict'

var React = require('react');
var Link = require('react-router').Link;

var HeaderSearch = require('./HeaderSearch.comp.jsx');
var Logo = require('../Logo/Logo.comp.jsx');

var Header = React.createClass({
  render: function() {
    return (
      <div id='header'>
        <div id='headerLeft'>
          <Link to="home"><Logo/></Link>
        </div>
        <div id='headerRight'>
          <HeaderSearch/>
          <div id='headerLogin'>
            <a>Log In</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Header;
