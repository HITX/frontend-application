'use strict'

var React = require('react');

var SidebarItem = require('./OrgSidebarItem.comp.jsx');

var OrgSidebar = React.createClass({
  propTypes: {
    projects: React.PropTypes.array.isRequired
  },

  render: function() {

    var items = this.props.projects.map(
      function(item) {
        return (
          <div key={item.id}>
            <SidebarItem project={item}/>
          </div>
        );
      }
    );

    if (items.length == 0) {
      items = <p id='oSNoProjects'>No current projects</p>;
    }

    return (
      <div id='orgSidebar'>
        <div id='oSHeader'>
          <p>My Projects</p>
          <p id='oSHeaderArrow'>&rsaquo;</p>
        </div>
        <div id='oSSubHeader'>
          <p>New Project</p>
          <p id='oSSubHeaderPlus'>+</p>
        </div>
        <div id='oSBody'>
          {items}
        </div>
      </div>
    );
  }
});

module.exports = OrgSidebar;
