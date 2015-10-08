'use strict'

var React = require('react');

var classNames = require('classnames');

var SidebarItem = React.createClass({

  getDefaultProps: function() {
    return {selected: false};
  },

  propTypes: {
    selected: React.PropTypes.bool,
    file: React.PropTypes.object.isRequired,
    onItemClick: React.PropTypes.func.isRequired
  },

  render: function() {
    var data = this.props.file;

    return (
      <div
        className='sidebarItem'
        className={classNames('sidebarItem', {selected: this.props.selected})}
        onClick={this.props.onItemClick.bind(null, this.props.file)}>
        <p className='sidebarItemArrow'>&lsaquo;</p>
        <p className='sidebarItemTitle'>{data.filename}</p>
      </div>
    );
  }
});

module.exports = SidebarItem;
