'use strict';

var EnvConfig = require('./environment/EnvConfig');
var HttpServer = require('./environment/HttpServer');

(function(self) {

	var _init = function() {
		var StartServer = EnvConfig.GetStartServer();
		StartServer.Init(HttpServer.GetApp());
	};

	self.Init = _init;
})(this);

this.Init();