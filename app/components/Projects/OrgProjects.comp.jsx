'use strict'

var React = require('react');

var SessionStore = require('../../stores/Session.store.js');

var OrgProjects = React.createClass({

  propTypes: {
    projectId: React.PropTypes.string.isRequired
  },

  render: function() {

    var project = SessionStore.getOrgProjectById(this.props.projectId);
    if (project == null) {
      console.log('Org user is not the owner of project');
      return null;
    }

    return (
      <div id='orgProjects'>
        <p>Org Projects Component</p>
      </div>
    );
  }
});

module.exports = OrgProjects;
