'use strict'

var React = require('react');

var PrizeWidget = React.createClass({

  propTypes: {
    prize: React.PropTypes.number.isRequired
  },

  render: function() {
    return (
      <div
        className='prizeWidget'
        title='Prize'>
        <p>${Math.round(this.props.prize)}</p>
      </div>
    );
  }
});

module.exports = PrizeWidget;
