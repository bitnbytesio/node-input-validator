'use strict';

const Validator = require('./lib/validator');

module.exports = function() {
	return async (ctx, next) => {
  

		ctx.validate = async (inputs, rules, messages) => {		
		

			let v = new Validator(
				ctx,
				inputs,
				rules,
				messages || {}
			);
			

			return v;
        };      

		await next();
	};
};