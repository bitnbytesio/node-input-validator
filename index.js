'use strict';

const Validator = require('./lib/validator');

module.exports = Validator;

module.exports.Rules = Validator.Rules;

/**
 * as custom validation rules
 * @param rule
 * @param func
 */
module.exports.extend = (rule, func) => {

    let name = 'validate' + rule.charAt(0).toUpperCase() + rule.slice(1);
    Validator.Rules.prototype[name] = func;

};

/**
 * koa muddleware
 * @returns {function(*=, *)}
 */
module.exports.koa = () => {

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