'use strict'

var React = require('react');

var SessionStore = require('../../stores/Session.store.js');

var InternProjects = React.createClass({

  propTypes: {
    projectId: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      submission: SessionStore.getInternSubmissionByProjectId(this.props.projectId)
    };
  },

  handleRegisterClick: function() {
    console.log('Will handle register click here');
  },

  handleSubmissionClick: function() {
    console.log('Will handle submission click here');
  },

  render: function() {
    var actionButton;
    if (!this.state.submission) {
      actionButton =
        <button
          id='projectsRegisterButton'
          onClick={this.handleRegisterClick}>
          Register
        </button>
    } else {
      actionButton =
        <button
          id='projectsSubmissionButton'
          onClick={this.handleSubmissionClick}>
          Edit Submission &rsaquo;
        </button>
    }

    return (
      <div id='internProjects'>
        {actionButton}
      </div>
    );
  }
});

module.exports = InternProjects;
