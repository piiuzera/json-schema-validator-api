'use strict';

var UploadFileController = require('../../../http/controllers/UploadFileController');

var HttpStatus = require('../../../../enums/HttpStatus');

var EnvConfig = require('../../../../environment/EnvConfig');
var Utils = require('../../../../environment/Utils');

var Expect = require('expect.js');
var JsonFile = require('jsonfile');

(function(self) {

	var UploadFileApiAccessReturnSuccess = {};

	var _init = function() {
		EnvConfig.Init();
		InitializeMock();

		describe('#UPLOADFILECONTROLLER - API UPLOAD FILE RETURNS', DescribeUploadFilesApiReturns);
	};

	var InitializeMock = function() {
		UploadFileApiAccessReturnSuccess = JsonFile.readFileSync(__dirname + '../../../mocks/uploadFile/UploadFileApiAccessReturnSuccess.json');
	};

	var DescribeUploadFilesApiReturns = function() {
		it('#UPLOAD FILE API ACCESS RETURNS SUCCESS', TestUploadFileApiAccessReturnsSuccess);
		it('#UPLOAD FILE API ACCESS RETURNS ERROR', TestUploadFileApiAccessReturnsError);
		it('#UPLOAD FILE API ACCESS RETURNS MESSAGES ENGLISH', TestUploadFileApiAccessReturnsMessageEnglish);
		it('#UPLOAD FILE API ACCESS RETURNS MESSAGES PORTUGUESE', TestUploadFileApiAccessReturnsMessagePortuguese);
		it('#UPLOAD FILE API ACCESS RETURNS MESSAGES SPANISH', TestUploadFileApiAccessReturnsMessageSpanish);
	};

	var TestUploadFileApiAccessReturnsSuccess = function(Done) {
		var Request = Utils.GetRequestTestModel(UploadFileApiAccessReturnSuccess);
		var Response = Utils.GetResponseTestModel();

		UploadFileController.GetRoutes().forEach(function(route) {
			if (route.uri === '/')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(true);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.result).to.be.an('object');
		Expect(Response.body.message).to.not.be('');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_SUCCESS);

		Done();
	};

	var TestUploadFileApiAccessReturnsError = function(Done) {
		var Request = Utils.GetRequestTestModel();
		var Response = Utils.GetResponseTestModel();

		UploadFileController.GetRoutes().forEach(function(route) {
			if (route.uri === '/')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(false);
		Expect(Response.body.message).to.be(__('JsonFormatInvalid'));
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_BAD_REQUEST);

		Done();
	};

	var TestUploadFileApiAccessReturnsMessageEnglish = function(Done) {
		var Request = Utils.GetRequestTestModel(UploadFileApiAccessReturnSuccess);
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('en');

		EnvConfig.SetLanguage('en');

		UploadFileController.GetRoutes().forEach(function(route) {
			if (route.uri === '/')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.UploadFileSuccess);

		Done();
	};

	var TestUploadFileApiAccessReturnsMessagePortuguese = function(Done) {
		var Request = Utils.GetRequestTestModel(UploadFileApiAccessReturnSuccess);
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('pt');

		EnvConfig.SetLanguage('pt');

		UploadFileController.GetRoutes().forEach(function(route) {
			if (route.uri === '/')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.UploadFileSuccess);

		Done();
	};

	var TestUploadFileApiAccessReturnsMessageSpanish = function(Done) {
		var Request = Utils.GetRequestTestModel(UploadFileApiAccessReturnSuccess);
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('es');

		EnvConfig.SetLanguage('es');

		UploadFileController.GetRoutes().forEach(function(route) {
			if (route.uri === '/')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.UploadFileSuccess);

		Done();
	};

	self.Init = _init;
})(this);

this.Init();