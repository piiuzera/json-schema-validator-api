'use strict';

var IndexController = require('../../../http/controllers/IndexController');

var HttpStatus = require('../../../../enums/HttpStatus');

var EnvConfig = require('../../../../environment/EnvConfig');
var Utils = require('../../../../environment/Utils');

var Expect = require('expect.js');

(function(self) {
	var _init = function() {
		EnvConfig.Init();
		describe('#INDEXCONTROLLER - API HOME', DescribeApiReturns);
	};

	var DescribeApiReturns = function() {
		it('#HOME API ACCESS RETURNS 200', TestHomeApiAccessReturns200);
		it('#HOME API ACCESS RETURNS MESSAGES ENGLISH', TestHomeApiAccessReturnsMessageEnglish);
		it('#HOME API ACCESS RETURNS MESSAGES PORTUGUESE', TestHomeApiAccessReturnsMessagePortuguese);
		it('#HOME API ACCESS RETURNS MESSAGES SPANISH', TestHomeApiAccessReturnsMessageSpanish);
	};

	var TestHomeApiAccessReturns200 = function(Done) {
		var Request = Utils.GetRequestTestModel();
		var Response = Utils.GetResponseTestModel();

		IndexController.GetRoutes().forEach(function(route) {
			if (route.uri === '/')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(true);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.message).to.not.be('');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_SUCCESS);

		Done();
	};

	var TestHomeApiAccessReturnsMessageEnglish = function(Done) {
		var Request = Utils.GetRequestTestModel();
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('en');

		EnvConfig.SetLanguage('en');

		IndexController.GetRoutes().forEach(function(route) {
			if (route.uri === '/')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.AboutMessage);

		Done();
	};

	var TestHomeApiAccessReturnsMessagePortuguese = function(Done) {
		var Request = Utils.GetRequestTestModel();
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('pt');

		EnvConfig.SetLanguage('pt');

		IndexController.GetRoutes().forEach(function(route) {
			if (route.uri === '/')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.AboutMessage);

		Done();
	};

	var TestHomeApiAccessReturnsMessageSpanish = function(Done) {
		var Request = Utils.GetRequestTestModel();
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('es');

		EnvConfig.SetLanguage('es');

		IndexController.GetRoutes().forEach(function(route) {
			if (route.uri === '/')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.AboutMessage);

		Done();
	};

	self.Init = _init;
})(this);

this.Init();