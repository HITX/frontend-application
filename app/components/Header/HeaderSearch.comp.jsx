'use strict'

var React = require('react');
var MediaQuery = require('react-responsive');

var HeaderSearch = React.createClass({
  render: function() {
    return (
      <div id='headerSearch'>
        <MediaQuery query='(min-width: 55rem)'>
          <input type='text' placeholder='Non-existent Search (Wow it does nothing!)'/>
        </MediaQuery>
        <MediaQuery query='(max-width: 64rem)'>
          <p>XX</p>
        </MediaQuery>
      </div>
    );
  }
});

module.exports = HeaderSearch;
