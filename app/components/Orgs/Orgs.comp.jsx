'use strict'

var React = require('react');

var OrgStore = require('../../stores/Org.store.js');
var OrgActions = require('../../actions/Org.actions.js');

var Orgs = React.createClass({

  getInitialState: function() {
    return {org: null};
  },

  _onOrgChange: function() {
    if (this.isMounted()) {
      this.setState({
        org: OrgStore.getOrgData()
      });
    }
  },

  componentDidMount: function() {
    OrgStore.addChangeListener(this._onOrgChange);

    Internshyps.get('orgs/' + this.props.params.id, null)
    .then(
      function(result) {
        OrgActions.loadOrg(result.response);
      },
      function(err) {
        console.log('Error retrieving organization');
        console.log(err);
      }
    );
  },

  componentWillUnmount: function() {
    OrgStore.removeChangeListener(this._onOrgChange);
  },

  render: function() {

    var data = this.state.org;
    if (!data) {
      return null;
    }

    return (
      <div id='orgs'>
        <img id='orgsLogo' src='/img/initec_logo.jpg'/>
        <p id='orgsName'>{data.org_name}</p>
      </div>
    );
  }
});

module.exports = Orgs;
