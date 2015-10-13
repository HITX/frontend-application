'use strict'

var React = require('react');

var HeaderLogo = require('./HeaderLogo.comp.jsx');
var HeaderSearch = require('./HeaderSearch.comp.jsx');
var HeaderLinks = require('./HeaderLinks.comp.jsx');
var HeaderSlideout = require('./HeaderSlideout.comp.jsx');

var MediaMixin = require('../MediaMixin/MediaMixin.mixin.jsx');

var Header = React.createClass({

  mixins: [MediaMixin],

  getInitialState: function() {
    return {showSlideout: false};
  },

  handleSearchIconClick: function() {
    console.log('Will handle search icon click here');
  },

  handleLinksIconClick: function() {
    this.setState({showSlideout: true});
  },

  handleSlideoutClose: function() {
    this.setState({showSlideout: false});
  },

  render: function() {
    var slideOut = null;
    if (this.state.media.break1) {
      slideOut = (
        <HeaderSlideout
          visible={this.state.showSlideout}
          onClose={this.handleSlideoutClose}
        />
      );
    }

    return (
      <div id='headerContainer'>
        <div id='header'>
          {slideOut}
          <HeaderLogo/>
          <HeaderSearch onIconClick={this.handleSearchIconClick}/>
          <HeaderLinks onIconClick={this.handleLinksIconClick}/>
        </div>
      </div>
    );
  }
});

module.exports = Header;
