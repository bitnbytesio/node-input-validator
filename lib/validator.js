//@ts-check

'use strict';

const Rules = require('./rules'),
    messagesCollection = require('./messages/index'),
    PostRules = require('./post');

class Validator {

    /**
     * 
     * @param {*} inputs 
     * @param {*} rules 
     * @param {*} custom_messages 
     */
    constructor(inputs, rules, custom_messages = {}) {


        // errors collections
        this.errors = {};

        // inputs collection
        this.inputs = inputs;

        // rules library
        this.rules = new Rules(this);

        // post rules library
        this.postRules = new PostRules(this);

        // validation messages for field

        this.messages = Object.assign({}, custom_messages);

        // validations collection
        this.validations = {};

        // implicit rules: these rules apply first
        this.implicitRules = [
            'required', 'requiredIf', 'requiredNotIf', 'requiredWith', 'requiredWithout', 'accepted'
        ];

        // post validations collection
        this.postValidations = [];

        // parse rules
        this.parseRules(rules);

        this.lang = messagesCollection.defaultLang;

    }

    static filter(inputs, filters) {

    }

    setLang(lang) {
        this.lang = lang;
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

        return value;
    }

    /**
     * 
     * @param {*} rules 
     */
    parseRules(rules) {

        if (!rules) {
            return;
        }

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

            //console.log('rules->', r);

            let field = r, fieldWithIndex = [], multipleFields = -1;

            if (field === '*') {
                return this.addPostRules(rules[r].split('|'));
            }

            //console.log('in loop', field);

            if (!this.validations[r]) {

                multipleFields = r.indexOf('*');
                //let value = this.parseKey(r, this.inputs);



                // add direct rules
                if (multipleFields < 0) {
                    this.validations[r] = {
                        field: r,
                        value: this.parseKey(r, this.inputs),
                        required: false,
                        rules: []
                    };
                }

                //console.log( multipleFields , this.inputs);

                // sdd multiple field rules
                if (multipleFields > 0) {


                    let fieldArr = field.split('.');



                    for (let i in this.inputs[fieldArr[0]]) {

                        let item = this.inputs[fieldArr[0]][i];

                        //let keys = Object.keys(item);

                        ///console.log('Iterm', item, keys);

                        let indexedField = field.replace('*', i);

                        //console.log(indexedField, item[ fieldArr[2] ]);                                             

                        fieldWithIndex.push(indexedField);


                        this.validations[indexedField] = {
                            field: indexedField,
                            value: item[fieldArr[2]] || '',
                            required: false,
                            rules: []
                        };




                    }




                }
            }

            rsplit = rules[r].split('|');



            let rs;

            //console.log('rule in rs', rsplit);

            for (rs in rsplit) {
                argsplit = rsplit[rs].split(':');
                if (typeof argsplit[1] !== 'undefined') {
                    args = argsplit[1].split(',');
                    this.rule = { rule: argsplit[0], args: (args.length > 1) ? args : args[0] };
                } else {
                    this.rule = { rule: argsplit[0] };
                }


                if (fieldWithIndex.length) {

                    // console.log('inside loop', fieldWithIndex);

                    let ruled = this.rule;

                    for (let i in fieldWithIndex) {
                        this.rule = ruled;
                        //console.log('inside loop ihndexed is', i, fieldWithIndex[i], argsplit[0]);
                        this.populateRule(fieldWithIndex[i], argsplit[0]);
                    }


                }

                if (field.indexOf('*') < 0) {
                    this.populateRule(field, argsplit[0]);
                }

                //this.populateRule(field, argsplit[0]);
            }

            //console.log('in populateRule', field);

        }

        //console.log('all validations', this.validations);

    }

    /**
     * re-arrange rules
     * @param field
     * @param rule
     */
    populateRule(field, rule) {

        //console.log('filed and rule in populate rules', field, rule);

        if (this.implicitRules.indexOf(this.rule.rule) >= 0) {
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

        let message = this.messages[this.lang + '.' + field + '.' + rule] ||
            this.messages[this.lang + '.' + field] ||
            this.messages[this.lang + '.' + rule] ||
            this.messages[field + '.' + rule] ||
            this.messages[field] ||
            this.messages[rule] || false;


        if (!message) {
            message = messagesCollection[this.lang][field + '.' + rule] || messagesCollection[this.lang][field] || messagesCollection[this.lang][rule] || 'The :attribute value is malformed.';
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

        return message;

    }

}

module.exports = Validator;
module.exports.Rules = Rules;