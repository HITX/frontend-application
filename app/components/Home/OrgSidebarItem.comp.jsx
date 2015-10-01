'use strict'

var React = require('react');

var Navigation = require('react-router').Navigation;

var OrgSidebarItem = React.createClass({

  mixins: [Navigation],

  propTypes: {
    project: React.PropTypes.object.isRequired
  },

  handleClick: function() {
    this.transitionTo('projects', {id: this.props.project.id});
  },

  render: function() {

    var data = this.props.project;

    return (
      <div
        className='sidebarItem'
        onClick={this.handleClick}>
        <p className='sidebarItemTitle'>{data.title}</p>
        <p className='sidebarItemArrow'>&rsaquo;</p>
      </div>
    );
  }
});

module.exports = OrgSidebarItem;
