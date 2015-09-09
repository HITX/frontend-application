'use strict'

var keyMirror = require('react/lib/keyMirror');

module.exports = {
	ActionTypes: keyMirror({
		// Session
		SESSION_LOAD: null,
    SESSION_DROP: null,

		// Project
		PROJECT_LOAD: null,
		PROJECT_DROP: null
	}),

	PayloadSources: keyMirror({
		SERVER_ACTION: null,
		CLIENT_ACTION: null
	}),

	UserTypes: {
		INTERN: 1,
		ORG: 2
	},

	SubmissionStatuses: {
		REGISTERED: 1,
		SUBMITTED: 2,
		ACCEPTED: 3,
		REJECTED: 4
	}
};
