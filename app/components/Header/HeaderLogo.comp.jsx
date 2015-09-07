'use strict'

var React = require('react');

var Navigation = require('react-router').Navigation;

var HeaderLogo = React.createClass({

  mixins: [Navigation],

  handleClick: function() {
    this.transitionTo('home');
  },

  render: function() {
    return (
      <div id='headerLogo' onClick={this.handleClick}>
        <p>Internshyps</p>
      </div>
    );
  }
});

module.exports = HeaderLogo;
