'use strict'

var React = require('react');

var DeadlineWidget = React.createClass({

  propTypes: {
    date: React.PropTypes.string.isRequired
  },

  render: function() {
    return (
      <div
        className='deadlineWidget'
        title='Deadline'>
        <img src='/img/clock_icon.svg'/>
        <p>{this.props.date}</p>
      </div>
    );
  }
});

module.exports = DeadlineWidget;
