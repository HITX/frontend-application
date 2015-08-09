'use strict'

var React = require('react');

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
        <input
          type='submit'
          value='Click Me'
          onClick={this.handleClick}/>
        <p>{this.state.message}</p>
      </div>
    );
  }
});

module.exports = App;
