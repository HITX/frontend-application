'use strict'

var React = require('react');

var SessionGuardMixin = require('../SessionMixins/SessionGuardMixin.mixin.jsx');

var Submissions = React.createClass({

  mixins: [SessionGuardMixin],

  render: function() {
    return (
      <div id='submissions'>
        <p>Submissions page</p>
      </div>
    );
  }
});

module.exports = Submissions;
