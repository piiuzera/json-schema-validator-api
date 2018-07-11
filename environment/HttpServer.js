'use strict';

var BodyParser = require('body-parser');
var Cors = require('cors');
var Express = require('express');
var ResourceConfig = require('i18n');

(function(self) {

	var App = Express();

	var _init = function() {
		App.use(BodyParser.urlencoded({
			extended: true
		}));
		App.use(BodyParser.json());
		App.use(Cors(GetCorsConfiguration()));
		App.use(ResourceConfig.init);
	};

	var _getApp = function() {
		return App;
	};

	var GetCorsConfiguration = function() {
		var CorsOptions = {};
		CorsOptions.origin = '*';
		CorsOptions.methods = '*';
		CorsOptions.allowedHeaders = '*';
		CorsOptions.optionsSuccessStatus = true;

		return CorsOptions;
	};

	self.Init = _init;
	self.GetApp = _getApp;
})(this);

this.Init();