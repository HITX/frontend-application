'use strict'

var React = require('react');

var SidebarItem = require('./SidebarItem.comp.jsx');

var Sidebar = React.createClass({

  propTypes: {
    files: React.PropTypes.array.isRequired
  },

  handleNewFileClick: function() {
    console.log('Will handle new file click here');
  },

  render: function() {
    var items = this.props.files.map(
      function(item) {
        return (
          <SidebarItem key={item.id} file={item}/>
        );
      }
    );

    if (items.length == 0) {
      items = <p className='sidebarEmpty'>No files</p>;
    }

    return (
      <div id='sidebar'>
        <div className='sidebarHeader'>
          <p>Files</p>
        </div>
        <div
          className='sidebarSubHeader'
          onClick={this.handleNewFileClick}>
          <p>New File</p>
          <p className='sidebarSubHeaderArrow'>+</p>
        </div>
        <div className='sidebarBody'>
          {items}
        </div>
      </div>
    );
  }
});

module.exports = Sidebar;
