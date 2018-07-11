'use strict';

var IndexRoute = require('../../../http/routes/IndexRoute');

var EnvConfig = require('../../../../environment/EnvConfig');
var Expect = require('expect.js');

(function(self) {

	var _init = function() {
		EnvConfig.Init();
		describe('#INDEXROUTE - RETURNS', DescribeIndexRouteReturns);
	};

	var DescribeIndexRouteReturns = function() {
		it('#INDEX ROUTE TO NOT BE NULL', TextIndexRouteToNotBeNull);
	};

	var TextIndexRouteToNotBeNull = function(Done) {
		var Router = IndexRoute();
		
		Expect(Router).to.not.be(null);

		Done();
	};

	self.Init = _init;
})(this);

this.Init();