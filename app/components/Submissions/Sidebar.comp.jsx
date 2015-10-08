'use strict'

var React = require('react');

var SidebarItem = require('./SidebarItem.comp.jsx');

var SpinnerWidget = require('../Widgets/Spinner.comp.jsx');

var SubmissionActions = require('../../actions/Submission.actions.js');
var SubmissionStore = require('../../stores/Submission.store.js');

var Sidebar = React.createClass({

  propTypes: {
    files: React.PropTypes.array,
    uploadingFiles: React.PropTypes.array,
    onItemClick: React.PropTypes.func.isRequired
  },

  handleFileChange: function(e) {
    var file = e.target.files[0];
    console.log(file);

    console.log('Adding uploading file...');
    SubmissionActions.addUploadingFile(file.name);

    console.log('POST-ing...');
    Internshyps.postFile(file.name).then(
      function(result) {
        console.log('Finishing uploading file...');
        SubmissionActions.finishUploadingFile(result.response);
      },
      function(err) {
        console.log('Error uploading file');
        console.log(err.response);
      }
    );
  },

  handleFileInputClick: function(e) {
    e.stopPropagation();
  },

  handleNewFileClick: function() {
    this.refs.fileInput.getDOMNode().click();
  },

  render: function() {

    var items = <p>'Loading...'</p>
    if (this.props.files) {
      var items = this.props.files.map(
        function(item) {
          return (
            <SidebarItem key={item.id} file={item} onItemClick={this.props.onItemClick}/>
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

    return (
      <div id='sidebar'>
        <div className='sidebarHeader'>
          <p>Files</p>
        </div>
        <div
          className='sidebarSubHeader'
          onClick={this.handleNewFileClick}>
          <p className='sidebarSubHeaderArrow'>+</p>
          <p className='sidebarSubHeaderTitle'>New File</p>
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
