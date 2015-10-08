'use strict'

var React = require('react');

var SpinnerWidget = React.createClass({

  // propTypes: {
  //   prize: React.PropTypes.number.isRequired
  // },

  render: function() {
    return (
      <div className='spinnerWidget'>
        <img src='/img/spinner.svg'/>
      </div>
    );
  }
});

module.exports = SpinnerWidget;
