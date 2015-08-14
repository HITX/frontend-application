'use strict'

var React = require('react');
var Header = require('../Header/Header.comp.jsx')

var App = React.createClass({

  getInitialState: function() {
		return {message: 'Look I made a thing'}
	},

  handleClick: function() {
    this.setState({message: 'Wow so amaze'});
  },

  render: function() {
    return (
      <div id='application'>
        <Header/>
      </div>
    );
  }
});

module.exports = App;
