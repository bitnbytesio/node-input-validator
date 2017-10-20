'use strict';

/**
 * node-input-validator
 * https://github.com/artisangang/node-input-validator
 */

const Validator = require('./lib/validator'),
      messages = require('./lib/messages');

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
 * extend/upgrade messages for rules
 * @param custom_messages
 */
module.exports.messages = (custom_messages) => {

    let keys = Object.keys(custom_messages);
    for (let i in keys) {
        messages[ keys[i] ] = custom_messages[ keys[i] ];
    }
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