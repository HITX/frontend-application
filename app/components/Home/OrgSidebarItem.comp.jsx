'use strict'

var React = require('react');

var OrgSidebarItem = React.createClass({

  propTypes: {
    project: React.PropTypes.object.isRequired
  },

  render: function() {

    var data = this.props.project;

    return (
      <div className='oSItem'>
        <p className='oSItemTitle'>{data.title}</p>
        <p className='oSItemArrow'>&rsaquo;</p>
      </div>
    );
  }
});

module.exports = OrgSidebarItem;
