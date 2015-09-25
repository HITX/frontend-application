'use strict'

var React = require('react');

var SubmissionCountWidget = React.createClass({

  propTypes: {
    count: React.PropTypes.number.isRequired
  },

  render: function() {
    return (
      <div className='submissionCountWidget'>
        <img src='/img/person_icon.svg'/>
        <p>{this.props.count}</p>
      </div>
    );
  }
});

module.exports = SubmissionCountWidget;
