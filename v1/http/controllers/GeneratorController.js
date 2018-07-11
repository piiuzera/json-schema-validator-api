'use strict';

var ErrorsException = require('../../../enums/ErrorsException');
var HttpStatus = require('../../../enums/HttpStatus');

var JsonSchemaValidator = require('../../../environment/JsonSchemaValidator');
var Utils = require('../../../environment/Utils');

(function(self) {

	var BaseRoute = '/api/generator/';
	var Routes 	  = [];

	var _init = function() {
		Utils.AddRoute(Routes, BaseRoute, 'post', '/generateSchema', generateSchema);
		Utils.AddRoute(Routes, BaseRoute, 'post', '/generateJsonBySchema', generateJsonBySchema);
	};

	var generateSchema = function(Request, Response) {
		var HttpResponse = Utils.GetHttpResponseModel();
		try {
			if (typeof Request.body !== 'object')
				throw Utils.GetThrowException(__('JsonFormatInvalid'), 'JsonFormatInvalid');

			if (Request.query.download)
				HttpResponse.result = GenerateObjectToBase64(JsonSchemaValidator.GenerateSchemaByObject(Request.body));
			else
				HttpResponse.result = JsonSchemaValidator.GenerateSchemaByObject(Request.body);

			HttpResponse.message = __('SchemaGeneratedSuccess');
			HttpResponse.filename = (Request.query.filename || (process.env.FILENAME_DEFAULT + '.json'));
		} catch (ex) {
			if (ErrorsException.SYNTAX_ERROR === ex.name)
				ex = Utils.GetThrowException(__('JsonFormatInvalid'), 'JsonFormatInvalid', ex.message);

			HttpResponse = Utils.GetHttpResponseErrorModel(HttpStatus.HTTP_STATUS_BAD_REQUEST, ex);
		}
		Utils.GetReturnsResponse(Request, Response, HttpResponse);
	};

	var generateJsonBySchema = function(Request, Response) {
		var HttpResponse = Utils.GetHttpResponseModel();
		try {
			if (typeof Request.body !== 'object')
				throw Utils.GetThrowException(__('JsonFormatInvalid'), 'JsonFormatInvalid');

			if (Request.query.download)
				HttpResponse.result = GenerateObjectToBase64(JsonSchemaValidator.GenerateObjectBySchema(Request.body));
			else
				HttpResponse.result = JsonSchemaValidator.GenerateObjectBySchema(Request.body);

			HttpResponse.message = __('JsonGeneratedSuccess');
			HttpResponse.filename = (Request.query.filename || (process.env.FILENAME_DEFAULT + '.json'));
		} catch (ex) {
			if (ErrorsException.SYNTAX_ERROR === ex.name)
				ex = Utils.GetThrowException(__('JsonFormatInvalid'), 'JsonFormatInvalid', ex.message);

			HttpResponse = Utils.GetHttpResponseErrorModel(HttpStatus.HTTP_STATUS_BAD_REQUEST, ex);
		}
		Utils.GetReturnsResponse(Request, Response, HttpResponse);
	};

	var GenerateObjectToBase64 = function(obj) {
		var base64 = Buffer.from(JSON.stringify(obj)).toString('base64');
		return ('data:application/json;base64,' + base64);
	};

	var _getRoutes = function() {
		return Routes;
	}

	self.Init = _init;
	self.GetRoutes = _getRoutes;
})(this);

this.Init();