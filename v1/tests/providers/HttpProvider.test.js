'use strict';

var HttpProvider = require('../../providers/HttpProvider');

var EnvConfig = require('../../../environment/EnvConfig');
var Expect = require('expect.js');

(function(self) {

	var _init = function() {
		EnvConfig.Init();
		describe('#HTTPPROVIDER - RETURNS', DescribeHttpProviderReturns);
	};

	var DescribeHttpProviderReturns = function() {
		it('#HTTP PROVIDER RETURNS APP ROUTES', TestHttpProviderReturnsAppRoutes);
	};

	var TestHttpProviderReturnsAppRoutes = function(Done) {
		var App = GetApp();

		HttpProvider.Init(App);

		Expect(App.routes).to.not.be.empty();
		Expect(App.routes).to.be.an('array');

		Expect(App.routes[0].uri).to.be('/');
		Expect(App.routes[0].middlewareCallback).to.be(null);
		Expect(App.routes[0].routeCallback).to.be.an('function');

		Expect(App.routes[1].uri).to.be('/api/generator');
		Expect(App.routes[1].middlewareCallback).to.be(null);
		Expect(App.routes[1].routeCallback).to.be.an('function');

		Expect(App.routes[2].uri).to.be('/api/uploadFile');
		Expect(App.routes[2].middlewareCallback).to.be(null);
		Expect(App.routes[2].routeCallback).to.be.an('function');

		Expect(App.routes[3].uri).to.be('/api/validator');
		Expect(App.routes[3].middlewareCallback).to.be(null);
		Expect(App.routes[3].routeCallback).to.be.an('function');

		/*
		* Test 404 Not Found Router
		**/
		Expect(App.routes[4].uri).to.be.an('function');
		Expect(App.routes[4].middlewareCallback).to.be(null);
		Expect(App.routes[4].routeCallback).to.be(undefined);

		Done();
	};

	var GetApp = function() {
		var App = {};
		App.routes = [];
		App.use = function(Uri, MiddlewareOrRoute, RouteOrNull) {
			var Route = {};
			Route.uri = Uri;
			Route.middlewareCallback = RouteOrNull ? MiddlewareOrRoute : null;
			Route.routeCallback = RouteOrNull ? RouteOrNull : MiddlewareOrRoute;

			App.routes.push(Route);
		};

		return App;
	};

	self.Init = _init;
})(this);

this.Init();