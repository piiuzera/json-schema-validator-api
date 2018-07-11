'use strict';

var DotEnv = require('dotenv');
var Glob = require('glob');
var ResourceConfig = require('i18n');

(function(self) {

	var _init = function() {
		DotEnv.config();
		ConfigureResourceConfig();
	};

	var ConfigureResourceConfig = function() {
		var Configuration = {};
		Configuration.locales = ['en', 'es', 'pt'];
		Configuration.directory = process.cwd() + '/strings';
		Configuration.register = global;
		
		ResourceConfig.configure(Configuration);
	};

	var _setLanguage = function(Language) {
		ResourceConfig.setLocale(Language);
	};

	var _getStartServer = function() {
		var StartServer = require('../' + process.env.APP_VERSION + '/StartServer');
		return StartServer;
	};

	self.Init = _init;
	self.SetLanguage = _setLanguage;
	self.GetStartServer = _getStartServer;
})(this);

this.Init();