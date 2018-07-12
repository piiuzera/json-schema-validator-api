'use strict';

var ValidatorRoute = require('../../../http/routes/ValidatorRoute');

var EnvConfig = require('../../../../environment/EnvConfig');
var Expect = require('expect.js');

(function(self) {

	var _init = function() {
		EnvConfig.Init();
		describe('#VALIDATORROUTE - RETURNS', DescribeValidatorRouteReturns);
	};

	var DescribeValidatorRouteReturns = function() {
		it('#VALIDATOR ROUTE TO NOT BE NULL', TextValidatorRouteToNotBeNull);
	};

	var TextValidatorRouteToNotBeNull = function(Done) {
		var Router = ValidatorRoute();
		
		Expect(Router).to.not.be(null);

		Done();
	};

	self.Init = _init;
})(this);

this.Init();