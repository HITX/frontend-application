'use strict'

var React = require('react');

var SidebarItem = require('./InternSidebarItem.comp.jsx');

var InternSidebar = React.createClass({
  propTypes: {
    submissions: React.PropTypes.array.isRequired
  },
  
  // TODO
  handleHeaderClick: function() {
    console.log('Not yet implemented');
  },

  render: function() {

    var items = this.props.submissions.map(
      function(item) {
        return (
          <SidebarItem key={item.id} submission={item}/>
        );
      }
    );

    if (items.length == 0) {
      items = <p id='iSNoProjects'>No current projects</p>;
    }

    return (
      <div id='internSidebar'>
        <div id='iSHeader' onClick={this.handleHeaderClick}>
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
