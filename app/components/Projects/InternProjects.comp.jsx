'use strict'

var React = require('react');

var SessionStore = require('../../stores/Session.store.js');

var InternProjects = React.createClass({

  propTypes: {
    projectId: React.PropTypes.string.isRequired
  },

  render: function() {

    var submission = SessionStore.getInternSubmissionByProjectId(this.props.projectId);
    if (submission == null) {
      console.log('Intern user is not a submitter for project')
      return null;
    }

    return (
      <div id='internProjects'>
        <p>Intern Projects Component</p>
      </div>
    );
  }
});

module.exports = InternProjects;
