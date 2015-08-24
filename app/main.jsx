'use strict'

var React = window.React = require('react');
var router = require('./router.jsx');

// Internshyps.login('uname', 'pwrd', 'http://localhost:8080/api/login').then(
//   function(result) {
//     console.log('LOGIN Result:');
//     console.log(result);
//     console.log(result.response);
//   },
//   function(err) {
//     console.log('LOGIN Error:');
//     console.log(err);
//   }
// );

// Immediately check authenticated status
Internshyps.get('users/me').then(
  function(result) {
    console.log('GET Result:');
    console.log(result);
    console.log(result.response);
  },
  function(err) {
    console.log('GET Error:');
    console.log(err);
  }
);

// Internshyps.post('users', {
//   username: 'post_test_username5',
//   password: 'test',
//   bad_stuff: 'ugh',
//   profile: {
//     data: 'some data'
//   }
// }).then(
//   function(result) {
//     console.log('POST Result:');
//     console.log(result);
//     console.log(result.response);
//   },
//   function(err) {
//     console.log('POST Error:');
//     console.log(err);
//   }
// );

router.run(function(Handler) {
  React.render(<Handler/>, document.getElementById('appContainer'));
});
