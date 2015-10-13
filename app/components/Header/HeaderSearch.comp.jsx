'use strict'

var React = require('react');

var MediaMixin = require('../MediaMixin/MediaMixin.mixin.jsx');

var HeaderSearch = React.createClass({

  propTypes: {
    onIconClick: React.PropTypes.func.isRequired
  },

  mixins: [MediaMixin],

  render: function() {

    var contents;
    if (this.state.media.break1) {
      contents = (
        <img
          src='/img/search_icon_white.svg'
          onClick={this.props.onIconClick}
        />
      );
    } else {
      contents = (
        <input
          type='text'
          placeholder='Non-existent Search (Wow it does nothing!)'
        />
      );
    }

    return (
      <div id='headerSearch'>
        {contents}
      </div>
    );
  }
});

module.exports = HeaderSearch;
