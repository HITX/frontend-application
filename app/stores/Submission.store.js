'use strict'

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
// var PayloadSources = AppConstants.PayloadSources;
var ActionTypes = AppConstants.ActionTypes;

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

function _dropSubmissionFiles() {
  _hasSubmissionFiles = false;
  _submissionFilesData = null;
  _submissionFilesMetadata = null;
}

function _updateCurrentFile(currentFileData) {
  _hasCurrentFile = true;
  _currentFileData = currentFileData;
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

  switch(action.actionType) {
    case ActionTypes.SUBMISSION_LOAD:
      _loadSubmission(action.data);
      // SubmissionStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.SUBMISSION_FILES_LOAD:
      _loadSubmissionFiles(action.data);
      // SubmissionStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.SUBMISSION_DROP:
      _dropSubmission();
      // SubmissionStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.SUBMISSION_FILES_DROP:
      _dropSubmissionFiles();
      // SubmissionStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.SUBMISSION_CURRENT_FILE_UPDATE:
      _updateCurrentFile(action.data);
      // SubmissionStore
      break;
    case ActionTypes.SUBMISSION_CURRENT_FILE_DROP:
      _dropCurrentFile();
      //
      break;
    case ActionTypes.SUBMISSION_UPLOADING_FILE_ADD:
      _addUploadingFile(action.data);
      // SubmissionStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.SUBMISSION_UPLOADING_FILE_SUCCEED:
      _removeUploadingFile(action.data.filename);
      _addSubmissionFile(action.data);
      // SubmissionStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.SUBMISSION_UPLOADING_FILE_FAIL:
      _removeUploadingFile(action.data);
      //
      break;
    case ActionTypes.SUBMISSION_UPLOADING_FILES_DROP:
      _dropUploadingFiles();
      // SubmissionStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }

  SubmissionStore.emit(CHANGE_EVENT);
});

module.exports = SubmissionStore;
