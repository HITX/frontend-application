'use strict'

var React = require('react');
var Link = require('react-router').Link;

var LoginModal = React.createClass({

  killClick: function(e) {
    e.stopPropagation();
  },

  handleBackdropClick: function() {
    this.props.onRequestClose();
  },

  render: function() {
    return (
      <div id='login' onClick={this.handleBackdropClick}>
        <div id='loginContent' onClick={this.killClick}>
          <p id='loginTitle'>Welcome</p>
          <input id='loginEmail' type='text' placeholder='Email / Username'/>
          <input id='loginPassword' type='password' placeholder='Password'/>
          <div id='loginSubmit'>
            <button id='loginSubmitButton'>Log In</button>
            <p id='loginSubmitText'>Forgot Password?</p>
          </div>
          <hr/>
          <div id='loginSignup'>
            <p id='loginSignupText'>Don't have an account?</p>
            <Link to='signup'>
              <button id='loginSignupButton' onClick={this.props.onRequestClose}>
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
});

var LoginMixin = {
  _close: function() {
    this.setState({showLogin: false});
  },

  getInitialState: function() {
    return {showLogin: false};
  },

  openLogin: function() {
    this.setState({showLogin: true});
  },

  loginModal: function() {
    return this.state.showLogin ? <LoginModal onRequestClose={this._close}/> : {};
  }
};

module.exports = LoginMixin;
