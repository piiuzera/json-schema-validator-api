'use strict';

var GeneratorController = require('../controllers/GeneratorController');
var Express = require('express');

var SecurityMiddleware = require('../middlewares/SecurityMiddleware');

(function() {

	var _route = function() {
		var Router = Express.Router();

		GeneratorController.GetRoutes().forEach(function(Route) {
			if (Route.verifyAuth)
				Router[Route.method](Route.uri, SecurityMiddleware.Verify, Route.callback);
			else
				Router[Route.method](Route.uri, Route.callback);
		});

		return Router;
	};

	module.exports = _route;
})();