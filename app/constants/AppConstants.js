'use strict'

var keyMirror = require('react/lib/keyMirror');

module.exports = {
	ActionTypes: keyMirror({
		// Session
		SESSION_LOAD: null,
    SESSION_DROP: null,
		SESSION_ADD_PROJECT: null,
		SESSION_ADD_SUBMISSION: null,

		// Project
		PROJECT_LOAD: null,
		PROJECT_DROP: null,

		// Intern
		INTERN_LOAD: null,
		INTERN_DROP: null,

		// Org
		ORG_LOAD: null,
		ORG_DROP: null
	}),

	PayloadSources: keyMirror({
		SERVER_ACTION: null,
		CLIENT_ACTION: null
	}),

	UserTypes: {
		ANONYMOUS: 0,
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
