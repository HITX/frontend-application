'use strict'

var NodeApiConfig = require('../../../config/app/config.js').node_api;

var React = require('react');

var Link = require('react-router').Link;
var Navigation= require('react-router').Navigation;

var SessionStore = require('../../stores/Session.store.js');
var SessionActions = require('../../actions/Session.actions.js');

var KEY_CODE_ENTER = 13;
var LOGIN_URL = 'http://' + NodeApiConfig.hostname + ':' + NodeApiConfig.port + '/' + NodeApiConfig.login_path;

var LoginModal = React.createClass({

  mixins: [Navigation],

  getInitialState: function() {
    return {
      emailVal: '',
      passwordVal: '',
      message: ''
    };
  },

  _onChange: function() {
    if (SessionStore.hasSession()) {
      this.props.onRequestClose();
      this.transitionTo('home');
    }
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  killClick: function(e) {
    e.stopPropagation();
  },

  handleBackdropClick: function() {
    this.props.onRequestClose();
  },

  handleEmailChange: function(event) {
    this.setState({
      emailVal: event.target.value
    });
  },

  handlePasswordChange: function(event) {
    this.setState({
      passwordVal: event.target.value
    });
  },

  _credentialsInvalid: function() {
    if (this.state.emailVal == '') {
      this.setState({message: 'Email/Username required'});
      return true;
    }

    if (this.state.passwordVal == '') {
      this.setState({message: 'Password required'});
      return true;
    }

    return false;
  },

  handleSignupClick: function() {
    this.props.onRequestClose();
    this.props.onRequestSignup();
  },

  handleLoginClick: function() {

    if (this._credentialsInvalid()) {
      return;
    }

    Internshyps.login(this.state.emailVal, this.state.passwordVal, LOGIN_URL).then(
      function(result) {
        Internshyps.get('me', {'expand': 'submissions.project.owner'}).then(
          function(result) {
            SessionActions.loadSession(result.response);
          },
          function(err) {
            console.log(err);
            this.setState({ message: 'Error retrieving user data' });
            Internshyps.logout();
            SessionActions.dropSession();
          }.bind(this)
        );
      }.bind(this),
      function(err) {
        this.setState({ message: 'Invalid User/Password' });
      }.bind(this)
    );
  },

  handleKeyDown: function(event) {
    if (event.keyCode == KEY_CODE_ENTER) {
      this.handleLoginClick();
    }
  },

  render: function() {
    return (
      <div id='login' onClick={this.handleBackdropClick}>
        <div id='loginContent' onClick={this.killClick}>
          <p id='loginTitle'>OHai!</p>
          <input
            id='loginEmail'
            type='text'
            placeholder='Email / Username'
            value={this.state.emailVal}
            onChange={this.handleEmailChange}
            onKeyDown={this.handleKeyDown}/>
          <input
            id='loginPassword'
            type='password'
            placeholder='Password'
            value={this.state.passwordVal}
            onChange={this.handlePasswordChange}
            onKeyDown={this.handleKeyDown}/>
          <div id='loginMessage'>
            <p>{this.state.message}&nbsp;</p>
          </div>
          <div id='loginSubmit'>
            <button id='loginSubmitButton' onClick={this.handleLoginClick}>Log In</button>
            <p id='loginSubmitText'>Forgot Password?</p>
          </div>
          <hr/>
          <div id='loginSignup'>
            <p id='loginSignupText'>Don't have an account?</p>
            <button id='loginSignupButton' onClick={this.handleSignupClick}>Sign Up</button>
          </div>
        </div>
      </div>
    );
  }
});

var LoginMixin = {

  _closeLogin: function() {
    this.setState({showLogin: false});
  },

  getInitialState: function() {
    return {showLogin: false};
  },

  openLogin: function() {
    this.setState({showLogin: true});
  },

  loginModal: function(signupHandler) {
    return this.state.showLogin
      ? <LoginModal
          onRequestClose={this._closeLogin}
          onRequestSignup={signupHandler}/>
        : {};
  }
};

module.exports = LoginMixin;
