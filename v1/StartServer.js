'use strict';

var HttpProvider = require('./providers/HttpProvider');

(function(self) {

	var _init = function(App) {
		HttpProvider.Init(App);
		
		App.listen(
			process.env.APP_PORT,
			callbackAppListen.bind(this, process.env.APP_PORT)
		);
	};

	var callbackAppListen = function(AppPort) {
		console.log('Server has Started http://localhost:' + AppPort);
	};

	self.Init = _init;

})(this);