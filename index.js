'use strict';

/**
 * node-input-validator
 * https://github.com/artisangang/node-input-validator
 */

const Validator = require('./lib/validator'),
      NuValidator = require('./lib/nuvalidator'),
      messages = require('./lib/messages');

// old deperacted constructor
module.exports = Validator;

// new validator
module.exports.NuValidator = NuValidator;

// rules 
module.exports.Rules = NuValidator.Rules;

/**
 * add custom validation rules
 * @param rule
 * @param func
 */
module.exports.extend = (rule, func) => {

    let name = 'validate' + rule.charAt(0).toUpperCase() + rule.slice(1);
    NuValidator.Rules.prototype[name] = func;

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
 * old depercated koa muddleware, will be removed in future
 * @returns {function(*=, *)}
 */
module.exports.koa = () => {

    return async (ctx, next) => {

        ctx.validate = async (inputs, rules, messages) => {

            let v = new NuValidator(
                inputs,
                rules,
                messages || {}
            );

            return v;
        };

        await next();
    };

};


// new latest validator, in future this will be renamed to koa from nukoa
module.exports.nukoa = () => {

    return async (ctx, next) => {

        ctx.validate = async (inputs, rules, messages) => {

            let v = new NuValidator(
                inputs,
                rules,
                messages || {}
            );

            return await v.check();
        };

        await next();
    };

};