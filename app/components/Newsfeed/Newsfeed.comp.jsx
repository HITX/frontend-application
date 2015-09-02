'use strict'

var React = require('react');

var NewsfeedItem = require('./NewsfeedItem.comp.jsx');

var Newsfeed = React.createClass({
  getInitialState: function() {
    return {items: []};
  },

  componentDidMount: function() {
    Internshyps.get('newsfeed', {'expand': 'owner'}).then(
      function(result) {
        if (this.isMounted()){
          this.setState({
            items: result.response
          });
        }
      }.bind(this),
      function(err) {
        console.log('Error retrieving newsfeed:');
        console.log(err)
      }
    );
  },

  render: function() {
    return (
      <div id='newsfeed'>
        {
          this.state.items.map(function(item) {
            return <NewsfeedItem data={item} key={item.id}/>
          })
        }
      </div>
    );
  }
});

module.exports = Newsfeed;
