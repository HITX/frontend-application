'use strict'

var React = require('react');

var Logo = React.createClass({
  render: function() {
    return (
      <div className='logo'>
        <p className='themeAText'>Intern</p>
        <p className='themeBText'>shYps</p>
      </div>
    );
  }
});

module.exports = Logo;
