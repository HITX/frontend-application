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
      items = <p className='sidebarEmpty'>No current projects</p>;
    }

    return (
      <div id='orgSidebar'>
        <div className='sidebarHeaderClickable' onClick={this.handleHeaderClick}>
          <p>My Projects</p>
          <p className='sidebarHeaderArrow'>&rsaquo;</p>
        </div>
        <div
          className='sidebarSubHeader'
          onClick={this.handleNewProjectClick}>
          <p>New Project</p>
          <p className='sidebarSubHeaderArrow'>+</p>
        </div>
        <div className='sidebarBody'>
          {items}
        </div>
      </div>
    );
  }
});

module.exports = OrgSidebar;
