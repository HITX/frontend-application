'use strict'

var React = require('react');

var Link = require('react-router').Link;

var Footer = React.createClass({
  render: function() {

    var separator = <p className='footerBottomSeparator'>&middot;</p>

    return (
      <div id='footer'>
        <div id='footerTop'>
          <div id='footerTopLinks'>
            <Link to='howitworks'>About</Link>
            <Link to='howitworks'>Contact</Link>
            <Link to='howitworks'>Jobs</Link>
            <Link to='howitworks'>Team</Link>
          </div>
          <div id='footerTopSocial'>
            <p>Social Media Links</p>
          </div>
        </div>
        <div id='footerBottom'>
          <p>Copyright (c) 3001-3008 OurName Inc.</p>
          {separator}
          <Link to='howitworks'>Legal 1</Link>
          {separator}
          <Link to='howitworks'>Legal 2</Link>
        </div>
      </div>
    );
  }
});

module.exports = Footer;
