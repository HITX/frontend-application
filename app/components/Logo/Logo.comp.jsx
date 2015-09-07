'use strict'

var React = require('react');

var Link = require('react-router').Link;

var Logo = React.createClass({
  render: function() {
    return (
      <Link to="home">
        <div className='logo'>
          <p className='themeAText'>Intern</p>
          <p className='themeBText'>shYps</p>
        </div>
      </Link>
    );
  }
});

module.exports = Logo;
