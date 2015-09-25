'use strict'

var React = require('react');

var OrgSidebar = React.createClass({
  propTypes: {
    projects: React.PropTypes.array.isRequired
  },

  render: function() {
    return (
      <div id='orgSidebar'>
        <p>Org Sidebar</p>
      </div>
    );
  }
});

module.exports = OrgSidebar;
