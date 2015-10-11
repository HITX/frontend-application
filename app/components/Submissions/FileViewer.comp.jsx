'use strict'

var React = require('react');

var EventTypes = require('../../constants/AppConstants.js').EventTypes;

var SubmissionActions = require('../../actions/Submission.actions.js');
var SubmissionStore = require('../../stores/Submission.store.js');

var FORBIDDEN_MESSAGE = (
'Access to this file is forbidden.\
 Please check that you are logged in correctly.'
)

var FileViewer = React.createClass({

  getInitialState: function() {
    return {
      file: SubmissionStore.getCurrentFileData(),
      retry_allowed: true,
      content_loading: false,
      content: null
    };
  },

  _updateFileUrl: function() {
    if (this.isMounted()) {
      this.setState({
        retry_allowed: false,
      });
    }

    Internshyps.get('submission-files/' + this.state.file.id).then(
      function(result) {
        SubmissionActions.updateSubmissionFile(result.response);
      },
      function(err) {
        console.log('Error retreiving submission file metadata');
        console.log(err.response);
        if (this.isMounted()) {
          this.setState({
            content_loading: false,
            content: 'Error retreiving submission file metadata'
          });
        }
      }
    );
  },

  _fetchFileContents: function() {
    this.setState({
      content_loading: true,
      content: null
    });

    Internshyps.getFile(this.state.file.url).then(
      function(result) {
        if (this.isMounted()) {
          this.setState({
            content_loading: false,
            content: result.response,
            retry_allowed: true
          });
        }
      }.bind(this),
      function(err) {
        if (this.state.retry_allowed) {
          this._updateFileUrl();
        } else {
          console.log('Error retreiving file');
          console.log(err.response);
          if (this.isMounted) {
            this.setState({
              content_loading: false,
              content: FORBIDDEN_MESSAGE
            });
          }
        }
      }.bind(this)
    );
  },

  _onSubmissionChange: function(eventTypes) {
    if (this.isMounted()) {
      for (var i = 0; i < eventTypes.length; i++) {
        var type = eventTypes[i];
        switch(type) {
          case EventTypes.SUBMISSION_CURRENT_FILE_CHANGE:
            this.setState({
              file: SubmissionStore.getCurrentFileData(),
              retry_allowed: true
            });
            break;
          case EventTypes.SUBMISSION_FILES_CHANGE:
            this.setState({
              file: SubmissionStore.getCurrentFileData()
            });
            break;
        }
      }
    }
  },

  componentDidMount: function() {
    SubmissionStore.addChangeListener(this._onSubmissionChange);
    if (this.state.file) {
      this._fetchFileContents();
    }
  },

  componentWillUnmount: function() {
    SubmissionStore.removeChangeListener(this._onSubmissionChange);
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.file) {
      if (!prevState.file || this.state.file.url != prevState.file.url) {
        this._fetchFileContents();
      }
    }
  },

  _renderContentHelper: function() {
    if (this.state.content) {
      return <pre>{this.state.content}</pre>
    }

    if (this.state.content_loading) {
      return <p>Loading...</p>
    }

    return <p>No content to display</p>
  },

  render: function() {
    var filename = 'No file selected';
    if (this.state.file) {
      filename = this.state.file.filename;
    }

    return (
      <div id='submissionsViewer'>
        <div id='viewerHeader'>
          <p>{filename}</p>
        </div>
        <div id='viewerBody'>
          {this._renderContentHelper()}
        </div>
        <div id='viewerFooter'>
          <button>Delete</button>
        </div>
      </div>
    );
  }
});

module.exports = FileViewer;
