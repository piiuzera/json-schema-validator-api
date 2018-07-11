'use strict';

var Express = require('express');

(function() {

	var _route = function() {
		var Router = Express.Router();

		return Router;
	};

	module.exports = _route;
})();