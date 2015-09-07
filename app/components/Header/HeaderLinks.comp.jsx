'use strict'

var React = require('react');

var State = require('react-router').State;
var Navigation = require('react-router').Navigation;

var classNames = require('classnames');

var LoginMixin = require('../LoginMixin/LoginMixin.mixin.jsx');
var SignupMixin = require('../SignupMixin/SignupMixin.mixin.jsx');

var SessionStore = require('../../stores/Session.store.js');
var SessionActions = require('../../actions/Session.actions.js');

var HeaderLinks = React.createClass({

  mixins: [Navigation, State, LoginMixin, SignupMixin],

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

  handleLinkClick: function(event) {
    switch(event.target.id) {
      case 'headerLinksHome':
        this.transitionTo('home');
        break;
      case 'headerLinksHow':
        this.transitionTo('howitworks');
        break;
    }
  },

  testActive: function(routeName) {
    return this.isActive(routeName, this.props.params, this.props.query);
  },

  render: function() {

    var log_in_out;
    if (this.state.hasSession) {
      log_in_out = <p onClick={this.handleLogoutClick}>Log out</p>
    } else {
      log_in_out =
        <p onClick={this.handleLoginClick}>Log in</p>
    }

    return (
      <div id='headerLinks'>
        {this.loginModal(this.openSignup)}
        {this.signupModal(this.openLogin)}
        <p
          id='headerLinksHome'
          className={classNames({active: this.testActive('home')})}
          onClick={this.handleLinkClick}>Home</p>
        <p
          id='headerLinksHow'
          className={classNames({active: this.testActive('howitworks')})}
          onClick={this.handleLinkClick}>How it works</p>
        <p
          id='headerLinksProfile'
          className={classNames({active: this.testActive('profile')})}
          onClick={this.handleLinkClick}>Profile</p>
        {log_in_out}
      </div>
    );
  }
});

module.exports = HeaderLinks;
