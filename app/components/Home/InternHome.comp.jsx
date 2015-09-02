'use strict'

var React = require('react');

var Newsfeed = require('../Newsfeed/Newsfeed.comp.jsx');
var InternSubmissionList = require('../Submission/InternSubmissionList.comp.jsx');

var InternHome = React.createClass({
  render: function() {
    return (
      <div id='internHome'>
        <p>{'Intern Home: ' + this.props.session.username}</p>
        <div id='itemList'>
          <Newsfeed/>
        </div>
        <div id='sidebar'>
          <InternSubmissionList/>
        </div>
      </div>
    );
  }
});

module.exports = InternHome;
