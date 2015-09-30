'use strict'

var React = require('react');
var Navigation= require('react-router').Navigation;
var classNames = require('classnames')

var NodeApiConfig = require('../../../config/app/config.js').node_api;

var SessionStore = require('../../stores/Session.store.js');
var SessionActions = require('../../actions/Session.actions.js');

var KEY_CODE_ENTER = 13;
var LOGIN_URL = 'http://' + NodeApiConfig.hostname + ':' + NodeApiConfig.port + '/' + NodeApiConfig.login_path;

var INPUTS = {
  INTERN: [
    {id: 'firstName', name: 'First Name', field: 'first_name', profile: true, required: false},
    {id: 'lastName', name: 'Last Name', field: 'last_name', profile: true, required: false},
    {id: 'username', name: 'Username', field: 'username', profile: false, required: true},
    {id: 'email', name: 'Email', field: 'email', profilfield: '', profile: false, e: false, required: true},
    {id: 'password', name: 'Password', field: 'password', profile: false, secure: true, required: true},
    {id: 'passwordCheck', name: 'Password Check', secure: true, required: true}
  ],
  ORG: [
    {id: 'orgName', name: 'Organization Name', field: 'org_name', profile: true, required: false},
    {id: 'username', name: 'Username', field: 'username', profile: false, required: true},
    {id: 'email', name: 'Email', field: 'email', profile: false, required: true},
    {id: 'password', name: 'Password', field: 'password', profile: false, secure: true, required: true},
    {id: 'passwordCheck', name: 'Password Check', secure: true, required: true}
  ]
};

function _reduce_input(prev, cur) {
  if (cur.hasOwnProperty('field')) {
    prev[cur.field] = cur.id;
  }
  return prev;
}

var FIELD_ID_MAP = {
  INTERN: INPUTS.INTERN.reduce(_reduce_input, {}),
  ORG: INPUTS.ORG.reduce(_reduce_input, {})
};


var SignupModal = React.createClass({

  mixins: [Navigation],

  getInitialState: function() {
    return INPUTS.INTERN.reduce(function(prev, cur) {
      prev[cur.id] = '';
      return prev;
    }, {type: 'INTERN', message: '', errors: {}});
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
    var newState = {errors: this.state.errors};
    newState[event.target.id] = event.target.value;
    delete newState.errors[event.target.id];
    this.setState(newState);
  },

  _inputInvalid: function() {
    var result = INPUTS[this.state.type].reduce(function(prev, cur) {
      if (cur.required && !this.state[cur.id]) {
        prev.changed = true;
        prev.errors[cur.id] = 'Missing required field \'' + cur.name + '\'';
      }
      return prev;
    }.bind(this), {changed: false, errors: {}});

    if (result.changed) {
      this.setState({errors: result.errors});
      return true;
    }

    if (this.state.password != this.state.passwordCheck) {
      this.setState({
        errors: {passwordCheck: 'Password check does not match'}
      });
      return true;
    }

    return false;
  },

  handleTypeClick: function(event){
    var newType = event.target.id.toUpperCase();
    if (this.state.type != newType) {

      var newState = INPUTS[newType].reduce(function(prev, cur) {
        prev[cur.id] = '';
        return prev;
      }, {type: newType, message: '', errors: {}});

      this.setState(newState);
    }
  },

  handleLoginClick: function() {
    this.props.onRequestClose();
    this.props.onRequestLogin();
  },

  _safeSetState: function(newState) {
    if (this.isMounted()) { this.setState(newState); }
  },

  handleSignupClick: function() {

    this.setState({message: ''});

    if (this._inputInvalid()) { return; }

    this.async_signup_type = this.state.type;

    var data = INPUTS[this.async_signup_type].reduce(function(prev, cur) {
      var val = this.state[cur.id];
      if (val && cur.hasOwnProperty('field')) {
        if (cur.profile) {
          prev.profile[cur.field] = val;
        } else {
          prev[cur.field] = val;
        }
      }
      return prev;
    }.bind(this), {profile: {}});

    var endpoint = this.async_signup_type == 'ORG' ? 'orgs' : 'interns';
    Internshyps.post(endpoint, data, null).then(
      function(result) {
        // this.setState({ message: 'User created. Logging in...' });

        Internshyps.login(data.username, data.password, LOGIN_URL).then(
          function(result) {
            Internshyps.get('me', {'expand': 'submissions.project.owner,projects'}).then(
              function(result) {
                SessionActions.loadSession(result.response);
              },
              function(err) {
                this._safeSetState({ message: 'Error retrieving user data' });
                Internshyps.logout();
                SessionActions.dropSession();
              }.bind(this)
            );
          }.bind(this),
          function(err) {
            this._safeSetState({ message: 'Error logging in to new user' });
          }.bind(this)
        );
      }.bind(this),
      function(err) {
        var newErrors = {};
        for (var field in err.response) {
          newErrors[FIELD_ID_MAP[this.async_signup_type][field]] = err.response[field][0];
        }

        this._safeSetState({errors: newErrors});
      }.bind(this)
    );
  },

  handleKeyDown: function(event) {
    if (event.keyCode == KEY_CODE_ENTER) {
      this.handleSignupClick();
    }
  },

  render: function() {

    var error_keys = Object.keys(this.state.errors);
    var message = error_keys.length == 0 ? this.state.message : this.state.errors[error_keys[0]];

    return (
      <div id='signup' onClick={this.handleBackdropClick}>
        <div id='signupContent' onClick={this.killClick}>
          <div id='signupType'>
            <p id='signupTypeText'>As an: </p>
            <button
              id='intern'
              className={classNames({selected: this.state.type == 'INTERN'})}
              onClick={this.handleTypeClick}>
              Intern
            </button>
            <button
              id='org'
              className={classNames({selected: this.state.type == 'ORG'})}
              onClick={this.handleTypeClick}>
              Organization
            </button>
          </div>

          {
            INPUTS[this.state.type].map(function(item) {
              // var ast = item.required ? '* ' : '  ';
              return (
                <input
                  id={item.id}
                  key={'signup_input_' + item.id}
                  className={classNames('signupInput', {invalid: this.state.errors.hasOwnProperty(item.id)})}
                  type={item.hasOwnProperty('secure') ? 'password' : 'text'}
                  placeholder={item.name}
                  value={this.state[item.id]}
                  onChange={this.handleInputChange}
                  onKeyDown={this.handleKeyDown}/>
              );
            }.bind(this))
          }

          <div id='signupSubmit'>
            <button id='signupSubmitButton' onClick={this.handleSignupClick}>Sign Up</button>
          </div>
          <div id='signupMessage' className={classNames({show: message.length})}>
            <p>{message}</p>
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
