'use strict'

var React = require('react');

var classNames = require('classnames');

var SidebarItem = require('./InternSidebarItem.comp.jsx');

var MediaMixin = require('../MediaMixin/MediaMixin.mixin.jsx');

var InternSidebar = React.createClass({
  propTypes: {
    submissions: React.PropTypes.array.isRequired
  },

  mixins: [MediaMixin],

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

    var headerClick = null;
    if (this.state.media.break1) {
      headerClick = this.handleHeaderClick;
    }

    var bodyClass = classNames(
      'sidebarBody',
      {hidden: this.state.media.break1 && !this.state.showBody}
    )

    return (
      <div id='internSidebar'>
        <div
          className={classNames('sidebarHeader', {clicked: this.state.showBody})}
          onClick={headerClick}
        >
          <p>My Projects</p>
        </div>
        <div className={bodyClass}>
          {items}
        </div>
      </div>
    );
  }
});

module.exports = InternSidebar;
