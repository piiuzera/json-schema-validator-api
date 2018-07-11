'use strict';

var JWT = require('jsonwebtoken');

(function(self) {

	var JwtSecret = '';
	var JwtExpires = '';

	var _init = function() {
		JwtSecret = process.env.JWT_SECRET;
		JwtExpires = process.env.JWT_EXPIRES;
	};

	var _signIn = function(User) {
		return JWT.sign(User, JwtSecret, GetJwtOptions());
	};

	var _verify = function(Token) {
		return JWT.verify(Token, JwtSecret);
	};

	var GetJwtOptions = function() {
		var JwtOptions = {};
		JwtOptions.expiresIn = JwtExpires;

		return JwtOptions;
	};

	self.Init = _init;
	self.SignIn = _signIn;
	self.Verify = _verify;
})(this);

this.Init();