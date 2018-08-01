'use strict';

/**
 * node-input-validator
 * https://github.com/artisangang/node-input-validator
 */

const Validator = require('./lib/validator'),
    messages = require('./lib/messages/index');

// main validator class
module.exports = Validator;

module.exports.setLang = (lang) => {
    messages.defaultLang = lang;
};

// rules 
module.exports.Rules = Validator.Rules;

/**
 * add custom validation rules
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
module.exports.messages = (custom_messages, lang = 'en') => {

    let keys = Object.keys(custom_messages);
    for (let i in keys) {

        if (typeof messages[lang] == 'undefined') {
            messages[lang] = {};
        }

        messages[lang][keys[i]] = custom_messages[keys[i]];
    }
};

/* istanbul ignore next */
module.exports.koa = () => {

    return async (ctx, next) => {

        ctx.validate = async (inputs, rules, messages) => {

            let v = new Validator(
                inputs,
                rules,
                messages || {}
            );

            return v;
        };

        await next();
    };

};