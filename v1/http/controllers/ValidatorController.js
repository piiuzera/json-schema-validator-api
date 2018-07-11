'use strict';

var ErrorsException = require('../../../enums/ErrorsException');
var HttpStatus = require('../../../enums/HttpStatus');

var JsonSchemaValidator = require('../../../environment/JsonSchemaValidator');
var Utils = require('../../../environment/Utils');

var Validator = require('validatorjs');

(function(self) {

	var BaseRoute = '/api/validator/';
	var Routes 	  = [];

	var _init = function() {
		Utils.AddRoute(Routes, BaseRoute, 'post', '/validateJson', validateJson);
	};

	var validateJson = function(Request, Response) {
		var HttpResponse = Utils.GetHttpResponseModel();
		try {
			if (typeof Request.body !== 'object')
				throw Utils.GetThrowException(__('JsonFormatInvalid'), 'JsonFormatInvalid');

			validateRequestBody(Request.body);

			if (JsonSchemaValidator.ValidatorObjectBySchema(Request.body.obj, Request.body.schema))
				HttpResponse.message = __('ValidateSuccess');
		} catch (ex) {
			if (ErrorsException.SYNTAX_ERROR === ex.name)
				ex = Utils.GetThrowException(__('JsonFormatInvalid'), 'JsonFormatInvalid', ex.message);

			HttpResponse = Utils.GetHttpResponseErrorModel(HttpStatus.HTTP_STATUS_BAD_REQUEST, ex);
		}
		Utils.GetReturnsResponse(Request, Response, HttpResponse);
	};

	var validateRequestBody = function(body) {
		var validation = {};
		validation.obj = validation.schema = 'required';
		
		var valid = new Validator(body, validation);
		if (valid.fails())
			throw Utils.GetThrowException(__('ParameterIsNotInformed'), 'ParameterIsNotInformed', valid.errors.errors);
	};

	var _getRoutes = function() {
		return Routes;
	};

	self.Init = _init;
	self.GetRoutes = _getRoutes;
})(this);

this.Init();