'use strict';

var UploadFileRoute = require('../../../http/routes/UploadFileRoute');

var EnvConfig = require('../../../../environment/EnvConfig');
var Expect = require('expect.js');

(function(self) {

	var _init = function() {
		EnvConfig.Init();
		describe('#UPLOADFILEROUTE - RETURNS', DescribeUploadRouteReturns);
	};

	var DescribeUploadRouteReturns = function() {
		it('#UPLOAD ROUTE TO NOT BE NULL', TextUploadRouteToNotBeNull);
	};

	var TextUploadRouteToNotBeNull = function(Done) {
		var Router = UploadFileRoute();
		
		Expect(Router).to.not.be(null);

		Done();
	};

	self.Init = _init;
})(this);

this.Init();