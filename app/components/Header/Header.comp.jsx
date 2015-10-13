'use strict'

var React = require('react');

var HeaderLogo = require('./HeaderLogo.comp.jsx');
var HeaderSearch = require('./HeaderSearch.comp.jsx');
var HeaderLinks = require('./HeaderLinks.comp.jsx');

var Header = React.createClass({

  handleSearchIconClick: function() {
    console.log('Will handle search icon click here');
  },

  handleLinksIconClick: function() {
    console.log('Will handle links icon click here');
  },

  render: function() {

    return (
      <div id='headerContainer'>
        <div id='header'>
          <HeaderLogo/>
          <HeaderSearch onIconClick={this.handleSearchIconClick}/>
          <HeaderLinks onIconClick={this.handleLinksIconClick}/>
        </div>
      </div>
    );
  },

  old_render: function() {
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
