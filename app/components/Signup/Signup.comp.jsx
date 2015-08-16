'use strict'

var React = require('react');

var Signup = React.createClass({
  render: function() {
    return (
      <div id='signup'>
        <img id='signupBackgroundImage' src='img/interns.jpg'/>
        <div id='signupContent'>
          <p id='signupTitle'>Create an account</p>
          <input id='signupEmail' type='text' placeholder='Email'/>
          <input id='signupUsername' type='text' placeholder='Username'/>
          <input id='signupPassword' type='text' placeholder='Password'/>
          <input id='signupRetypePassword' type='text' placeholder='Retype Password'/>
          <button id='signupSubmitButton'>Sign Up</button>
        </div>
      </div>
    );
  }
});

module.exports = Signup;
