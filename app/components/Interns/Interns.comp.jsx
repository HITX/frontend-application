'use strict'

var React = require('react');

var InternStore = require('../../stores/Intern.store.js');
var InternActions = require('../../actions/Intern.actions.js');
// var SessionMixin = require('../SessionMixins/SessionMixin.mixin.jsx');

var Interns = React.createClass({

  // mixins: [SessionMixin],

  getInitialState: function() {
    return {intern: null};
  },

  _onInternChange: function() {
    if (this.isMounted()) {
      this.setState({
        intern: InternStore.getInternData()
      });
    }
  },

  componentDidMount: function() {
    InternStore.addChangeListener(this._onInternChange);

    Internshyps.get('interns/' + this.props.params.id, null)
    .then(
      function(result) {
        InternActions.loadIntern(result.response);
      },
      function(err) {
        console.log('Error retrieving intern');
        console.log(err);
      }
    );
  },

  componentWillUnmount: function() {
    InternStore.removeChangeListener(this._onInternChange);
  },

  render: function() {

    var data = this.state.intern;
    if (!data) {
      return null;
    }

    return (
      <div id='interns'>
        <div id='internsHeader'>
          <div id='internsHeaderLeft'>
            <img id='internsAvatar' src='/img/user_icon.jpg'/>
            <p id='internsEmail'>{data.email}</p>
          </div>
          <div id='internsHeaderRight'>
            <p id='internsName'>{data.first_name + ' ' + data.last_name}</p>
            <p id='internsUsername'>{data.username}</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Interns;
