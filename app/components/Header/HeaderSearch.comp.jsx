'use strict'

var React = require('react');

var HeaderSearch = React.createClass({
  render: function() {
    return (
      <div id='headerSearch'>
        <input type='text' placeholder='Non-existent Search (Wow it does nothing!)'/>
      </div>
    );
  }
});

module.exports = HeaderSearch;
