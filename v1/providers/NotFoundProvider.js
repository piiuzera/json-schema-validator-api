'use strict';

var HttpStatus = require('../../enums/HttpStatus');

var Utils = require('../../environment/Utils');

(function(self) {

	var _handler = function(App) {
		App.use(CallbackRequestNotFound);
	};

	var CallbackRequestNotFound = function(Request, Response) {
		var HttpResponse = Utils.GetHttpResponseErrorModel(HttpStatus.HTTP_STATUS_NOT_FOUND);
		HttpResponse.message = __('HttpNotFound');
		HttpResponse.code = 'HttpNotFound';

		Utils.GetReturnsResponse(Request, Response, HttpResponse);
	};

	self.Handler = _handler;
})(this);