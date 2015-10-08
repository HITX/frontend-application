'use strict'

var React = require('react');

var Sidebar = require('./Sidebar.comp.jsx');
var FileViewer = require('./FileViewer.comp.jsx');

var SessionGuardMixin = require('../SessionMixins/SessionGuardMixin.mixin.jsx');

var SubmissionActions = require('../../actions/Submission.actions.js');
var SubmissionStore = require('../../stores/Submission.store.js');

var Submissions = React.createClass({

  mixins: [SessionGuardMixin],

  getInitialState: function() {
    return {
      submission: null,
      files: null,
      uploadingFiles: null,
      currentFile: null
    };
  },

  _onSubmissionChange: function() {
    if (this.isMounted()) {
      this.setState({
        submission: SubmissionStore.getSubmissionData(),
        files: SubmissionStore.getSubmissionFilesData(),
        uploadingFiles: SubmissionStore.getUploadingFilesData(),
        currentFile: null
      });
    }
  },

  componentDidMount: function() {
    SubmissionStore.addChangeListener(this._onSubmissionChange);

    Internshyps.get(
      'submissions/' + this.props.params.id,
      {'expand': 'project'}
    ).then(
      function(result) {
        SubmissionActions.loadSubmission(result.response);
      },
      function(err) {
        console.log('Error retrieving submission');
        console.log(err.response);
      }
    );

    Internshyps.get(
      'submission-files',
      {'submission': this.props.params.id}
    ).then(
      function(result) {
        SubmissionActions.loadSubmissionFiles(result.response);
      },
      function(err) {
        console.log('Error retrieving submission files');
        console.log(err.response);
      }
    );
  },

  componentWillUnmount: function() {
    SubmissionStore.removeChangeListener(this._onSubmissionChange);
  },

  handleFileItemClick: function(fileObj) {
    this.setState({
      currentFile: fileObj
    });
  },

  render: function() {
    var submission = this.state.submission;
    var files = this.state.files;
    var uploadingFiles = this.state.uploadingFiles;
    var currentFile = this.state.currentFile;

    return (
      <div id='submissions'>
        <div id='submissionsHeader'>
          <p>{submission ? submission.project.title : null}</p>
        </div>
        <FileViewer file={currentFile}/>
        <div id='submissionsSidebar'>
          <Sidebar
            submissionId={this.props.params.id}
            files={files}
            currentFile={currentFile}
            uploadingFiles={uploadingFiles}
            onItemClick={this.handleFileItemClick}/>
        </div>
        <div id='submissionsFooter'>
          <button>Submit</button>
        </div>
      </div>
    );
  }
});

module.exports = Submissions;
