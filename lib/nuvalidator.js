'use strict';

const Validator = require('./validator'),
	  Rules = require('./rules'),
      messages = require('./messages'),
      PostRules = require('./post');

class NuValidator extends Validator {


	/**
     * @param ctx
     * @param inputs
     * @param rules
     * @param messages
     */
    constructor(inputs, rules, custom_messages) {

      super();

        // errors collections
        this.errors = {};

        // inputs collection
        this.inputs = inputs;

        // rules library
        this.rules = new Rules(this);
        
        // post rules library
        this.postRules = new PostRules(this);
        
        // validation messages
        this.messages = Object.assign(messages, custom_messages);

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
        
    }

}

module.exports = NuValidator;
module.exports.Rules = Rules;