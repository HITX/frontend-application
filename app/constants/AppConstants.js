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

		// Submission
		SUBMISSION_LOAD: null,
		SUBMISSION_DROP: null,
		SUBMISSION_FILES_LOAD: null,
		SUBMISSION_FILE_UPDATE: null,
		SUBMISSION_FILE_REMOVE: null,
		SUBMISSION_FILES_DROP: null,
		SUBMISSION_CURRENT_FILE_UPDATE: null,
		SUBMISSION_CURRENT_FILE_DROP: null,
		SUBMISSION_UPLOADING_FILE_ADD: null,
		SUBMISSION_UPLOADING_FILE_SUCCEED: null,
		SUBMISSION_UPLOADING_FILE_FAIL: null,
		SUBMISSION_UPLOADING_FILES_DROP: null,

		// Intern
		INTERN_LOAD: null,
		INTERN_DROP: null,

		// Org
		ORG_LOAD: null,
		ORG_DROP: null
	}),

	EventTypes: keyMirror({
		// Submission
		SUBMISSION_CHANGE: null,
		SUBMISSION_FILES_CHANGE: null,
		SUBMISSION_CURRENT_FILE_CHANGE: null,
		SUBMISSION_UPLOADING_FILES_CHANGE: null
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
