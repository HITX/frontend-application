'use strict'

var React = require('react');

var EventTypes = require('../../constants/AppConstants.js').EventTypes;

var SpinnerWidget = require('../Widgets/Spinner.comp.jsx');

var SubmissionActions = require('../../actions/Submission.actions.js');
var SubmissionStore = require('../../stores/Submission.store.js');

var FORBIDDEN_MESSAGE = (
'Unable to access file. Please check your internet\
 connection and that you are logged in correctly.'
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
    } else if (this.state.content) {
      this.setState({content: null});
    }
  },

  handleDeleteClick: function() {
    console.log('Will handle delete click here');
    var file = this.state.file;
    if (file) {
      Internshyps.delete(
        'submission-files/' + file.id, null
      ).then(
        function(result) {
          SubmissionActions.removeSubmissionFile(file.id);
        },
        function(err) {
          console.log('Error deleting file');
          console.log(err.response);
        }
      );
    }
  },

  _renderContentHelper: function() {
    if (this.state.content) {
      return <pre>{this.state.content}</pre>;
    }

    if (this.state.content_loading) {
      return <SpinnerWidget delayMs={100}/>;
    }

    return null;
  },

  render: function() {
    var filename = 'No file selected';
    if (this.state.file) {
      filename = this.state.file.filename;
    }

    var deleteButtonClass = 'hidden';
    if (this.state.content) {
      deleteButtonClass = 'visible';
    }

    return (
      <div id='submissionsViewer'>
        <div id='viewerHeader'>
          <p id='viewerFilename'>{filename}</p>
          <button
            id='viewerDelete'
            className={deleteButtonClass}
            onClick={this.handleDeleteClick}
          >
            Delete
          </button>
        </div>
        <div id='viewerBody'>
          {this._renderContentHelper()}
        </div>
      </div>
    );
  }
});

module.exports = FileViewer;
