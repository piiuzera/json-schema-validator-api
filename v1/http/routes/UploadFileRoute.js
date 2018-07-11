'use strict';

var UploadFileController = require('../controllers/UploadFileController');
var Express = require('express');

var SecurityMiddleware = require('../middlewares/SecurityMiddleware');

(function() {

	var _route = function() {
		var Router = Express.Router();

		UploadFileController.GetRoutes().forEach(function(Route) {
			if (Route.verifyAuth)
				Router[Route.method](Route.uri, SecurityMiddleware.Verify, Route.callback);
			else
				Router[Route.method](Route.uri, Route.callback);
		});

		return Router;
	};

	module.exports = _route;
})();