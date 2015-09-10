'use strict'

var React = require('react');

var Newsfeed = require('../Newsfeed/Newsfeed.comp.jsx');
var InternSubmissionsSidebar = require('../Submissions/Intern/Sidebar.comp.jsx');

var InternHome = React.createClass({

  propTypes: {
    session: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div id='internHome'>
        <div id='itemList'>
          <Newsfeed/>
        </div>
        <div id='sidebar'>
          <InternSubmissionsSidebar submissions={this.props.session.submissions}/>
        </div>
      </div>
    );
  }
});

module.exports = InternHome;
