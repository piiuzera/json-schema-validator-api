'use strict';

var GeneratorController = require('../../../http/controllers/GeneratorController');

var HttpStatus = require('../../../../enums/HttpStatus');

var EnvConfig = require('../../../../environment/EnvConfig');
var Utils = require('../../../../environment/Utils');

var Expect = require('expect.js');
var JsonFile = require('jsonfile');

(function(self) {

	var GenerateSchemaApiAccessReturnSuccess = {};
	var GenerateSchemaApiAccessReturnSuccessSchema = {};

	var QueryDownloadSchema = {};
	var QueryDownloadAndFilenameSchema = {};

	var _init = function() {
		EnvConfig.Init();
		InitializeSchemas();
		InitializeQueryDownloadSchema();
		InitializeQueryDownloadAndFilenameSchema();

		describe('#GENERATORCONTROLLER - GENERATE SCHEMA', DescribeGenerateSchema);
		describe('#GENERATORCONTROLLER - GENERATE JSON BY SCHEMA', DescribeGenerateJsonBySchema);
	};

	var InitializeSchemas = function() {
		GenerateSchemaApiAccessReturnSuccess = JsonFile.readFileSync(__dirname + '../../../mocks/generator/GenerateSchemaApiAccessReturnSuccess.json');
		GenerateSchemaApiAccessReturnSuccessSchema = JsonFile.readFileSync(__dirname + '../../../mocks/generator/GenerateSchemaApiAccessReturnSuccess.schema.json');
	};

	var InitializeQueryDownloadSchema = function() {
		QueryDownloadSchema.download = true;
	};

	var InitializeQueryDownloadAndFilenameSchema = function() {
		QueryDownloadAndFilenameSchema.download = true;
		QueryDownloadAndFilenameSchema.filename = 'SchemaFile.json';
	};

	var DescribeGenerateSchema = function() {
		it('#GENERATESCHEMA API ACCESS RETURN SUCCESS', TestGenerateSchemaApiAccessReturnSuccess);
		it('#GENERATESCHEMA API ACCESS RETURN SUCCESS MESSAGES ENGLISH', TestGenerateSchemaApiAccessReturnSuccessMessagesEnglish);
		it('#GENERATESCHEMA API ACCESS RETURN SUCCESS MESSAGES PORTUGUESE', TestGenerateSchemaApiAccessReturnSuccessMessagesPortuguese);
		it('#GENERATESCHEMA API ACCESS RETURN SUCCESS MESSAGES SPANISH', TestGenerateSchemaApiAccessReturnSuccessMessagesSpanish);

		it('#GENERATESCHEMA API ACCESS RETURN ERROR', TestGenerateSchemaApiAccessReturnError);

		it('#GENERATESCHEMA API ACCESS RETURN DOWNLOAD SUCCESS', TestGenerateSchemaApiAccessReturnDownloadSuccess);
		it('#GENERATESCHEMA API ACCESS RETURN DOWNLOAD AND FILENAME SUCCESS', TestGenerateSchemaApiAccessReturnDownloadAndFilenameSuccess);
		it('#GENERATESCHEMA API ACCESS RETURN DOWNLOAD SUCCESS MESSAGES ENGLISH', TestGenerateSchemaApiAccessReturnDownloadSuccessMessagesEnglish);
		it('#GENERATESCHEMA API ACCESS RETURN DOWNLOAD SUCCESS MESSAGES PORTUGUESE', TestGenerateSchemaApiAccessReturnDownloadSuccessMessagesPortuguese);
		it('#GENERATESCHEMA API ACCESS RETURN DOWNLOAD SUCCESS MESSAGES SPANISH', TestGenerateSchemaApiAccessReturnDownloadSuccessMessagesSpanish);
	};

	var DescribeGenerateJsonBySchema = function() {
		it('#GENERATEJSONBYSCHEMA API ACCESS RETURN SUCCESS', TestGenerateJsonBySchemaApiAccessReturnSuccess);
		it('#GENERATEJSONBYSCHEMA API ACCESS RETURN SUCCESS MESSAGES ENGLISH', TestGenerateJsonBySchemaApiAccessReturnSuccessMessagesEnglish);
		it('#GENERATEJSONBYSCHEMA API ACCESS RETURN SUCCESS MESSAGES PORTUGUESE', TestGenerateJsonBySchemaApiAccessReturnSuccessMessagesPortuguese);
		it('#GENERATEJSONBYSCHEMA API ACCESS RETURN SUCCESS MESSAGES SPANISH', TestGenerateJsonBySchemaApiAccessReturnSuccessMessagesSpanish);

		it('#GENERATEJSONBYSCHEMA API ACCESS RETURN ERROR', TestGenerateJsonBySchemaApiAccessReturnSuccessMessagesSpanish);

		it('#GENERATEJSONBYSCHEMA API ACCESS RETURN DOWNLOAD SUCCESS', TestGenerateJsonBySchemaApiAccessReturnDownloadSuccess);
		it('#GENERATEJSONBYSCHEMA API ACCESS RETURN DOWNLOAD AND FILENAME SUCCESS', TestGenerateJsonBySchemaApiAccessReturnDownloadAndFilenameSuccess);
		it('#GENERATEJSONBYSCHEMA API ACCESS RETURN DOWNLOAD SUCCESS MESSAGES ENGLISH', TestGenerateJsonBySchemaApiAccessReturnDownloadSuccessMessagesEnglish);
		it('#GENERATEJSONBYSCHEMA API ACCESS RETURN DOWNLOAD SUCCESS MESSAGES PORTUGUESE', TestGenerateJsonBySchemaApiAccessReturnDownloadSuccessMessagesPortuguese);
		it('#GENERATEJSONBYSCHEMA API ACCESS RETURN DOWNLOAD SUCCESS MESSAGES SPANISH', TestGenerateJsonBySchemaApiAccessReturnDownloadSuccessMessagesSpanish);
	};

	var TestGenerateSchemaApiAccessReturnSuccess = function(Done) {
		var Request = Utils.GetRequestTestModel(GenerateSchemaApiAccessReturnSuccess);
		var Response = Utils.GetResponseTestModel();

		GeneratorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/generateSchema')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(true);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.message).to.not.be('');
		Expect(Response.body.result).to.be.an('object');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_SUCCESS);

		Done();
	};

	var TestGenerateSchemaApiAccessReturnSuccessMessagesEnglish = function(Done) {
		var Request = Utils.GetRequestTestModel(GenerateSchemaApiAccessReturnSuccess);
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('en');

		EnvConfig.SetLanguage('en');

		GeneratorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/generateSchema')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.SchemaGeneratedSuccess);

		Done();
	};

	var TestGenerateSchemaApiAccessReturnSuccessMessagesPortuguese = function(Done) {
		var Request = Utils.GetRequestTestModel(GenerateSchemaApiAccessReturnSuccess);
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('pt');

		EnvConfig.SetLanguage('pt');

		GeneratorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/generateSchema')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.SchemaGeneratedSuccess);

		Done();
	};

	var TestGenerateSchemaApiAccessReturnSuccessMessagesSpanish = function(Done) {
		var Request = Utils.GetRequestTestModel(GenerateSchemaApiAccessReturnSuccess);
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('es');

		EnvConfig.SetLanguage('es');

		GeneratorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/generateSchema')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.SchemaGeneratedSuccess);

		Done();
	};

	var TestGenerateSchemaApiAccessReturnError = function(Done) {
		var Request = Utils.GetRequestTestModel();
		var Response = Utils.GetResponseTestModel();

		GeneratorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/generateSchema')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(true);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.message).to.not.be('');
		Expect(Response.body.result).to.be.an('object');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_SUCCESS);

		Done();
	};

	var TestGenerateSchemaApiAccessReturnDownloadSuccess = function(Done) {
		var Request = Utils.GetRequestTestModel(GenerateSchemaApiAccessReturnSuccess, QueryDownloadSchema);
		var Response = Utils.GetResponseTestModel();

		GeneratorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/generateSchema')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(true);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.message).to.not.be('');
		Expect(Response.body.result).to.be.an('string');
		Expect(Response.body.filename).to.be(process.env.FILENAME_DEFAULT + '.json');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_SUCCESS);

		Done();
	};

	var TestGenerateSchemaApiAccessReturnDownloadAndFilenameSuccess = function(Done) {
		var Request = Utils.GetRequestTestModel(GenerateSchemaApiAccessReturnSuccess, QueryDownloadAndFilenameSchema);
		var Response = Utils.GetResponseTestModel();

		GeneratorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/generateSchema')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(true);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.message).to.not.be('');
		Expect(Response.body.result).to.be.an('string');
		Expect(Response.body.filename).to.be('SchemaFile.json');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_SUCCESS);

		Done();
	};

	var TestGenerateSchemaApiAccessReturnDownloadSuccessMessagesEnglish = function(Done) {
		var Request = Utils.GetRequestTestModel(GenerateSchemaApiAccessReturnSuccess, QueryDownloadSchema);
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('en');

		EnvConfig.SetLanguage('en');

		GeneratorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/generateSchema')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.SchemaGeneratedSuccess);
		Expect(Response.body.filename).to.be(process.env.FILENAME_DEFAULT + '.json');

		Done();
	};

	var TestGenerateSchemaApiAccessReturnDownloadSuccessMessagesPortuguese = function(Done) {
		var Request = Utils.GetRequestTestModel(GenerateSchemaApiAccessReturnSuccess, QueryDownloadSchema);
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('pt');

		EnvConfig.SetLanguage('pt');

		GeneratorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/generateSchema')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.SchemaGeneratedSuccess);
		Expect(Response.body.filename).to.be(process.env.FILENAME_DEFAULT + '.json');

		Done();
	};

	var TestGenerateSchemaApiAccessReturnDownloadSuccessMessagesSpanish = function(Done) {
		var Request = Utils.GetRequestTestModel(GenerateSchemaApiAccessReturnSuccess, QueryDownloadSchema);
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('es');

		EnvConfig.SetLanguage('es');

		GeneratorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/generateSchema')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.SchemaGeneratedSuccess);
		Expect(Response.body.filename).to.be(process.env.FILENAME_DEFAULT + '.json');

		Done();
	};

	var TestGenerateJsonBySchemaApiAccessReturnSuccess = function(Done) {
		var Request = Utils.GetRequestTestModel(GenerateSchemaApiAccessReturnSuccessSchema);
		var Response = Utils.GetResponseTestModel();

		GeneratorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/generateJsonBySchema')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(true);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.message).to.not.be('');
		Expect(Response.body.result).to.be.an('object');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_SUCCESS);

		Done();
	};

	var TestGenerateJsonBySchemaApiAccessReturnSuccessMessagesEnglish = function(Done) {
		var Request = Utils.GetRequestTestModel(GenerateSchemaApiAccessReturnSuccessSchema);
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('en');

		EnvConfig.SetLanguage('en');

		GeneratorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/generateJsonBySchema')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.JsonGeneratedSuccess);

		Done();
	};

	var TestGenerateJsonBySchemaApiAccessReturnSuccessMessagesPortuguese = function(Done) {
		var Request = Utils.GetRequestTestModel(GenerateSchemaApiAccessReturnSuccessSchema);
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('pt');

		EnvConfig.SetLanguage('pt');

		GeneratorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/generateJsonBySchema')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.JsonGeneratedSuccess);

		Done();
	};

	var TestGenerateJsonBySchemaApiAccessReturnSuccessMessagesSpanish = function(Done) {
		var Request = Utils.GetRequestTestModel(GenerateSchemaApiAccessReturnSuccessSchema);
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('es');

		EnvConfig.SetLanguage('es');

		GeneratorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/generateJsonBySchema')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.JsonGeneratedSuccess);

		Done();
	};

	var TestGenerateJsonBySchemaApiAccessReturnError = function(Done) {
		var Request = Utils.GetRequestTestModel();
		var Response = Utils.GetResponseTestModel();

		GeneratorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/generateJsonBySchema')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(true);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.message).to.not.be('');
		Expect(Response.body.result).to.be.an('object');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_SUCCESS);

		Done();
	};

	var TestGenerateJsonBySchemaApiAccessReturnDownloadSuccess = function(Done) {
		var Request = Utils.GetRequestTestModel(GenerateSchemaApiAccessReturnSuccessSchema, QueryDownloadSchema);
		var Response = Utils.GetResponseTestModel();

		GeneratorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/generateJsonBySchema')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(true);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.message).to.not.be('');
		Expect(Response.body.result).to.be.an('string');
		Expect(Response.body.filename).to.be(process.env.FILENAME_DEFAULT + '.json');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_SUCCESS);

		Done();
	};

	var TestGenerateJsonBySchemaApiAccessReturnDownloadAndFilenameSuccess = function(Done) {
		var Request = Utils.GetRequestTestModel(GenerateSchemaApiAccessReturnSuccessSchema, QueryDownloadAndFilenameSchema);
		var Response = Utils.GetResponseTestModel();

		GeneratorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/generateJsonBySchema')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.success).to.be(true);
		Expect(Response.body.date).to.be.an('object');
		Expect(Response.body.message).to.not.be('');
		Expect(Response.body.result).to.be.an('string');
		Expect(Response.body.filename).to.be('SchemaFile.json');
		Expect(Response.body.status).to.be(HttpStatus.HTTP_STATUS_SUCCESS);

		Done();
	};

	var TestGenerateJsonBySchemaApiAccessReturnDownloadSuccessMessagesEnglish = function(Done) {
		var Request = Utils.GetRequestTestModel(GenerateSchemaApiAccessReturnSuccessSchema, QueryDownloadSchema);
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('en');

		EnvConfig.SetLanguage('en');

		GeneratorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/generateJsonBySchema')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.JsonGeneratedSuccess);
		Expect(Response.body.filename).to.be(process.env.FILENAME_DEFAULT + '.json');

		Done();
	};

	var TestGenerateJsonBySchemaApiAccessReturnDownloadSuccessMessagesPortuguese = function(Done) {
		var Request = Utils.GetRequestTestModel(GenerateSchemaApiAccessReturnSuccessSchema, QueryDownloadSchema);
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('pt');

		EnvConfig.SetLanguage('pt');

		GeneratorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/generateJsonBySchema')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.JsonGeneratedSuccess);
		Expect(Response.body.filename).to.be(process.env.FILENAME_DEFAULT + '.json');

		Done();
	};

	var TestGenerateJsonBySchemaApiAccessReturnDownloadSuccessMessagesSpanish = function(Done) {
		var Request = Utils.GetRequestTestModel(GenerateSchemaApiAccessReturnSuccessSchema, QueryDownloadSchema);
		var Response = Utils.GetResponseTestModel();
		var ResourceFile = Utils.GetResourceMessage('es');

		EnvConfig.SetLanguage('es');

		GeneratorController.GetRoutes().forEach(function(route) {
			if (route.uri === '/generateJsonBySchema')
				route.callback(Request, Response);
		});

		Expect(Response.body).to.not.be(null);
		Expect(Response.body.message).to.be(ResourceFile.JsonGeneratedSuccess);
		Expect(Response.body.filename).to.be(process.env.FILENAME_DEFAULT + '.json');

		Done();
	};

	self.Init = _init;
})(this);

this.Init();