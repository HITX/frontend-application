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
    var data = this.props.submission;

    return (
      <div
        className='sidebarItem'
        onClick={this.handleClick}>
        <p className='sidebarItemTitle'>{data.project.title}</p>
        <p className='sidebarItemArrow'>&rsaquo;</p>
      </div>
    );
  }
});

module.exports = InternSidebarItem;
