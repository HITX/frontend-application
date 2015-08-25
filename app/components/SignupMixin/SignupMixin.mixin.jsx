'use strict'

var React = require('react');

var Navigation= require('react-router').Navigation;

var SessionStore = require('../../stores/Session.store.js');
var SessionActions = require('../../actions/Session.actions.js');

var INPUTS = {
  firstName: {name: 'First Name', required: false},
  lastName: {name: 'Last Name', required: false},
  username: {name: 'Username', required: true},
  email: {name: 'Email', required: true},
  password: {name: 'Password', required: true},
  passwordCheck: {name: 'Password Check', required: true}
}

var SignupModal = React.createClass({

  mixins: [Navigation],

  getInitialState: function() {
    var state = { message: '' }

    for (var input in INPUTS) {
      state[input] = '';
    }

    return state;
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

  handleInputChange: function(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },

  _inputInvalid: function() {
    for (var input in INPUTS) {
      if (INPUTS[input].required && this.state[input] == '') {
        this.setState({ message: INPUTS[input].name + ' required' });
        return true;
      }
    }

    if (this.state.password != this.state.passwordCheck) {
      this.setState({ message: 'Password check does not match' });
      return true;
    }

    return false;
  },

  handleLoginClick: function() {
    this.props.onRequestClose();
    this.props.onRequestLogin();
  },

  handleSignupClick: function() {

    if (this._inputInvalid()) {
      return;
    }

    var data = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    Internshyps.post('users', data).then(
      function(result) {
        this.setState({ messages: 'User created. Logging in...' });

        Internshyps.login(data.username, data.password, 'http://localhost:8080/api/login').then(
          function(result) {
            Internshyps.get('users/me').then(
              function(result) {
                SessionActions.loadSession(result.response);
              },
              function(err) {
                this.setState({ message: 'Error retrieving user data' });
                Internshyps.logout();
                SessionActions.dropSession();
              }.bind(this)
            );
          },
          function(err) {
            this.setState({ message: 'Error logging in to new user' });
          }.bind(this)
        );
      }.bind(this),
      function(err) {
        this.setState({ message: 'Cannot create user \'' + data.username + '\'' });
      }.bind(this)
    );
  },

  render: function() {
    return (
      <div id='signup' onClick={this.handleBackdropClick}>
        <div id='signupContent' onClick={this.killClick}>
          <p id='signupTitle'>Sign Up Bro!</p>
          <input
            id='firstName'
            className='signupInput'
            type='text'
            placeholder={INPUTS.firstName.name}
            value={this.state.firstName}
            onChange={this.handleInputChange}/>
          <input
            id='lastName'
            className='signupInput'
            type='text'
            placeholder={INPUTS.lastName.name}
            value={this.state.lastName}
            onChange={this.handleInputChange}/>
          <input
            id='username'
            className='signupInput'
            type='text'
            placeholder={INPUTS.username.name}
            value={this.state.username}
            onChange={this.handleInputChange}/>
          <input
            id='email'
            className='signupInput'
            type='text'
            placeholder={INPUTS.email.name}
            value={this.state.email}
            onChange={this.handleInputChange}/>
          <input
            id='password'
            className='signupInput'
            type='password'
            placeholder={INPUTS.password.name}
            value={this.state.password}
            onChange={this.handleInputChange}/>
          <input
            id='passwordCheck'
            className='signupInput'
            type='password'
            placeholder={INPUTS.passwordCheck.name}
            value={this.state.passwordCheck}
            onChange={this.handleInputChange}/>
          <div id='signupMessage'>
            <p>{this.state.message}&nbsp;</p>
          </div>
          <div id='signupSubmit'>
            <button id='signupSubmitButton' onClick={this.handleSignupClick}>Sign Up</button>
          </div>
          <hr/>
          <div id='signupLogin'>
            <p id='signupLoginText'>Already have an account?</p>
            <button id='signupLoginButton' onClick={this.handleLoginClick}>Log In</button>
          </div>
        </div>
      </div>
    );
  }
});

var SignupMixin = {
  _closeSignup: function() {
    this.setState({showSignup: false});
  },

  getInitialState: function() {
    return {showSignup: false};
  },

  openSignup: function() {
    this.setState({showSignup: true});
  },

  signupModal: function(loginHandler) {
    return this.state.showSignup
      ? <SignupModal
          onRequestClose={this._closeSignup}
          onRequestLogin={loginHandler}/>
      : {};
  }
};

module.exports = SignupMixin;
