'use strict'

var React = require('react');
var Link = require('react-router').Link;

var Logo = require('../Logo/Logo.comp.jsx');

var NotFound = React.createClass({
  render: function() {
    return (
      <div id="notFound">
        <Logo/>
        <div id="notFoundContainer">
          <p id="notFoundTitle">Ummm... I think you took a wrong turn</p><br/>
          <div id="notFoundText">
            <p>This page doesn't exist. Hows about we </p>
            <Link to="home">Head Home</Link>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NotFound;
