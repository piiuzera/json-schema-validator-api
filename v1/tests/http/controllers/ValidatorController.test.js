'use strict';

var ValidatorController = require('../../../http/controllers/ValidatorController');

var HttpStatus = require('../../../../enums/HttpStatus');

var EnvConfig = require('../../../../environment/EnvConfig');
var Utils = require('../../../../environment/Utils');

var Expect = require('expect.js');
var JsonFile = require('jsonfile');

(function(self) {

	var ValidatorApiAccessReturnSuccess = {};
	var ValidatorApiAccessReturnSuccessSchema = {};

	var _init = function() {
		EnvConfig.Init();
		InitializeMock();

		describe('#VALIDATORCONTROLLER - API VALIDATE JSON RETURNS', DescribeValidateJsonApiReturns);
	};

	var InitializeMock = function() {
		ValidatorApiAccessReturnSuccess = JsonFile.readFileSync(__dirname + '../../../mocks/validator/ValidatorApiAccessReturnSuccess.json');
		ValidatorApiAccessReturnSuccessSchema = JsonFile.readFileSync(__dirname + '../../../mocks/validator/ValidatorApiAccessReturnSuccess.schema.json');
	};

	var DescribeValidateJsonApiReturns = function() {
		it('#VALIDATE JSON API ACCESS RETURNS SUCCESS', TestValidateJsonApiAccessReturnsSuccess);
		it('#VALIDATE JSON API ACCESS RETURNS ERROR', TestValidateJsonApiAccessReturnsError);
		it('#VALIDATE JSON API ACCESS RETURNS MESSAGES ENGLISH', TestValidateJsonApiAccessReturnsMessageEnglish);
		it('#VALIDATE JSON API ACCESS RETURNS MESSAGES PORTUGUESE', TestValidateJsonApiAccessReturnsMessagePortuguese);
		it('#VALIDATE JSON API ACCESS RETURNS MESSAGES SPANISH', TestValidateJsonApiAccessReturnsMessageSpanish);
	};

	var TestValidateJsonApiAccessReturnsSuccess = function(Done) {
		var Request = Utils.GetRequestTestModel(GetRequestBodyAccessReturns());
		var Response = Utils.GetResponseTestModel();

		ValidatorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/validateJson')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(true);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.message).to.not.be('');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_SUCCESS);

		Done();
	};

	var TestValidateJsonApiAccessReturnsError = function(Done) {
		var Request = Utils.GetRequestTestModel();
		var Response = Utils.GetResponseTestModel();

		ValidatorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/validateJson')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(false);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.message).to.not.be('');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_BAD_REQUEST);

		Done();
	};

	var TestValidateJsonApiAccessReturnsMessageEnglish = function(Done) {
		var Request = Utils.GetRequestTestModel(GetRequestBodyAccessReturns());
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('en');

		EnvConfig.SetLanguage('en');

		ValidatorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/validateJson')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.ValidateSuccess);

		Done();
	};

	var TestValidateJsonApiAccessReturnsMessagePortuguese = function(Done) {
		var Request = Utils.GetRequestTestModel(GetRequestBodyAccessReturns());
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('pt');

		EnvConfig.SetLanguage('pt');

		ValidatorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/validateJson')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.ValidateSuccess);

		Done();
	};

	var TestValidateJsonApiAccessReturnsMessageSpanish = function(Done) {
		var Request = Utils.GetRequestTestModel(GetRequestBodyAccessReturns());
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('es');

		EnvConfig.SetLanguage('es');

		ValidatorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/validateJson')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.ValidateSuccess);

		Done();
	};

	var GetRequestBodyAccessReturns = function() {
		var RequestBodyAccessReturns = {};
		RequestBodyAccessReturns.obj = ValidatorApiAccessReturnSuccess;
		RequestBodyAccessReturns.schema = ValidatorApiAccessReturnSuccessSchema;

		return RequestBodyAccessReturns;
	};

	self.Init = _init;
})(this);

this.Init();