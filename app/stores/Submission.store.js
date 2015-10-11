'use strict'

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
// var PayloadSources = AppConstants.PayloadSources;
var ActionTypes = AppConstants.ActionTypes;
var EventTypes = AppConstants.EventTypes;

var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';


var _hasSubmission = false;
var _submissionData = null;

var _hasSubmissionFiles = false;
var _submissionFilesData = null;
var _submissionFilesMetadata = null;

var _hasCurrentFile = false;
var _currentFileData = null;

var _hasUploadingFiles = false;
var _uploadingFilesData = [];

function _loadSubmission(submissionData) {

  // TODO: Validate submission data here

  _hasSubmission = true;
  _submissionData = submissionData;
}

function _dropSubmission() {
  _hasSubmission = false;
  _submissionData = null;
}

// Helper
function _getFileIndexById(fileId) {
  if (!_hasSubmissionFiles) {
    return -1;
  }
  for (var i = 0; i < _submissionFilesData.length; i++) {
    if (_submissionFilesData[i].id == fileId) {
      return i;
    }
  }
  return -1;
}

function _loadSubmissionFiles(submissionFilesData) {
  _hasSubmissionFiles = true;
  _submissionFilesData = submissionFilesData.results;
  delete submissionFilesData.results;
  _submissionFilesMetadata = submissionFilesData;
}

function _addSubmissionFile(submissionFileData) {
  if (_hasSubmissionFiles) {
    _submissionFilesData.unshift(submissionFileData);
  }
}

function _updateSubmissionFile(submissionFileData) {
  var idx = _getFileIndexById(submissionFileData.id);
  if (idx >= 0) {
    if (_hasCurrentFile && _currentFileData === _submissionFilesData[idx]) {
      _currentFileData = submissionFileData;
    }
    _submissionFilesData[idx] = submissionFileData;
  }
}

function _dropSubmissionFiles() {
  _hasSubmissionFiles = false;
  _submissionFilesData = null;
  _submissionFilesMetadata = null;
}

function _updateCurrentFile(currentFileId) {
  var idx = _getFileIndexById(currentFileId);
  if (idx >= 0) {
    _hasCurrentFile = true;
    _currentFileData = _submissionFilesData[idx];
  }
}

function _dropCurrentFile() {
  _hasCurrentFile = false;
  _currentFileData = null;
}

function _addUploadingFile(filename) {
  _hasUploadingFiles = true;
  _uploadingFilesData.unshift(filename);
}

function _removeUploadingFile(filename) {
  var idx = _uploadingFilesData.indexOf(filename);
  if (idx > -1) {
    _uploadingFilesData.splice(idx, 1);
  }
  if (_uploadingFilesData.length == 0) {
    _hasUploadingFiles = false;
  }
}

function _dropUploadingFiles() {
  _hasUploadingFiles = false;
  _uploadingFilesData = [];
}

var SubmissionStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) { this.on(CHANGE_EVENT, cb); },
  removeChangeListener: function(cb) { this.removeListener(CHANGE_EVENT, cb); },

  hasSubmission: function() { return _hasSubmission; },
  hasSubmissionFiles: function() { return _hasSubmissionFiles; },
  hasCurrentFile: function() { return _hasCurrentFile; },
  hasUploadingFiles: function() { return _hasUploadingFiles; },

  getSubmissionData: function() { return _submissionData; },
  getSubmissionFilesData: function() { return _submissionFilesData; },
  getCurrentFileData: function() { return _currentFileData; },
  getUploadingFilesData: function() {
    if (this.hasUploadingFiles()) {
      return _uploadingFilesData;
    }
    return null;
  }
});

SubmissionStore.dispatcherToken = AppDispatcher.register(function(payload) {
  // var source = payload.source;
  var action = payload.action;
  var eventTypes = null;

  switch(action.actionType) {
    // Submission actions
    case ActionTypes.SUBMISSION_LOAD:
      _loadSubmission(action.data);
      eventTypes = [EventTypes.SUBMISSION_CHANGE];
      break;
    case ActionTypes.SUBMISSION_DROP:
      _dropSubmission();
      eventTypes = [EventTypes.SUBMISSION_CHANGE];
      break;

    // Submission files actions
    case ActionTypes.SUBMISSION_FILES_LOAD:
      _loadSubmissionFiles(action.data);
      eventTypes = [EventTypes.SUBMISSION_FILES_CHANGE];
      break;
    case ActionTypes.SUBMISSION_FILE_UPDATE:
      _updateSubmissionFile(action.data);
      eventTypes = [EventTypes.SUBMISSION_FILES_CHANGE];
      break;
    case ActionTypes.SUBMISSION_FILES_DROP:
      _dropSubmissionFiles();
      eventTypes = [EventTypes.SUBMISSION_FILES_CHANGE];
      break;

    // Current file actions
    case ActionTypes.SUBMISSION_CURRENT_FILE_UPDATE:
      _updateCurrentFile(action.data);
      eventTypes = [EventTypes.SUBMISSION_CURRENT_FILE_CHANGE];
      break;
    case ActionTypes.SUBMISSION_CURRENT_FILE_DROP:
      _dropCurrentFile();
      eventTypes = [EventTypes.SUBMISSION_CURRENT_FILE_CHANGE];
      break;

    // Uploading files actions
    case ActionTypes.SUBMISSION_UPLOADING_FILE_ADD:
      _addUploadingFile(action.data);
      eventTypes = [EventTypes.SUBMISSION_UPLOADING_FILES_CHANGE];
      break;
    case ActionTypes.SUBMISSION_UPLOADING_FILE_SUCCEED:
      _removeUploadingFile(action.data.filename);
      _addSubmissionFile(action.data);
      eventTypes = [
        EventTypes.SUBMISSION_UPLOADING_FILES_CHANGE,
        EventTypes.SUBMISSION_FILES_CHANGE
      ];
      break;
    case ActionTypes.SUBMISSION_UPLOADING_FILE_FAIL:
      _removeUploadingFile(action.data);
      eventTypes = [EventTypes.SUBMISSION_UPLOADING_FILES_CHANGE];
      break;
    case ActionTypes.SUBMISSION_UPLOADING_FILES_DROP:
      _dropUploadingFiles();
      eventTypes = [EventTypes.SUBMISSION_UPLOADING_FILES_CHANGE];
      break;
    default:
      return true;
  }

  SubmissionStore.emit(CHANGE_EVENT, eventTypes);
});

module.exports = SubmissionStore;
