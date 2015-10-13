'use strict'

var React = require('react');

var State = require('react-router').State;
var Navigation = require('react-router').Navigation;

var classNames = require('classnames');

var LoginMixin = require('../LoginMixin/LoginMixin.mixin.jsx');
var SignupMixin = require('../SignupMixin/SignupMixin.mixin.jsx');
var MediaMixin = require('../MediaMixin/MediaMixin.mixin.jsx');

var SessionStore = require('../../stores/Session.store.js');
var SessionActions = require('../../actions/Session.actions.js');

var HeaderLinks = React.createClass({

  propTypes: {
    onIconClick: React.PropTypes.func.isRequired
  },

  mixins: [Navigation, State, LoginMixin, SignupMixin, MediaMixin],

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
      case 'headerLinksProfile':
        if (this.state.hasSession) {
          var userId = SessionStore.getSessionData().id;

          if (SessionStore.isIntern()) {
            this.transitionTo('interns', {id: userId});
          } else {
            this.transitionTo('orgs', {id: userId});
          }
        }
        break;
    }
  },

  testActive: function(routeName) {
    return this.isActive(routeName, this.props.params, this.props.query);
  },

  render: function() {

    if (this.state.media.break1) {
      return (
        <div id='headerLinks'>
          {this.loginModal(this.openSignup)}
          {this.signupModal(this.openLogin)}
          <img
            src='/img/bars_icon_white.svg'
            onClick={this.props.onIconClick}
          />
        </div>
      );
    }

    var log_in_out;
    if (this.state.hasSession) {
      log_in_out = (
        <p
          className='headerLink'
          onClick={this.handleLogoutClick}
        >
          Log out
        </p>
      );
    } else {
      log_in_out = (
        <p
          className='headerLink' 
          onClick={this.handleLoginClick}
        >
          Log in
        </p>
      );
    }

    return (
      <div id='headerLinks'>
        {this.loginModal(this.openSignup)}
        {this.signupModal(this.openLogin)}
        <p
          id='headerLinksHome'
          className={classNames('headerLink', {active: this.testActive('home')})}
          onClick={this.handleLinkClick}>Home</p>
        <p
          id='headerLinksHow'
          className={classNames('headerLink', {active: this.testActive('howitworks')})}
          onClick={this.handleLinkClick}>How it works</p>
        <p
          id='headerLinksProfile'
          className={classNames('headerLink', {active: this.testActive('profile')})}
          onClick={this.handleLinkClick}>Profile</p>
        {log_in_out}
      </div>
    );
  }
});

module.exports = HeaderLinks;
