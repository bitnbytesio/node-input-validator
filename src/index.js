const rules = require('./rules');
const postRules = require('./postRules');
const messages = require('./messages');
const { applyRules, implicitRules, applyPostRules } = require('./validator');
const empty = require('./lib/empty');
const filters = require('./filters');


class Validator {

    /**
     * create validator session
     * @param {*} inputs 
     * @param {*} rules 
     * @param {*} customMessages 
     */
    constructor(inputs, rules, customMessages = {}) {

        // errors collections
        this.errors = {};

        // validations collection
        this.validations = {};

        // filters collection
        this.filters = {};

        // default language
        this.lang = messages.defaultLang;

        // post validations collection
        this.postValidations = [];

        // inputs collection
        this.inputs = inputs;

        // filter inputs collection
        this.filterInputs = {};

        // validation messages for field
        this.customMessages = customMessages;

        this.hasCustomMessages = false;

        if (Object.keys(this.customMessages).length) {
            this.hasCustomMessages = true;
        }

        // parse rules
        this.parseRules(rules);

    }

    /**
     * create validator from array
     * @param {*} inputs 
     * @param {*} rules 
     * @param {*} messages 
     */
    static make(inputs, rules, messages = {}) {

        let v = new Validator(inputs, {}, messages);

        v.makeValidationsFromArray(rules);

        return v;
    }

    /**
     * create validator
     * @param {*} rules 
     * @param {*} messages 
     */
    static create(rules, messages = {}) {

        return new Validator({}, rules, messages);
    }

    /**
     * apply rules on custom inputs
     * @param {*} inputs 
     */
    async apply(inputs) {

        let v = new Validator(inputs, {});

        v.validations = this.validations;
        v.postValidations = this.postValidations;

        return v;

    }

    /**
     * check for validation fails
     */
    async fails() {
        return !(await this.check());
    }

    /**
     * check if validation passes
     */
    async passes() {
        return await this.check();
    }

    /**
     * set before/after filters
     * @param {*} filters 
     * @param {*} filterInputs 
     */
    static filter(filters, filterInputs) {
        this.filters = filters;
        this.filterInputs = filterInputs;
    }

    /**
     * set default language for session only
     * @param {*} lang 
     */
    setLang(lang) {
        this.lang = lang;
    }

    /**
     * check for empty values
     * @param {*} value 
     */
    isEmpty(value) {

        return empty(value);
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
     * @param rule    
    */
    addPostRule(rule) {

        if (typeof rule === 'function') {
            this.postValidations.push({
                rule: 'function',
                params: rule,
                values: this.inputs
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

        //console.log(this.validations);

        for (let i in this.validations) {
            //console.log('check method index', i, this.validations[i]);
            validations.push(await this.evaluteInputs(this.validations[i]));
        }

        for (let j in this.postValidations) {
            validations.push(await this.evaluteInputsPostValidation(this.postValidations[j]));
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
    async evaluteInputs(field) {

        if (field.rules.length) {

            await applyRules(field, this);
        }

    }
    /**
     * validate input as a whole against post rule
     * @param rule
     * @returns {Promise.<void>}
     */
    async evaluteInputsPostValidation(rule) {

        await applyPostRules(rule, this);

    }

    /**
     * split by dot
     * @param key
     * @param data
     * @returns {*}
     */
    parseKey(key, data) {

        let value;
        //let self = this;

        let keySplit = key.split('.').filter(function (e) {
            return e !== '';
        });

        //console.log('Key Split', keySplit);

        keySplit.map(function (item) {

            if (typeof value === 'undefined') {
                value = data && data[item];
            } else {
                value = value[item];
            }
        });

        //console.log('after key split', value);

        switch (typeof value) {

            case 'string':
                value = value.trim();
                break;

            case 'boolean':
                value = String(value);
                break;

            case 'number':
                value = String(value);
                break;

                

        }

        return value;
    }

    inputVal(field, multiple = false) {

        let val = this.inputs[field] || '';

        if (multiple == true) {
            val = this.parseKey(field, this.inputs);
        }

        return this.parseKey(field, this.inputs);
    }

    /**
     * 
     * @param {*} rules 
     */
    parseRules(rules) {


        if (!rules || !Object.keys(rules).length) {
            return;
        }


        let rsplit,
            argsplit,
            args,
            field;

        // here r is field name
        for (field in rules) {

            //console.log('rules->', r);

            let multipleFields = -1;

            if (field === '*') {
                return this.addPostRules(rules[field].split('|'));
            }

            //console.log('in loop', field);

            if (!this.validations[field]) {

                multipleFields = field.indexOf('*');

                this.validations[field] = {
                    field: field,
                    multiple: (multipleFields > 0),
                    path: field.split('.'),
                    required: false,
                    rules: []
                };


            }

            rsplit = rules[field].split('|');

            let rs;

            for (rs in rsplit) {
                argsplit = rsplit[rs].split(':');
                if (typeof argsplit[1] !== 'undefined') {
                    args = argsplit[1].split(',');
                    this.rule = { rule: argsplit[0], args: (args.length > 1) ? args : args[0] };
                } else {
                    this.rule = { rule: argsplit[0] };
                }

                this.populateRule(field);

            }

        }

        //console.log(JSON.stringify(this.validations, null, 2));

    }

    makeValidationsFromArray(rules) {


        if (!rules || !Object.keys(rules).length) {
            return;
        }

        let field, fieldRule;

        // here r is field name
        for (field in rules) {


            let fieldWithIndex = [], multipleFields = 0;

            if (field === '*') {
                return this.addPostRules(rules[field]);
            }

            //console.log('in loop', field);

            if (!this.validations[field]) {

                multipleFields = field.indexOf('*');

                this.validations[field] = {
                    field: field,
                    multiple: (multipleFields > 0),
                    path: field.split('.'),
                    required: false,
                    rules: []
                };
            }


            for (fieldRule of rules[field]) {

                let args = [];

                if (fieldRule instanceof Array) {
                    args = fieldRule;
                    fieldRule = fieldRule.splice(0, 1).toString();
                }

                this.rule = { rule: fieldRule, args: (args.length == 1) ? args[0] : args };

                this.populateRule(field);

            }

        }


    }

    /**
     * re-arrange rules
     * @param field
     */
    populateRule(field) {

        //console.log('filed and rule in populate rules', field, rule);

        if (implicitRules.indexOf(this.rule.rule) >= 0) {
            this.validations[field].rules.unshift(this.rule);
            this.validations[field].required = true;
        } else {
            this.validations[field].rules.push(this.rule);
        }

        this.rule = {};
    }

    /**
     * 
     * @param {*} rule 
     * @param {*} field 
     * @param {*} value 
     * @param {*} args 
     */
    parseMessage(rule, field, value, args) {

        /**
         * 1. check for attribute.rule
         * 2. check for rule
         * 3. check for attribute
         * 4. fallback to default message 
         */

        let message;

        let defaultMessage = messages[this.lang]._default || 'The :attribute value is malformed.';

        if (this.hasCustomMessages) {

            message = this.customMessages[field + '.' + rule] ||
                this.customMessages[rule] ||
                this.customMessages[field];
        }


        if (!message) {
            message = messages[this.lang].custom[field + '.' + rule] ||
                messages[this.lang][rule] ||
                messages[this.lang].custom[field] || defaultMessage;
        }

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

        return message.replace('_', ' ');

    }

}

module.exports = Validator;
module.exports.rules = rules;
module.exports.postRules = postRules;