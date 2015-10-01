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
      items = <p className='sidebarEmpty'>No current projects</p>;
    }

    return (
      <div id='internSidebar'>
        <div className='sidebarHeaderClickable' onClick={this.handleHeaderClick}>
          <p>My Projects</p>
          <p className='sidebarHeaderArrow'>&rsaquo;</p>
        </div>
        <div className='sidebarBody'>
          {items}
        </div>
      </div>
    );
  }
});

module.exports = InternSidebar;
