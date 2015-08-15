'use strict'

var React = window.React = require('react');
var router = require('./router.jsx');

router.run(function(Handler) {
  React.render(<Handler/>, document.getElementById('appContainer'));
});
