'use strict';

var ErrorsException = require('../../../enums/ErrorsException');
var HttpStatus = require('../../../enums/HttpStatus');

var Utils = require('../../../environment/Utils');

(function(self) {

	var BaseRoute = '/';
	var Routes 	  = [];

	var _init = function() {
		Utils.AddRoute(Routes, BaseRoute, 'post', '/', uploadFile);
	};

	var uploadFile = function(Request, Response) {
		var HttpResponse = Utils.GetHttpResponseModel();
		try {
			if (typeof Request.body !== 'object')
				throw Utils.GetThrowException(__('JsonFormatInvalid'), 'JsonFormatInvalid');

			HttpResponse.result = Request.body;
			HttpResponse.message = __('UploadFileSuccess');
		} catch (ex) {
			if (ErrorsException.SYNTAX_ERROR === ex.name)
				ex = Utils.GetThrowException(__('JsonFormatInvalid'), 'JsonFormatInvalid', ex.message);

			HttpResponse = Utils.GetHttpResponseErrorModel(HttpStatus.HTTP_STATUS_BAD_REQUEST, ex);
		}
		Utils.GetReturnsResponse(Request, Response, HttpResponse);
	};

	var _getRoutes = function() {
		return Routes;
	}

	self.Init = _init;
	self.GetRoutes = _getRoutes;
})(this);

this.Init();