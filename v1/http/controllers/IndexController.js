'use strict';

var HttpStatus = require('../../../enums/HttpStatus');

var Utils = require('../../../environment/Utils');

(function(self) {

	var BaseRoute = '/';
	var Routes 	  = [];

	var _init = function() {
		Utils.AddRoute(Routes, BaseRoute, 'get', '/', home);
	};

	var home = function(Request, Response) {
		var HttpResponse = Utils.GetHttpResponseModel();
		HttpResponse.message = __('AboutMessage');
		HttpResponse.status = HttpStatus.HTTP_STATUS_SUCCESS;

		Utils.GetReturnsResponse(Request, Response, HttpResponse);
	};

	var _getRoutes = function() {
		return Routes;
	}

	self.Init = _init;
	self.GetRoutes = _getRoutes;
})(this);

this.Init();