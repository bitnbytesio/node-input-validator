'use strict';

const Required = require('./rules/required');
const Rules = require('./rules');

class Validator {

    constructor(ctx, inputs, rules, messages) {
        this.ctx = ctx;

        this.errors = {};

        this.inputs = inputs;

        this.rules = new Rules(this);

        this.messages = messages;

        this.validations = {};

        this.requiredRules = new Required(this);

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
    async validate(){
        let fieldValidations = [];


        for(var i in this.validations){
            fieldValidations.push(this.evaluateField(this.validations[i]));
        }

        if (fieldValidations.length)
            await fieldValidations;

        
    

        return (this.errors && Object.keys(this.errors) && Object.keys(this.errors).length) ? false : true;
    }

    async evaluateField(field){

      
        let proceed = true;
        
        if(!proceed) {
            return;
        }

        if(field.rules.length){
            for(var r = 0; r < field.rules.length; ++r){
                if(typeof this.requiredRules[field.rules[r].rule] === 'function'){
                    var ruleArgs = [field.field, field.value];

                    if(field.rules[r].args)
                        ruleArgs.push(field.rules[r].args);

                    if(field.rules[r].message)
                        ruleArgs.push(field.rules[r].message);

                    if(await this.requiredRules[field.rules[r].rule].apply(this.requiredRules, ruleArgs)){
                        field.required = true;
                    }else{
                        proceed = false;
                        break;
                    }
                }else if(typeof this.rules[field.rules[r].rule] === 'function'){
                    if((!field.required && typeof field.value !== 'undefined') || field.required){
                        var ruleArgs = [field.field, field.value];

                        if(field.rules[r].args)
                            ruleArgs.push(field.rules[r].args);

                        if(field.rules[r].message)
                            ruleArgs.push(field.rules[r].message);

                        if(!(await this.rules[field.rules[r].rule].apply(this.rules, ruleArgs))){
                            proceed = false;
                            break;
                        }
                    }else{
                        proceed = false;
                        break;
                    }
                }else{
                    this.addError(field.field, field.rules[r].rule, 'Invalid Validation Rule: '+ field.rules[r].rule +' does not exist');
                    proceed = false;
                    break;
                }
            }
        }
    
        return;
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
      

        if(messages && typeof messages[field+'.'+rule] !== 'undefined'){
            this.rule.message = messages[field+'.'+rule];
        }else if(messages && typeof messages[rule] !== 'undefined'){
            this.rule.message = messages[rule];
        }

        if(this.rule.message){
            if(this.rule.message.indexOf(':attribute') !== -1){
                this.rule.message = this.rule.message.replace(':attribute', field);
            }

            if(this.rule.message.indexOf(':value') !== -1){
                if(typeof this.validations[field].value === 'object'){
                    this.rule.message = this.rule.message.replace(':value', JSON.stringify(this.validations[field].value));
                }else if(typeof this.validations[field].value === 'undefined'){
                    this.rule.message = this.rule.message.replace(':value', 'undefined');
                }else{
                    this.rule.message = this.rule.message.replace(':value', this.validations[field].value.toString());
                }
            }
        }

        if(typeof this.requiredRules[this.rule.rule] === 'function'){
            this.validations[field].rules.unshift(this.rule);
        }else{
            this.validations[field].rules.push(this.rule);
        }

        this.rule = {};
    }

}

module.exports = Validator;