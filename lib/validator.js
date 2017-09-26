'use strict';

const Required = require('./rules/required');
const Rules = require('./rules');

const MessageBag = require('./message_bag');

class Validator {

    constructor(ctx, inputs, rules, messages) {
        this.ctx = ctx;

        this.errors = {};

        this.inputs = inputs;

        this.rules = new Rules(this);

        this.messages = messages;

        this.messageBag = new MessageBag;

        this.validations = {};

        this.implicitRules = [
        'Required', 'RequiredWith', 'RequiredWithAll', 'RequiredWithout', 'RequiredWithoutAll', 'RequiredIf', 'Accepted',
        ];

        this.parseRules(rules,messages);
    }

    /**
      * add errors
      */
    addError(key, rule, message){       
        
        this.errors[key] = {
            message: message,
            rule:rule
        }; 
        
    }   

    /**
      * validate inputs
      */
    async check(){
        let fieldValidations = [];


        for(var i in this.validations){
            fieldValidations.push(await this.evaluateField(this.validations[i]));
        }

        if (fieldValidations.length)
            await fieldValidations;
        

        return (this.errors && Object.keys(this.errors) && Object.keys(this.errors).length) ? false : true;
    }

    async evaluateField(field){

    
        if (field.rules.length) {         

            await this.rules.validate(field);          
            
        }
    
       
    }

    parseKey(key, data){
        
        let value;
        let self = this;

        let keySplit = key.split('.').filter(function(e){ return e !== ''; });

        keySplit.map(function(item){
            if(typeof value === 'undefined'){
                value = data && data[item];
            }else{
                value = value[item];
            }
        });

        return value;
    }


    parseRules(rules, messages) {

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

    
        if(Object.keys(rules).length){
            // here r is field
            for (r in rules){

                if(!this.validations[r]){
                    this.validations[r] = {
                        field: r,
                        value: this.parseKey(r, this.inputs),
                        required: false,
                        rules: []
                    };
                }
               
                rsplit = rules[r].split('|');

                let rs;

                for (rs in rsplit){
                    argsplit = rsplit[rs].split(':');
                    if(typeof argsplit[1] !== 'undefined'){
                        args = argsplit[1].split(',');
                        this.rule = { rule: argsplit[0], args: (args.length > 1) ? args: args[0] };
                    }else{
                        this.rule = { rule: argsplit[0] };
                    }

                    this.populateRule(r, argsplit[0], messages);
                }
                
            }
        }  

        
    }

     populateRule(field, rule, messages) {      
     
        let message;

        if (messages) {
            message = messages[field+'.'+rule] || messages[field] || messages[rule];
        }

        this.rule.message = message;

        if (this.implicitRules.indexOf(this.rule.rule) >= 0) {
            this.validations[field].rules.unshift(this.rule);
        }else{
            this.validations[field].rules.push(this.rule);
        }
       

        this.rule = {};
    }

    parseMessage(rule, field, value, customMessage, args) {

        let message = customMessage || this.messageBag.messages[rule] || 'The :attribute value is malformed.'

        if(message.indexOf(':attribute') !== -1){
            message = message.replace(':attribute', field);
        }

        if (Array.isArray(args)) {
            for (let i = 0; i<10; i++) {
                if(message.indexOf(':arg' + i) >= 0) {
                     message = message.replace(':arg' + i, args[i]);
                } else {
                    break;
                }
            }
        } else {
            message = message.replace(':arg0', args).replace(':arg', args);
        }

        if(message.indexOf(':value') !== -1){
            if(typeof value === 'object'){
                message = message.replace(':value', JSON.stringify(this.validations[field].value));
            }else if(typeof this.validations[field].value === 'undefined'){
                message = message.replace(':value', 'undefined');
            }else{
                message = message.replace(':value', this.validations[field].value.toString());
            }
        }

        return message;

    }

}

module.exports = Validator;
module.exports.Rules = Rules;