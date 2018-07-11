'use strict';

var RouteProvider = require('./RouteProvider');
var NotFoundProvider = require('./NotFoundProvider');

(function(self) {

	var _init = function(App) {
		RouteProvider.InitializeRoute(App);
		NotFoundProvider.Handler(App);
	};

	self.Init = _init;
})(this);