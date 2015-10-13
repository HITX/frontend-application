'use strict'

var React = require('react');
var Navigation = require('react-router').Navigation;
var classNames = require('classnames');

var MediaMixin = require('../MediaMixin/MediaMixin.mixin.jsx');

var DeadlineWidget = require('../Widgets/Deadline.comp.jsx');
var SubmissionCountWidget = require('../Widgets/SubmissionCount.comp.jsx');
var PrizeWidget = require('../Widgets/Prize.comp.jsx');

var MAX_DESC_LENGTH = 400;//140;

var NewsfeedItem = React.createClass({

  mixins: [Navigation, MediaMixin],

  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  handleClick: function() {
    this.transitionTo('projects', {id: this.props.data.id});
  },

  render: function() {

    var data = this.props.data;
    var owner = data.owner;

    var truncDesc = data.description;
    if (truncDesc.length > MAX_DESC_LENGTH) {
      truncDesc = truncDesc.substring(0, MAX_DESC_LENGTH) + '...';
    }

    var title = (
      <p
        className='niTitle'
        onClick={this.handleClick}
      >
        {data.title}
      </p>
    );
    var company = (
      <div className='niOrg'>
        <img className='niOrgLogo' src={owner.logo_url}/>
        <p className='niOrgName'>{owner.org_name}</p>
      </div>
    );
    var tags = (
      <div className='niTags'>
        <p className='tag'>Tag1</p>
        <p className='tag'>Tag2</p>
        <p className='tag'>Tag2</p>
      </div>
    );
    var desc = <p className='niDesc'>{truncDesc}</p>;
    var info = (
      <div className='niInfo'>
        <PrizeWidget prize={data.prize}/>
          <DeadlineWidget date={data.end_date}/>
          <SubmissionCountWidget count={data.submission_count}/>
      </div>
    );

    if (this.state.media.break1) {
      return (
        <div className='newsfeedItem'>
          {title}
          {tags}
          {desc}
          {info}
        </div>
      );
    }

    return (
      <div className='newsfeedItem'>
        <div className='niTop'>
          <div className='niTopLeft'>
            {title}
            {company}
            {tags}
          </div>
          <div className='niTopRight'>
            {desc}
          </div>
        </div>
        {info}
      </div>
    );
  }
});

module.exports = NewsfeedItem;
