'use strict';

var SecurityRoute = require('../../../http/routes/SecurityRoute');

var EnvConfig = require('../../../../environment/EnvConfig');
var Expect = require('expect.js');

(function(self) {

	var _init = function() {
		EnvConfig.Init();
		describe('#SECURITYROUTE - RETURNS', DescribeSecurityRouteReturns);
	};

	var DescribeSecurityRouteReturns = function() {
		it('#SECURITY ROUTE TO NOT BE NULL', TextSecurityRouteToNotBeNull);
	};

	var TextSecurityRouteToNotBeNull = function(Done) {
		var Router = SecurityRoute();
		
		Expect(Router).to.not.be(null);

		Done();
	};

	self.Init = _init;
})(this);

this.Init();