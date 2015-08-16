'use strict'

var React = require('react');
var Link = require('react-router').Link;

var HeaderSearch = require('./HeaderSearch.comp.jsx');
var Logo = require('../Logo/Logo.comp.jsx');
var Login = require('../LoginMixin/LoginMixin.mixin.jsx');

var Header = React.createClass({

  mixins: [Login],

  handleLoginClick: function() {
    this.openLogin();
  },

  render: function() {
    return (
      <div id='header'>
        {this.loginModal()}
        <div id='headerLeft'>
          <Link to="home"><Logo/></Link>
        </div>
        <div id='headerRight'>
          <HeaderSearch/>
          <div id='headerLogin'>
            <a onClick={this.handleLoginClick}>Log In</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Header;
