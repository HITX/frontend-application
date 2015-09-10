'use strict'

var React = require('react');

var UserTypes = require('../../constants/AppConstants.js').UserTypes;

var SessionStore = require('../../stores/Session.store.js');

var ActionButton = React.createClass({

  propTypes: {
    projectId: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      userType: SessionStore.getUserType()
    };
  },

  _onSessionChange: function() {
    this.setState({userType: SessionStore.getUserType()});
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onSessionChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onSessionChange);
  },

  // handleRegisterClick: function() {
  //   console.log('Will handle register click here');
  // },
  //
  // handleSubmissionClick: function() {
  //   console.log('Will handle submission click here');
  // },

  _render_helper: function() {
    var userSpecific;
    switch(this.state.userType) {
      case UserTypes.INTERN:
        var submission = SessionStore.getInternSubmissionByProjectId(this.props.projectId);
        if (submission) {
          return (
            <button id='projectsEditSubmissionButton'>
              Edit Submission &rsaquo;
            </button>
          );
        }
        return (
          <button id='projectsRegisterButton'>
            Register
          </button>
        );
        break;
      case UserTypes.ORG:
        var project = SessionStore.getOrgProjectById(this.props.projectId);
        if (project) {
          return (
            <button id='projectsViewSubmissionsButton'>
              View Submissions &rsaquo;
            </button>
          );
          return null;
        }
        break;
      default:
        return null;
    }
  },

  render: function() {
    return (
      <div id='projectsActionButton'>
        {this._render_helper()}
      </div>
    );
  }
});

module.exports = ActionButton;
