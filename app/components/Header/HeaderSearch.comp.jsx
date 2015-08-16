'use strict'

var React = require('react');

var HeaderSearch = React.createClass({
  render: function() {
    return (
      <div id='headerSearch'>
        <input type='text' placeholder='Search'/>
      </div>
    );
  }
});

module.exports = HeaderSearch;
