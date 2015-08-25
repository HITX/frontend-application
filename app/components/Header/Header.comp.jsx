'use strict'

var React = require('react');
var Link = require('react-router').Link;

var HeaderSearch = require('./HeaderSearch.comp.jsx');
var Logo = require('../Logo/Logo.comp.jsx');
var LoginMixin = require('../LoginMixin/LoginMixin.mixin.jsx');
var SignupMixin = require('../SignupMixin/SignupMixin.mixin.jsx');

var SessionStore = require('../../stores/Session.store.js');
var SessionActions = require('../../actions/Session.actions.js');

var Header = React.createClass({

  mixins: [LoginMixin, SignupMixin],

  getInitialState: function() {
    return {
      hasSession: SessionStore.hasSession()
    };
  },

  _onChange: function() {
    this.setState({
      hasSession: SessionStore.hasSession()
    });
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
    this.signup
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  handleLoginClick: function() {
    this.openLogin();
  },

  handleLogoutClick: function() {
    Internshyps.logout();
    SessionActions.dropSession();
  },

  render: function() {

    var log_in_out;
    if (this.state.hasSession) {
      log_in_out =
        <div id='headerLogout'>
          <a onClick={this.handleLogoutClick}>Log Out</a>
        </div>
    } else {
      log_in_out =
        <div id='headerLogin'>
          <a onClick={this.handleLoginClick}>Log In</a>
        </div>
    }

    return (
      <div id='header'>
        {this.loginModal(this.openSignup)}
        {this.signupModal(this.openLogin)}
        <div id='headerLeft'>
          <Link to="home"><Logo/></Link>
        </div>
        <div id='headerRight'>
          <HeaderSearch/>
          {log_in_out}
        </div>
      </div>
    );
  }
});

module.exports = Header;
