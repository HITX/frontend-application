'use strict'

var React = require('react');

var HeaderLogo = require('./HeaderLogo.comp.jsx');
var HeaderSearch = require('./HeaderSearch.comp.jsx');
var HeaderLinks = require('./HeaderLinks.comp.jsx');

var Header = React.createClass({
  render: function() {
    return (
      <div id='headerContainer'>
        <div id='header'>
          <HeaderLogo/>
          <HeaderLinks/>
          <HeaderSearch/>
        </div>
      </div>
    );
  }
});

module.exports = Header;
