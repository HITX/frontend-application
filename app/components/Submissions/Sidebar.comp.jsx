'use strict'

var React = require('react');

var SidebarItem = require('./SidebarItem.comp.jsx');

var SpinnerWidget = require('../Widgets/Spinner.comp.jsx');

var SubmissionActions = require('../../actions/Submission.actions.js');
var SubmissionStore = require('../../stores/Submission.store.js');

var Sidebar = React.createClass({

  propTypes: {
    submissionId: React.PropTypes.string.isRequired,
    files: React.PropTypes.array,
    currentFile: React.PropTypes.object,
    uploadingFiles: React.PropTypes.array
  },

  getInitialState: function() {
    return {message: null};
  },

  handleFileChange: function(e) {
    var file = e.target.files[0];
    SubmissionActions.addUploadingFile(file.name);

    Internshyps.postFormData(
      'submission-files',
      {submission: this.props.submissionId, file: file},
      null
    ).then(
      function(result) {
        SubmissionActions.succeedUploadingFile(result.response);
      },
      function(err) {
        SubmissionActions.failUploadingFile(file.name);
        if (this.isMounted()) {
          this.setState({message: 'Error uploading \'' + file.name + '\''});
        }
      }.bind(this)
    );
  },

  handleFileInputClick: function(e) {
    e.stopPropagation();
  },

  handleNewFileClick: function() {
    this.refs.fileInput.getDOMNode().click();
  },

  render: function() {

    var currentFileId = null;
    if (this.props.currentFile) {
      currentFileId = this.props.currentFile.id;
    }

    var items = <p>'Loading...'</p>
    if (this.props.files) {
      var items = this.props.files.map(
        function(item) {
          return (
            <SidebarItem
              key={item.id}
              selected={currentFileId == item.id}
              file={item}/>
          );
        }.bind(this)
      );

      if (items.length == 0) {
        items = <p className='sidebarEmpty'>No files</p>;
      }
    }

    var uploadingItems = null;
    if (this.props.uploadingFiles) {
      var uploadingItems = this.props.uploadingFiles.map(
        function(item, idx) {
          return (
            <div
              key={'uploading_' + idx}
              className='sidebarItem'>
              <SpinnerWidget/>
              <p className='sidebarItemTitle'>{item}</p>
            </div>
          );
        }
      );
    }

    var message = null;
    if (this.state.message) {
      message = <p className='sidebarMessage'>{this.state.message}</p>
    }

    return (
      <div id='sidebar'>
        <div className='sidebarHeader'>
          <p>Files</p>
        </div>
        {message}
        <div
          className='sidebarSubHeader'
          onClick={this.handleNewFileClick}>
          <p className='sidebarSubHeaderArrow'>+</p>
          <p className='sidebarSubHeaderTitle'>Upload New File</p>
          <input
            type='file'
            ref='fileInput'
            onClick={this.handleFileInputClick}
            onChange={this.handleFileChange}/>
        </div>
        <div className='sidebarBody'>
          {uploadingItems}
          {items}
        </div>
      </div>
    );
  }
});

module.exports = Sidebar;
