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
    // var submissionText = this.props.data.submission_count + ' submission';
    // if (this.props.data.submission_count != 1) {
    //   submissionText += 's';
    // }

    return (
      <div className='newsfeedItem'>
        <div className='newsfeedItemTop'>
          <img className='newsfeedItemLogo' src='/img/initec_logo.jpg'/>
          <p className='newsfeedItemOrgName'>{this.props.data.owner.org_name}</p>
        </div>
        <div className='newsfeedItemMiddle'>
          <div className='newsfeedItemTitleBlock'>
            <p className='newsfeedItemTitle'>{this.props.data.title}</p>
            <p className='newsfeedItemPrize'>${Math.round(this.props.data.prize)}</p>
          </div>
          <p className='newsfeedItemDesc'>{this.props.data.description}</p>
        </div>
        <hr/>
        <div className='newsfeedItemBottom'>
          <div className='newsfeedItemSubmissionsBlock'>
            <p className='newsfeedItemSubmissionsText'>Submissions: &nbsp;</p>
            <p className='newsfeedItemSubmissionsVal'>{this.props.data.submission_count}</p>
          </div>
          <div className='newsfeedItemDeadlineBlock'>
            <p className='newsfeedItemDeadlineText'>Deadline: &nbsp;</p>
              <p className='newsfeedItemDeadlineVal'>{this.props.data.end_date}</p>
          </div>
        </div>
      </div>
    );
  }

  // render: function() {
  //   return (
  //     <div className='newsfeedItem'>
  //       <p className='newsfeedItemTitle'>{this.props.data.title}</p>
  //       <p className='newsfeedItemDesc'>{this.props.data.description}</p>
  //       <button className='newsfeedItemButton' onClick={this.handleClick}>&rsaquo;</button>
  //     </div>
  //   );
  // }
});

module.exports = NewsfeedItem;
