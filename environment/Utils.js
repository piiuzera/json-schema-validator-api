'use strict';

var HttpStatus = require('../enums/HttpStatus');

var JsonFile = require('jsonfile');

(function(self) {

	var _addRoutes = function(Routes, baseRoute, method, uri, verifyAuthOrCallback, callbackOrNull) {
		var NewRoute = {};
		NewRoute.baseRoute = baseRoute;
		NewRoute.method = method;
		NewRoute.uri = uri;
		NewRoute.verifyAuth = callbackOrNull ? verifyAuthOrCallback : null;
		NewRoute.callback = callbackOrNull ? callbackOrNull : verifyAuthOrCallback;

		Routes.push(NewRoute);
	};

	var _getThrowException = function(message, code, details) {
		var Exception = {};
		Exception.message = message;
		Exception.code = code;
		Exception.details = details;

		return Exception;
	};

	var _getRequestTestModel = function(Headers, Query, Params) {
		var Request = {};
		Request.headers = {};
		Request.query = {};
		Request.params = {};

		if (Headers)
			Request.headers = Headers;

		if (Query)
			Request.query = Query;

		if (Params)
			Request.params = Params;

		return Request;
	};

	var _getRequestHeaderAuthorization = function(Token) {
		var RequestHeaders = {};
		RequestHeaders.authorization = Token;

		return RequestHeaders;
	};

	var _getResponseTestModel = function() {
		var Response = {};
		Response.statusCode = 0;
		Response.body = null;
		Response.status = function(statusCode) {
			var _json = function(body) {
				Response.body = body;
			};
			Response.statusCode = statusCode;

			return {
				json: _json
			};
		};

		return Response;
	};

	var _getNextTestModel = function() {
		this.body = {};
		this.body.success = true;
		this.body.date = new Date();
		this.body.status = HttpStatus.HTTP_STATUS_SUCCESS;
	};

	var _getHttpResponseModel = function() {
		var HttpResponse = {};
		HttpResponse.success = true;
		HttpResponse.date = new Date();
		HttpResponse.message = '';
		HttpResponse.status = HttpStatus.HTTP_STATUS_SUCCESS;

		return HttpResponse;
	};

	var _getHttpResponseErrorModel = function(status, exception) {
		var HttpResponse = {};
		HttpResponse.success = false;
		HttpResponse.date = new Date();
		HttpResponse.message = exception && exception.message ? exception.message : '';
		HttpResponse.code = exception && exception.code ? exception.code : '';
		HttpResponse.details = exception && exception.details ? exception.details : '';
		HttpResponse.status = status;

		return HttpResponse;
	};

	var _getReturnsResponse = function(Request, Response, HttpResponse) {
		HttpResponse.token = Request.headers.authorization;
		Response.status(HttpResponse.status).json(HttpResponse);
	};

	var _getResourceMessage = function(Language) {
		var ResourceFile = JsonFile.readFileSync(process.cwd() + '/strings/' + Language + '.json');
		return ResourceFile;
	};

	self.AddRoute = _addRoutes;
	self.GetThrowException = _getThrowException;
	self.GetRequestTestModel = _getRequestTestModel;
	self.GetRequestHeaderAuthorization = _getRequestHeaderAuthorization;
	self.GetResponseTestModel = _getResponseTestModel;
	self.GetNextTestModel = _getNextTestModel;
	self.GetHttpResponseModel = _getHttpResponseModel;
	self.GetHttpResponseErrorModel = _getHttpResponseErrorModel;
	self.GetReturnsResponse = _getReturnsResponse;
	self.GetResourceMessage = _getResourceMessage;
})(this);