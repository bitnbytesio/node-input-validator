'use strict';

const Rules = require('./rules'),
    messages = require('./messages'),
    PostRules = require('./post');

class Validator {

    /**
     * @param ctx
     * @param inputs
     * @param rules
     * @param messages
     */
    constructor(ctx, inputs, rules, custom_messages) {

        this.ctx = ctx;

        this.errors = {};

        this.inputs = inputs;

        this.rules = new Rules(this);
        
        this.postRules = new PostRules(this);
        
        this.messages = Object.assign(messages, custom_messages);

        this.validations = {};

        this.implicitRules = [
            'required', 'requiredIf', 'requiredNotIf', 'requiredWith', 'requiredWithout', 'accepted'
        ];
        
        this.postValidations = [];
        
        this.parseRules(rules);
        
    }

    /**
     * add error
     * @param key
     * @param rule
     * @param message
     */
    addError(key, rule, message) {

        this.errors[key] = {
            message: message,
            rule: rule
        };

    }

    /**
     * add post rule
     *
     * post rule is applied to whole input and is used to check constraints
     * across multiple fields
     * 
     * @param validator    
    */
    addPostRule(rule) {

        if(typeof rule === 'function') {
            this.postValidations.push({
                rule: 'function',
                params: rule,
                values : this.inputs
            });
            return;
        }
        
        rule = rule.split(':', 2);
        let ruleName = rule[0];
        let ruleFields = rule[1].split(','); //there always be a list of fields
        let values = ruleFields.reduce((acc, field) => (acc[field] = this.parseKey(field, this.inputs), acc), {});
        
        this.postValidations.push({
            rule: ruleName,
            params: ruleFields,
            values: values
        });
    }

    /**
     * add set of post rules 
     *
     * @param rules {string[]}
     */
    addPostRules(rules) {

        rules.map((rule) => this.addPostRule(rule));

    }
    
    /**
     * validate inputs
     * @returns {Promise.<boolean>}
     */
    async check() {
        
        let validations = [];
    
        for (let i in this.validations) {
            validations.push(await this.evaluateField(this.validations[i]));
        }

        for (let j in this.postValidations) {
            validations.push(await this.evaluateInput(this.postValidations[j]));
        }

        if (validations.length) {
            await validations;
        }
                    
        return (this.errors && Object.keys(this.errors) && Object.keys(this.errors).length) ? false : true;
    }

    /**
     * validate input against rule
     * @param field
     * @returns {Promise.<void>}
     */
    async evaluateField(field) {

        if (field.rules.length) {

            await this.rules.validate(field);
        }

    }
    /**
     * validate input as a whole against post rule
     * @param rule
     * @returns {Promise.<void>}
     */
    async evaluateInput(rule) {
    
        await this.postRules.validate(rule);
        
    }

    /**
     * split by dot
     * @param key
     * @param data
     * @returns {*}
     */
    parseKey(key, data) {

        let value;
        let self = this;

        let keySplit = key.split('.').filter(function (e) {
            return e !== '';
        });

        keySplit.map(function (item) {
            if (typeof value === 'undefined') {
                value = data && data[item];
            } else {
                value = value[item];
            }
        });

        return value;
    }

    /**
     * parse rules
     * @param rules
     * @param messages
     */
    parseRules(rules) {

        let rsplit
            , argsplit
            , args
            , fieldfilters
            , fieldValue
            , fbSplit
            , faSplit
            , fbargsSplit
            , faargsSplit,
            r;


        if (!Object.keys(rules).length) {
            return;
        }
        
        // here r is field
        for (r in rules) {

            if (r === '*') {
                return this.addPostRules(rules[r].split('|'));
            }
            
            if (!this.validations[r]) {
                this.validations[r] = {
                    field: r,
                    value: this.parseKey(r, this.inputs),
                    required: false,
                    rules: []
                };
            }

            rsplit = rules[r].split('|');

            let rs;

            for (rs in rsplit) {
                argsplit = rsplit[rs].split(':');
                if (typeof argsplit[1] !== 'undefined') {
                    args = argsplit[1].split(',');
                    this.rule = {rule: argsplit[0], args: (args.length > 1) ? args : args[0]};
                } else {
                    this.rule = {rule: argsplit[0]};
                }

                this.populateRule(r, argsplit[0]);
            }

        }

    }

    /**
     * re-arrange rules
     * @param field
     * @param rule
     */
    populateRule(field, rule) {

        if (this.implicitRules.indexOf(this.rule.rule) >= 0) {
            this.validations[field].rules.unshift(this.rule);
            this.validations[field].required = true;
        } else {
            this.validations[field].rules.push(this.rule);
        }

        this.rule = {};
    }

    /**
     * parse validation message
     * @param rule
     * @param field
     * @param value
     * @param customMessage
     * @param args
     * @returns {*|string}
     */
    parseMessage(rule, field, value, args) {

        let message = this.messages[field + '.' + rule] || this.messages[field] || this.messages[rule] || 'The :attribute value is malformed.';

        if (message.indexOf(':attribute') !== -1) {
            message = message.replace(':attribute', field);
        }

        if (Array.isArray(args)) {
            for (let i = 0; i < 10; i++) {
                if (message.indexOf(':arg' + i) >= 0) {
                    message = message.replace(':arg' + i, args[i]);
                } else {
                    break;
                }
            }
        } else {
            message = message.replace(':arg0', args).replace(':arg', args);
        }

        if (message.indexOf(':value') !== -1) {
            if (typeof value === 'object') {
                message = message.replace(':value', JSON.stringify(this.validations[field].value));
            } else if (typeof this.validations[field].value === 'undefined') {
                message = message.replace(':value', 'undefined');
            } else {
                message = message.replace(':value', this.validations[field].value.toString());
            }
        }

        return message;

    }

}

module.exports = Validator;
module.exports.Rules = Rules;