'use strict';

var SecurityMiddleware = require('../../../http/middlewares/SecurityMiddleware');

var HttpStatus = require('../../../../enums/HttpStatus');

var AuthFactory = require('../../../../factories/AuthFactory');
var Utils = require('../../../../environment/Utils');
var EnvConfig = require('../../../../environment/EnvConfig');

var Expect = require('expect.js');

(function(self) {

	var _init = function() {
		EnvConfig.Init();
		describe('#SECURITYMIDDLEWARE - VERIFY', DescribeSecurityMiddlewareVerify);
	};

	var DescribeSecurityMiddlewareVerify = function() {
		it('#VERIFY TOKEN RETURNS SUCCESS', TestVerifyTokenReturnsSuccess);
		it('#VERIFY TOKEN RETURNS ERROR NOT FOUND', TestVerifyTokenReturnsErrorNotFound);
		it('#VERIFY TOKEN RETURNS ERROR NOT FOUND ENGLISH', TestVerifyTokenReturnsErrorNotFoundEnglish);
		it('#VERIFY TOKEN RETURNS ERROR NOT FOUND PORTUGUESE', TestVerifyTokenReturnsErrorNotFoundPortuguese);
		it('#VERIFY TOKEN RETURNS ERROR NOT FOUND SPANISH', TestVerifyTokenReturnsErrorNotFoundSpanish);
		it('#VERIFY TOKEN RETURNS ERROR NOT VALID', TestVerifyTokenReturnsErrorNotValid);
		it('#VERIFY TOKEN RETURNS ERROR NOT VALID ENGLISH', TestVerifyTokenReturnsErrorNotValidEnglish);
		it('#VERIFY TOKEN RETURNS ERROR NOT VALID PORTUGUESE', TestVerifyTokenReturnsErrorNotValidPortuguese);
		it('#VERIFY TOKEN RETURNS ERROR NOT VALID SPANISH', TestVerifyTokenReturnsErrorNotValidSpanish);
	};

	var TestVerifyTokenReturnsSuccess = function(Done) {
		var Token = AuthFactory.SignIn(GetDefaultUser());
		var Request = Utils.GetRequestTestModel(Utils.GetRequestHeaderAuthorization(Token));
		var Response = Utils.GetResponseTestModel();

		SecurityMiddleware.Verify(Request, Response, Utils.GetNextTestModel.bind(Response));

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(true);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_SUCCESS);

		Done();
	};

	var TestVerifyTokenReturnsErrorNotFound = function(Done) {
		var Request = Utils.GetRequestTestModel();
		var Response = Utils.GetResponseTestModel();

		SecurityMiddleware.Verify(Request, Response, Utils.GetNextDefault);

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(false);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.message).to.be(__('AuthTokenNotFound'));
		Expect(Response.body.code).to.be('AuthTokenNotFound');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_UNAUTHORIZED);

		Done();
	};

	var TestVerifyTokenReturnsErrorNotFoundEnglish = function(Done) {
		var Request = Utils.GetRequestTestModel();
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('en');

		EnvConfig.SetLanguage('en');

		SecurityMiddleware.Verify(Request, Response, Utils.GetNextDefault);

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(false);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.message).to.be(ResourceFile.AuthTokenNotFound);
		Expect(Response.body.code).to.be('AuthTokenNotFound');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_UNAUTHORIZED);

		Done();
	};

	var TestVerifyTokenReturnsErrorNotFoundPortuguese = function(Done) {
		var Request = Utils.GetRequestTestModel();
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('pt');

		EnvConfig.SetLanguage('pt');

		SecurityMiddleware.Verify(Request, Response, Utils.GetNextDefault);

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(false);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.message).to.be(ResourceFile.AuthTokenNotFound);
		Expect(Response.body.code).to.be('AuthTokenNotFound');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_UNAUTHORIZED);

		Done();
	};

	var TestVerifyTokenReturnsErrorNotFoundSpanish = function(Done) {
		var Request = Utils.GetRequestTestModel();
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('es');

		EnvConfig.SetLanguage('es');

		SecurityMiddleware.Verify(Request, Response, Utils.GetNextDefault);

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(false);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.message).to.be(ResourceFile.AuthTokenNotFound);
		Expect(Response.body.code).to.be('AuthTokenNotFound');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_UNAUTHORIZED);

		Done();
	};

	var TestVerifyTokenReturnsErrorNotValid = function(Done) {
		var Request = Utils.GetRequestTestModel(Utils.GetRequestHeaderAuthorization());
		var Response = Utils.GetResponseTestModel();

		SecurityMiddleware.Verify(Request, Response, Utils.GetNextDefault);

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(false);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.message).to.be(__('AuthTokenNotFound'));
		Expect(Response.body.code).to.be('AuthTokenNotFound');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_UNAUTHORIZED);

		Done();
	};

	var TestVerifyTokenReturnsErrorNotValidEnglish = function(Done) {
		var Request = Utils.GetRequestTestModel(Utils.GetRequestHeaderAuthorization());
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('en');

		EnvConfig.SetLanguage('en');

		SecurityMiddleware.Verify(Request, Response, Utils.GetNextDefault);

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(false);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.message).to.be(ResourceFile.AuthTokenNotFound);
		Expect(Response.body.code).to.be('AuthTokenNotFound');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_UNAUTHORIZED);

		Done();
	};

	var TestVerifyTokenReturnsErrorNotValidPortuguese = function(Done) {
		var Request = Utils.GetRequestTestModel(Utils.GetRequestHeaderAuthorization());
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('pt');

		EnvConfig.SetLanguage('pt');

		SecurityMiddleware.Verify(Request, Response, Utils.GetNextDefault);

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(false);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.message).to.be(ResourceFile.AuthTokenNotFound);
		Expect(Response.body.code).to.be('AuthTokenNotFound');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_UNAUTHORIZED);

		Done();
	};

	var TestVerifyTokenReturnsErrorNotValidSpanish = function(Done) {
		var Request = Utils.GetRequestTestModel(Utils.GetRequestHeaderAuthorization());
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('es');

		EnvConfig.SetLanguage('es');

		SecurityMiddleware.Verify(Request, Response, Utils.GetNextDefault);

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(false);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.message).to.be(ResourceFile.AuthTokenNotFound);
		Expect(Response.body.code).to.be('AuthTokenNotFound');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_UNAUTHORIZED);

		Done();
	};

	var GetDefaultUser = function() {
		var User = {};
		User.id = 1;

		return User;
	};

	self.Init = _init;
})(this);

this.Init();