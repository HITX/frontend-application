'use strict'

var React = require('react');
var SessionStore = require('../../stores/Session.store.js');

function _getSessionState(projectId) {
  return {
    isOwner: SessionStore.ownsProject(projectId),
    isSubmitter: SessionStore.isProjectSubmitter(projectId)
  };
}

var Projects = React.createClass({

  // statics: {
  //   willTransitionTo: function(transition, params) {
  //     if (SessionStore.ownsProject(params.id)) {
  //       console.log('Current user owns this project!');
  //       // transition.redirect('ownedProjects');
  //     }
  //   }
  // },

  getInitialState: function() {
    return _getSessionState(this.props.params.id);
  },

  _onSessionChange: function() {
    this.setState(_getSessionState(this.props.params.id));
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onSessionChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onSessionChange);
  },

  render: function() {

    var userSpecific = {};
    if (this.state.isOwner) {
      userSpecific = <p>Project Owner</p>;
    } else if (this.state.isSubmitter) {
      userSpecific = <p>Project Submitter</p>
    }

    return (
      <div id='projects'>
        <p>Projects page</p>
        {userSpecific}
      </div>
    );
  }
});

module.exports = Projects;
