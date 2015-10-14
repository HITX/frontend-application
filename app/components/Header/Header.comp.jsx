'use strict'

var React = require('react');

var HeaderLogo = require('./HeaderLogo.comp.jsx');
var HeaderSearch = require('./HeaderSearch.comp.jsx');
var HeaderLinks = require('./HeaderLinks.comp.jsx');

var Header = React.createClass({
  getInitialState: function() {
    return {showSlideout: false};
  },

  handleSearchIconClick: function() {
    console.log('Will handle search icon click here');
  },

  render: function() {
    return (
      <div id='headerContainer'>
        <div id='header'>
          <HeaderLogo/>
          <HeaderSearch onIconClick={this.handleSearchIconClick}/>
          <HeaderLinks/>
        </div>
      </div>
    );
  }
});

module.exports = Header;
