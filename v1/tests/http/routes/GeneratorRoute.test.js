'use strict';

var GeneratorRoute = require('../../../http/routes/GeneratorRoute');

var EnvConfig = require('../../../../environment/EnvConfig');
var Expect = require('expect.js');

(function(self) {

	var _init = function() {
		EnvConfig.Init();
		describe('#GENERATORROUTE - RETURNS', DescribeGeneratorRouteReturns);
	};

	var DescribeGeneratorRouteReturns = function() {
		it('#GENERATOR ROUTE TO NOT BE NULL', TextGeneratorRouteToNotBeNull);
	};

	var TextGeneratorRouteToNotBeNull = function(Done) {
		var Router = GeneratorRoute();
		
		Expect(Router).to.not.be(null);

		Done();
	};

	self.Init = _init;
})(this);

this.Init();