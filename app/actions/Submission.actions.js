'use strict'

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/AppConstants').ActionTypes;

var SubmissionActions = {
  loadSubmission: function(submissionData) {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.SUBMISSION_LOAD,
      data: submissionData
    });
  },

  dropSubmission: function() {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.SUBMISSION_DROP
    });
  },

  loadSubmissionFiles: function(submissionFilesData) {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.SUBMISSION_FILES_LOAD,
      data: submissionFilesData
    });
  },

  updateSubmissionFile: function(submissionFileData) {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.SUBMISSION_FILE_UPDATE,
      data: submissionFileData
    });
  },

  removeSubmissionFile: function(submissionFileId) {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.SUBMISSION_FILE_REMOVE,
      data: submissionFileId
    });
  },

  dropSubmissionFiles: function() {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.SUBMISSION_FILES_DROP
    });
  },

  updateCurrentFile: function(currentFileId) {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.SUBMISSION_CURRENT_FILE_UPDATE,
      data: currentFileId
    });
  },

  dropCurrentFile: function() {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.SUBMISSION_CURRENT_FILE_DROP
    });
  },

  addUploadingFile: function(filename) {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.SUBMISSION_UPLOADING_FILE_ADD,
      data: filename
    });
  },

  succeedUploadingFile: function(fileData) {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.SUBMISSION_UPLOADING_FILE_SUCCEED,
      data: fileData
    });
  },

  failUploadingFile: function(filename) {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.SUBMISSION_UPLOADING_FILE_FAIL,
      data: filename
    });
  },

  dropUploadingFiles: function() {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.SUBMISSION_UPLOADING_FILES_DROP
    });
  }
}

module.exports = SubmissionActions;
