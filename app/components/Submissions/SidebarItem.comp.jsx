'use strict'

var React = require('react');

var SidebarItem = React.createClass({

  propTypes: {
    file: React.PropTypes.object.isRequired,
    onItemClick: React.PropTypes.func.isRequired
  },

  handleClick: function() {
    console.log('Will handle sidebar item click here');
  },

  render: function() {

    var data = this.props.file;

    return (
      <div
        className='sidebarItem'
        onClick={this.props.onItemClick.bind(null, this.props.file)}>
        <p className='sidebarTitle'>{data.filename}</p>
        <p className='sidebarItemArrow'>&rsaquo;</p>
      </div>
    );
  }
});

module.exports = SidebarItem;
