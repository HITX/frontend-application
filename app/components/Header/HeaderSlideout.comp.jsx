'use strict'

var React = require('react');

var classNames = require('classnames');

var Slideout = React.createClass({

  propTypes: {
    visible: React.PropTypes.bool,
    links: React.PropTypes.array,
    onClose: React.PropTypes.func.isRequired,
  },

  getDefaultProps: function() {
    return {
      visible: false,
      links: []
    };
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
          {
            this.props.links.map(function(item, idx) {
              return (
                <p
                  key={idx}
                  onClick={item.handler}
                  >
                  {item.name}
                </p>
              );
            })
          }
        </div>
      </div>
    );
  }
});

module.exports = Slideout;
