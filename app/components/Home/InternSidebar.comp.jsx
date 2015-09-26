'use strict'

var React = require('react');

var SidebarItem = require('./InternSidebarItem.comp.jsx');

var InternSidebar = React.createClass({
  propTypes: {
    submissions: React.PropTypes.array.isRequired
  },

  render: function() {

    var items = this.props.submissions.map(
      function(item) {
        return (
          <div key={item.id}>
            <SidebarItem submission={item}/>
          </div>
        );
      }
    );

    if (items.length == 0) {
      items = <p id='iSNoProjects'>No current projects</p>;
    }

    return (
      <div id='internSidebar'>
        <div id='iSHeader'>
          <p>My Projects</p>
          <p id='iSHeaderArrow'>&rsaquo;</p>
        </div>
        <div id='iSBody'>
          {items}
        </div>
      </div>
    );
  }
});

module.exports = InternSidebar;
