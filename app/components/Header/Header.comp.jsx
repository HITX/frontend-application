'use strict'

var React = require('react');
var HeaderSearch = require('./HeaderSearch.comp.jsx');

var Header = React.createClass({
  render: function() {
    return (
      <div id='header'>
        <div id='headerLeft'>
          <div id='headerHome'>
            <p className='themeOrangeText'>Intern</p>
            <p className='themeBlueText'>shYps</p>
          </div>
        </div>
        <div id='headerRight'>
          <HeaderSearch/>
          <div id='headerLogin'>
            <a>Log In</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Header;
