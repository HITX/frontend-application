'use strict'

var React = require('react');

var classNames = require('classnames');

var SidebarItem = require('./OrgSidebarItem.comp.jsx');

var Navigation = require('react-router').Navigation;
var MediaMixin = require('../MediaMixin/MediaMixin.mixin.jsx');

var OrgSidebar = React.createClass({

  mixins: [Navigation, MediaMixin],

  propTypes: {
    projects: React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    return {
      showBody: false
    };
  },

  handleHeaderClick: function() {
    this.setState({
      showBody: !this.state.showBody
    });
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

    var headerClick = null;
    if (this.state.media.break1) {
      headerClick = this.handleHeaderClick;
    }

    var bodyClass = classNames(
      'sidebarBody',
      {hidden: this.state.media.break1 && !this.state.showBody}
    )

    return (
      <div id='orgSidebar'>
        <div
          className={classNames('sidebarHeader', {clicked: this.state.showBody})}
          onClick={headerClick}
          >
          <p>My Projects</p>
        </div>
        <div className={bodyClass}>
          <div
            className='sidebarItem subHeader'
            onClick={this.handleNewProjectClick}>
            <p className='sidebarItemTitle'>New Project</p>
            <p className='sidebarItemArrow'>+</p>
          </div>
          {items}
        </div>
      </div>
    );
  }
});

module.exports = OrgSidebar;
