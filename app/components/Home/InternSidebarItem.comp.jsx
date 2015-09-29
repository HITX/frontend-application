'use strict'

var React = require('react');

var Navigation = require('react-router').Navigation;

var Statuses = require('../../constants/AppConstants.js').SubmissionStatuses;

var InternSidebarItem = React.createClass({

  mixins: [Navigation],

  propTypes: {
    submission: React.PropTypes.object.isRequired
  },

  handleClick: function() {
    this.transitionTo('projects', {id: this.props.submission.project.id});
  },

  render: function() {

    var data = this.props.submission

    return (
      <div
        className='iSItem'
        onClick={this.handleClick}>
        <p className='iSItemTitle'>{data.project.title}</p>
        <p className='iSItemArrow'>&rsaquo;</p>
      </div>
    );
  }
});

module.exports = InternSidebarItem;
