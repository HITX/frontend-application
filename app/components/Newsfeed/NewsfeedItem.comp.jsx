'use strict'

var React = require('react');

var NewsfeedItem = React.createClass({

  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  handleClick: function() {
    console.log('Will transition to project id: ' + this.props.data.id);
  },

  render: function() {
    return (
      <div className='newsfeedItem'>
        <p className='newsfeedItemTitle'>{this.props.data.title}</p>
        <p className='newsfeedItemDesc'>{this.props.data.description}</p>
        <button className='newsfeedItemButton' onClick={this.handleClick}>&rsaquo;</button>
      </div>
    );
  }
});

module.exports = NewsfeedItem;
