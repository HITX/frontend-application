'use strict'

var React = require('react');

var SessionGuardMixin = require('../../SessionMixins/SessionGuardMixin.mixin.jsx');

var EditList = React.createClass({

  mixins: [SessionGuardMixin],

  // willTransitionTo: function() {
  //   console.log('Transition test');
  // },

  render: function() {
    return (
      <div id='internSubmissionsEditList'>
        <div id='iSELMain'>
          <p id='iSELTitle'>Title</p>
          <div id='iSELFileHeader'>
            <p id='iSELFileName'>filename.txt</p>
            <button id='iSELSelectFile'>&rsaquo;</button>
            <button id='iSELAddFile'>+</button>
          </div>
          <textarea id='iSELFileData' value={'File data...'}/>
          <div id='iSELFileFooter'>
            <button id='iSELSaveFile'>Save</button>
            <button id='iSELDeleteFile'>Delete</button>
            <button id='iSELDownloadFile'>Download</button>
          </div>
        </div>
        <div id='iSELSidebar'>
        </div>
      </div>
    );
  }
});

module.exports = EditList;
