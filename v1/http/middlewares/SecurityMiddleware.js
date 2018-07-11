'use strict';

var JWT = require('jsonwebtoken');

var ErrorsException = require('../../../enums/ErrorsException');
var HttpStatus = require('../../../enums/HttpStatus');

var AuthFactory = require('../../../factories/AuthFactory');
var Utils = require('../../../environment/Utils');

(function(self) {
	var _verify = function(Request, Response, Next) {
		try {
			if (!Request.headers.authorization)
				throw Utils.GetThrowException(__('AuthTokenNotFound'), 'AuthTokenNotFound');

			AuthFactory.Verify(Request.headers.authorization);

			Next();
		} catch (ex) {
			if (ex.name && ex.name === ErrorsException.JWT_ERRORS)
				ex = Utils.GetThrowException(__('AuthTokenNotValid'), 'AuthTokenNotValid', ex.message);

			var HttpResponse = Utils.GetHttpResponseErrorModel(HttpStatus.HTTP_STATUS_UNAUTHORIZED, ex);
			Utils.GetReturnsResponse(Request, Response, HttpResponse);
		}
	};

	self.Verify = _verify;
})(this);