'use strict'

var React = require('react');

var classNames = require('classnames');

var SessionMixin = require('../SessionMixins/SessionMixin.mixin.jsx');

var Slideout = React.createClass({

  propTypes: {
    visible: React.PropTypes.bool,
    onClose: React.PropTypes.func.isRequired
  },

  mixins: [SessionMixin],

  getDefaultProps: function() {
    return {visible: false};
  },

  render: function() {
    return (
      <div
        id='headerSlideout'
        className={classNames({visible: this.props.visible})}
      >
        <div id='slideoutTop'>
          <p onClick={this.props.onClose}>X</p>
        </div>
        <div id='slideoutLinks'>
          <p>Home</p>
          <p>About</p>
          <p>Profile</p>
          <p id='slideoutLogx'>{this.state.session ? 'Log out' : 'Log in'}</p>
        </div>
      </div>
    );
  }
});

module.exports = Slideout;
