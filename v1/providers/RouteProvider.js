'use strict';

var IndexRoute = require('../http/routes/IndexRoute');
var GeneratorRoute = require('../http/routes/GeneratorRoute');
var UploadFileRoute = require('../http/routes/UploadFileRoute');
var ValidatorRoute = require('../http/routes/ValidatorRoute');

(function(self) {

	var _initializeRoute = function(App) {
		/*
		* Routes
		*/
		App.use('/', IndexRoute());
		App.use('/api/generator', GeneratorRoute());
		App.use('/api/uploadFile', UploadFileRoute());
		App.use('/api/validator', ValidatorRoute());
	};

	self.InitializeRoute = _initializeRoute;
})(this);