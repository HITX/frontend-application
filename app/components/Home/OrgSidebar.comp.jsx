'use strict'

var React = require('react');

var SidebarItem = require('./OrgSidebarItem.comp.jsx');

var Navigation = require('react-router').Navigation;

var OrgSidebar = React.createClass({

  mixins: [Navigation],

  propTypes: {
    projects: React.PropTypes.array.isRequired
  },

  // TODO
  handleHeaderClick: function() {
    console.log('Not yet implemented');
  },

  handleNewProjectClick: function() {
    this.transitionTo('projectCreation');
  },

  render: function() {
    var items = this.props.projects.map(
      function(item) {
        return (
          <SidebarItem key={item.id} project={item}/>
        );
      }
    );

    if (items.length == 0) {
      items = <p id='oSNoProjects'>No current projects</p>;
    }

    return (
      <div id='orgSidebar'>
        <div id='oSHeader' onClick={this.handleHeaderClick}>
          <p>My Projects</p>
          <p id='oSHeaderArrow'>&rsaquo;</p>
        </div>
        <div
          id='oSSubHeader'
          onClick={this.handleNewProjectClick}>
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
