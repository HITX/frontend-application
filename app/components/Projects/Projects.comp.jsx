'use strict'

var React = require('react');

var UserTypes = require('../../constants/AppConstants.js').UserTypes;

var ActionButton = require('./ActionButton.comp.jsx');

var ProjectStore = require('../../stores/Project.store.js');
var ProjectActions = require('../../actions/Project.actions.js');

var Projects = React.createClass({

  getInitialState: function() {
    return {project: null};
  },

  _onProjectChange: function() {
    if (this.isMounted()) {
      this.setState({
        project: ProjectStore.getProjectData()
      });
    }
  },

  componentDidMount: function() {
    ProjectStore.addChangeListener(this._onProjectChange);

    Internshyps.get(
      'projects/' + this.props.params.id,
      {'expand': 'owner'}
    ).then(
      function(result) {
        ProjectActions.loadProject(result.response);
      },
      function(err) {
        console.log('Error retrieving project');
        console.log(err);
      }
    );
  },

  componentWillUnmount: function() {
    ProjectStore.removeChangeListener(this._onProjectChange);
  },

  render: function() {

    var project = this.state.project;
    if (!project) {
      return null;
    }

    return (
      <div id='projects'>
        <div id='projectsHeader'>
          <div id='projectsHeaderLeft'>
            <p id='projectsTitle'>{project.title}</p>
            <div id='projectsOrgBlock'>
              <img id='projectsOrgLogo' src='/img/initec_logo.jpg'/>
              <p id='projectsOrgName'>{project.owner.org_name}</p>
              <p id='projectsPrize'>${Math.round(project.prize)}</p>
            </div>
            <div id='projectsInfoBlock'>
              <p id='projectsDeadlineText'>Deadline -&nbsp;</p>
              <p id='projectsDeadlineVal'>{project.end_date}</p>
              <p id='projectsSpacer'>|</p>
              <p id='projectsSubmissionsCountText'>Submissions -&nbsp;</p>
              <p id='projectsSubmissionsCountVal'>{project.submission_count}</p>
            </div>
          </div>
          <div id='projectsHeaderRight'>
            <ActionButton projectId={this.props.params.id}/>
          </div>
        </div>
        <div id='projectsDescBlock'>
          <p id='projectsDescText'>Description:</p>
          <pre id='projectsDescVal'>{project.description}</pre>
        </div>
        <div id='projectsReqBlock'>
          <p id='projectsReqText'>Requirements:</p>
          <pre id='projectsReqVal'>requirements go here</pre>
        </div>
      </div>
    );
  }
});

module.exports = Projects;
