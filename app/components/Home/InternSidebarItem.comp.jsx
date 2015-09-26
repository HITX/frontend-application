'use strict'

var React = require('react');

var Statuses = require('../../constants/AppConstants.js').SubmissionStatuses;

var InternSidebarItem = React.createClass({

  propTypes: {
    submission: React.PropTypes.object.isRequired
  },

  render: function() {

    var data = this.props.submission

    return (
      <div className='iSItem'>
        <p className='iSItemTitle'>{data.project.title}</p>
        <p className='iSItemArrow'>&rsaquo;</p>
      </div>
    );
  }

  // old_render: function() {
  //   var data = this.props.submission
  //
  //   var status;
  //   switch(data.status) {
  //     case Statuses.REGISTERED:
  //       status = 'Registered';
  //       break;
  //     case Statuses.SUBMITTED:
  //       status = 'Submitted';
  //       break;
  //     case Statuses.ACCEPTED:
  //       status = 'Accepted';
  //       break;
  //     case Statuses.REJECTED:
  //       status = 'Rejected';
  //       break;
  //     default:
  //       status = 'Unknown';
  //   }
  //
  //   return (
  //     <div className='iSItem'>
  //       <div className='iSItemTop'>
  //         <img className='iSItemLogo' src='/img/initec_logo.jpg' />
  //         <div className='iSItemTitleBlock'>
  //           <p className='iSItemTitle'>{data.project.title}</p>
  //           <p className='iSItemPrize'>${Math.round(data.project.prize)}</p>
  //         </div>
  //       </div>
  //       <div className='iSItemBottom'>
  //         <p className='iSStatus'>{status}</p>
  //         <p className='iSEndDateVal'>{data.project.end_date}</p>
  //         <p className='iSEndDateText'>Due -&nbsp;</p>
  //       </div>
  //     </div>
  //   );
  // }
});

module.exports = InternSidebarItem;
