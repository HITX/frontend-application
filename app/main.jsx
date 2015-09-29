'use strict'

var React = window.React = require('react');
var router = require('./router.jsx');

var SessionActions = require('./actions/Session.actions.js');

// Immediately check authenticated status
if (Internshyps.hasToken()) {
  Internshyps.get('me', {'expand': 'submissions.project.owner,projects'}).then(
    function(result) {
      SessionActions.loadSession(result.response);
      renderApp();
    },
    function(err) {
      SessionActions.dropSession();
      renderApp();
    }
  );
} else {
  renderApp();
}

function renderApp() {
  router.run(function(Handler) {
    React.render(<Handler/>, document.getElementById('appContainer'));
  });
}
