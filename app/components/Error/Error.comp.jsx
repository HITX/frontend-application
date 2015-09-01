'use strict'

var React = require('react');

var Error = React.createClass({
  render: function() {
    return (
      <div id='error'>
        <p>Oh god what happened!?!?</p>
        <p>{this.props.message}</p>
      </div>
    );
  }
});

module.exports = Error;
