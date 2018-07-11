'use strict';

var Utils = require('./Utils');

var fs = require('fs');

(function(self) {

	var _generateSchemaByObject = function(obj) {
		var schema = {};
		if (typeof obj !== 'object')
			throw new Error(__('ParameterIsNotAObject'));

		for (var key in obj) {
			if ((typeof obj[key]) === 'object')
				schema[key] = getFormatSchemaObject(obj[key]);
			else if ((typeof obj[key]) !== 'function')
				schema[key] = getFormatSchemaField(obj[key]);
		}

		return schema;
	};

	var _generateObjectBySchema = function(schema, isArray) {
		var obj = {};
		if (isArray)
			obj = [];

		if (typeof schema !== 'object')
			throw new Error(__('ParameterIsNotValid'));

		for (var key in schema) {
			if (schema[key].type === 'object')
				obj[key] = self.GenerateObjectBySchema(schema[key].values);
			else if (schema[key].type === 'array')
				obj[key] = self.GenerateObjectBySchema(schema[key].values, true);
			else if (isArray)
				obj.push(getDataSchemaInObject(schema[key]));
			else
				obj[key] = getDataSchemaInObject(schema[key]);
		}

		return obj;
	};

	var _validatorObjectBySchemaPath = function(obj, schemaPath) {
		var schema = fs.readFileSync(schemaPath);
		return self.ValidatorObjectBySchema(obj, schema);
	};

	var _validatorObjectBySchema = function(obj, schema) {
		for (var key in obj) {
			if (schema[key] === undefined)
				throw Utils.GetThrowException(__('ValidateKeyNotFoundInSchema'), 'ValidateKeyNotFoundInSchema', getDetailsErrorField(key, obj[key], schema[key]));
			if ((typeof schema[key]) !== 'object')
				throw Utils.GetThrowException(__('ValidateSchemaIsFormatInvalid'), 'ValidateSchemaIsFormatInvalid', getDetailsErrorField(key, obj[key], schema[key]));
			if (!Array.isArray(obj[key]) && (typeof obj[key]) !== schema[key].type)
				throw Utils.GetThrowException(__('ValidateTypeIsInvalid'), 'ValidateTypeIsInvalid', getDetailsErrorField(key, (typeof obj[key]), schema[key].type));
			if (obj[key] === null && schema[key].required)
				throw Utils.GetThrowException(__('ValidateAttributeIsNotNull'), 'ValidateAttributeIsNotNull', getDetailsErrorField(key, obj[key], schema[key].required));
			if (schema[key].values)
				self.ValidatorObjectBySchema(obj[key], schema[key].values);
		}
		return true;
	};

	var getFormatSchemaObject = function(obj) {
		var formatSchema = {};
		formatSchema.type = Array.isArray(obj) ? 'array' : (typeof obj);
		formatSchema.required = false;
		formatSchema.values = self.GenerateSchemaByObject(obj);

		return formatSchema;
	};

	var getFormatSchemaField = function(field) {
		var formatSchema = {};
		formatSchema.type = (typeof field);
		formatSchema.required = false;

		return formatSchema;
	};

	var getDataSchemaInObject = function(schema) {
		if (schema.type === 'string')
			return generateStringValue();
		else if (schema.type === 'number')
			return generateNumberValue();
		else if (schema.type === 'boolean')
			return generateBooleanValue();
		else if (schema.type === 'date')
			return generateDateValue();
	};

	var generateStringValue = function() {
		return Math.random().toString(36).substring(2);
	};

	var generateNumberValue = function() {
		var number = (Math.random() * 535100).toFixed(2);
		return Number(number);
	};

	var generateBooleanValue = function() {
		var number1 = Math.floor(Math.random() * 1000);
		var number2 = Math.floor(Math.random() * 1000);
		return number1 > number2;
	};

	var generateDateValue = function() {
		var days = Math.floor(Math.random() * 1000) * (-1);
		var date = new Date();
		date.setDate(days);

		return date;
	};

	var getDetailsErrorField = function(key, objValue, schemaValue) {
		var details = 'Obj: [' + key + '] = ' + objValue + ', Schema: [' + key + '] = ' + schemaValue;
		return details;
	};

	self.GenerateSchemaByObject = _generateSchemaByObject;
	self.GenerateObjectBySchema = _generateObjectBySchema;
	self.ValidatorObjectBySchemaPath = _validatorObjectBySchemaPath;
	self.ValidatorObjectBySchema = _validatorObjectBySchema;
})(this);