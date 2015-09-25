'use strict'

var React = require('react');

var UserTypes = require('../../constants/AppConstants.js').UserTypes;

var ActionButton = require('./ActionButton.comp.jsx');

var ProjectStore = require('../../stores/Project.store.js');
var ProjectActions = require('../../actions/Project.actions.js');

var DeadlineWidget = require('../Widgets/Deadline.comp.jsx');
var SubmissionCountWidget = require('../Widgets/SubmissionCount.comp.jsx');
var PrizeWidget = require('../Widgets/Prize.comp.jsx');

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
            <img id='projectsOrgLogo' src='/img/initec_logo.jpg'/>
          </div>
          <div id='projectsHeaderMiddle'>
            <p id='projectsTitle'>{project.title}</p>
            <p id='projectsOrgName'>{project.owner.org_name}</p>
          </div>
          <div id='projectsHeaderRight'>
            <ActionButton projectId={this.props.params.id}/>
          </div>
        </div>
        <div id='projectsSubHeader'>
          <PrizeWidget prize={project.prize}/>
          <DeadlineWidget date={project.end_date}/>
          <SubmissionCountWidget count={project.submission_count}/>
        </div>
        <div id='projectsDescBlock'>
          <p id='projectsDescTitle'>Description</p>
          <pre id='projectsDesc'>{project.description}</pre>
        </div>
        <div id='projectsSkillsBlock'>
          <p id='projectsSkillsTitle'>Skills</p>
          <ul id='projectsSkillsList'>
            <li>Tag 1</li>
            <li>Tag 2</li>
            <li>Tag 3</li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Projects;
