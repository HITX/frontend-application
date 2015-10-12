'use strict'

var React = require('react');

var classNames = require('classnames');

var SidebarItem = require('./SidebarItem.comp.jsx');

var SpinnerWidget = require('../Widgets/Spinner.comp.jsx');

var MediaMixin = require('../MediaMixin/MediaMixin.mixin.jsx');

var SubmissionActions = require('../../actions/Submission.actions.js');
var SubmissionStore = require('../../stores/Submission.store.js');

var Sidebar = React.createClass({

  mixins: [MediaMixin],

  propTypes: {
    submissionId: React.PropTypes.string.isRequired,
    files: React.PropTypes.array,
    uploadingFiles: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      currentFileId: null,
      message: null,
      showBody: false
    };
  },

  _onSubmissionChange: function() {
    if (this.isMounted()) {
      var currentFile = SubmissionStore.getCurrentFileData();
      this.setState({
        currentFileId: currentFile ? currentFile.id : null
      });
    }
  },

  componentDidMount: function() {
    SubmissionStore.addChangeListener(this._onSubmissionChange);
  },

  componentWillUnmount: function() {
    SubmissionStore.removeChangeListener(this._onSubmissionChange);
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

  handleHeaderClick: function() {
    console.log('Will handle header click here');
    this.setState({
      showBody: !this.state.showBody
    });
  },

  render: function() {
    var currentFileId = this.state.currentFileId;

    var items = <p>'Loading...'</p>
    if (this.props.files) {
      var items = this.props.files.map(
        function(item) {
          return (
            <SidebarItem
              key={item.id}
              selected={currentFileId && currentFileId == item.id}
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

    var headerClick = null;
    if (this.state.media.break1) {
      headerClick = this.handleHeaderClick;
    }

    var bodyClass = classNames(
      'sidebarBody',
      {hidden: this.state.media.break1 && !this.state.showBody}
    )

    return (
      <div id='sidebar'>
        <div
          className={classNames('sidebarHeader', {clicked: this.state.showBody})}
          onClick={headerClick}
        >
          <p>Files</p>
        </div>
        {message}
        <div className={bodyClass}>
          <div className='sidebarItem subHeader' onClick={this.handleNewFileClick}>
            <p className='sidebarItemArrow'>+</p>
            <p className='sidebarItemTitle'>Upload New File</p>
            <input
              id='submissionsFileInput'
              type='file'
              ref='fileInput'
              onClick={this.handleFileInputClick}
              onChange={this.handleFileChange}/>
          </div>
          {uploadingItems}
          {items}
        </div>
      </div>
    );
  }
});

module.exports = Sidebar;
