'use strict'

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header = require('../Header/Header.comp.jsx')
var Footer = require('../Footer/Footer.comp.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div id='application'>
        <Header/>
        <div id="content">
          <RouteHandler/>
        </div>
        <Footer/>
      </div>
    );
  }
});

module.exports = App;
