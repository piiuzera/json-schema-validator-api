'use strict';

var RouteProvider = require('../../providers/RouteProvider');

var EnvConfig = require('../../../environment/EnvConfig');
var Expect = require('expect.js');

(function(self) {

	var _init = function() {
		EnvConfig.Init();
		describe('#ROUTEPROVIDER - RETURNS', DescribeRouteProviderReturns);
	};

	var DescribeRouteProviderReturns = function() {
		it('#ROUTE PROVIDER RETURNS APP ROUTES', TestRouteProviderReturnsAppRoutes);
	};

	var TestRouteProviderReturnsAppRoutes = function(Done) {
		var App = GetApp();

		RouteProvider.InitializeRoute(App);

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