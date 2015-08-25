'use strict'

var React = window.React = require('react');
var router = require('./router.jsx');

var SessionActions = require('./actions/Session.actions.js');

// Immediately check authenticated status
Internshyps.get('users/me').then(
  function(result) {
    SessionActions.loadSession(result.response);
    renderApp();
  },
  function(err) {
    SessionActions.dropSession();
    renderApp();
  }
);

function renderApp() {
  router.run(function(Handler) {
    React.render(<Handler/>, document.getElementById('appContainer'));
  });
}
