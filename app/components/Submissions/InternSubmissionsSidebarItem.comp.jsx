'use strict'

var React = require('react');

var Statuses = require('../../constants/AppConstants.js').SubmissionStatuses;

var InternSubmissionsSidebarItem = React.createClass({

  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  render: function() {
    var status;
    switch(this.props.data.status) {
      case Statuses.REGISTERED:
        status = 'Registered';
        break;
      case Statuses.SUBMITTED:
        status = 'Submitted';
        break;
      case Statuses.ACCEPTED:
        status = 'Accepted';
        break;
      case Statuses.REJECTED:
        status = 'Rejected';
        break;
      default:
        status = 'Unknown';
    }

    return (
      <div className='iSSItem'>
        <div className='iSSItemTop'>
          <img className='iSSItemLogo' src='/img/initec_logo.jpg' />
          <div className='iSSItemTitleBlock'>
            <p className='iSSItemTitle'>{this.props.data.project.title}</p>
            <p className='iSSItemPrize'>${Math.round(this.props.data.project.prize)}</p>
          </div>
        </div>
        <div className='iSSItemBottom'>
          <p className='iSSStatus'>{status}</p>
          <p className='iSSEndDateVal'>{this.props.data.project.end_date}</p>
          <p className='iSSEndDateText'>Due -&nbsp;</p>
        </div>
      </div>
    );
  }
});

module.exports = InternSubmissionsSidebarItem;
