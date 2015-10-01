'use strict'

var React = require('react');

var Sidebar = require('./Sidebar.comp.jsx');

var SessionGuardMixin = require('../SessionMixins/SessionGuardMixin.mixin.jsx');

var Submissions = React.createClass({

  mixins: [SessionGuardMixin],

  render: function() {
    return (
      <div id='submissions'>
        <div id='submissionsHeader'>
          <p>Project Title</p>
        </div>
        <div id='submissionsViewer'>
          <div id='viewerHeader'>
            <p>filename</p>
          </div>
          <div id='viewerBody'>
            <pre>file content</pre>
          </div>
          <div id='viewerFooter'>
            <button>Delete</button>
          </div>
        </div>
        <div id='submissionsSidebar'>
          <Sidebar files={[]}/>
        </div>
        <div id='submissionsFooter'>
          <button>Submit</button>
        </div>
      </div>
    );
  }
});

module.exports = Submissions;
