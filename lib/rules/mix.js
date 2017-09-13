const v = require('validator');

const DateRules = require('./date');

class Mix extends DateRules {

	constructor(Validator) {
        super(Validator);
        this.validator = Validator;
    }

    async accepted(field, value, message){
        if(value === true || value === 'yes' || value === 'on' || value === 1 || value === "1"){
            return true;
        }else{
            this.validator.addError(field, 'accepted', message || 'The value of the field needs to be between 1, yes, or true');
            return false;
        }
    }

    async alpha(field, value, message){
        if(!v.isAlpha(value)){
            this.validator.addError(field, 'alpha', message || 'The value of the field needs to be alphabetical');
            return false;
        }

        return true;
    }

    async alphaDash(field, value, message){
        if(!(/^[A-Z0-9_-]+$/i.test(value))){
            this.validator.addError(field, 'alphaDash', message || 'The field value can only contain aplhabets, _ and -');
            return false;
        }

        return true;
    }

    async alphaNumeric(field, value, message){
        if(!v.isAlphanumeric(value)){
            this.validator.addError(field, 'alphaNumeric', message || 'The value of the field can only contain letters and numbers');
            return false;
        }

        return true;
    }

    async between(field, value, args, message){

        if(!Array.isArray(args) && args.length !== 2){
            this.validator.addError(field, 'between', 'The number of arguements in the field are invalid');
            return false;
        }else{
            if(!v.isInt(args[0]) || !v.isInt(args[1])){
                this.validator.addError(field, 'between', 'The rule arguements for the field need to be integers');
                return false;
            }else if( parseInt(args[0]) >= parseInt(args[1]) ){
                this.validator.addError(field, 'between', 'The rule arguement for the min value cannot be greater than or equal to the max value');
                return false;
            }else if(value.toString().length < parseInt(args[0]) || value.toString().length > parseInt(args[1])){
                if(message){
                    if(message){
                        message = message.replace(':minLength', args[0]).replace(':maxLength', args[1]);
                    }
                }

                this.validator.addError(field, 'between', 'The size of the field is not within the specified range');
                return false;
            }
        }

        return true;
    }


    async boolean(field, value, message){
        if(value === true || value === false || value === 0 || value === "0" ||value === 1 || value === "1"){
            return true;
        }else{
            this.validator.addError(field, 'boolean', 'The value of the field needs to be between true, false, 0 and 1');
            return false;
        }
    }

    async contains(field, value, inString, message){
        if(typeof inString !== "string"){
            this.validator.addError(field, 'contains', 'The number of arguements provided is invalid. Please provide one single string');
            return false;
        }else{
            if(!v.contains(value, inString)){
                if(message){
                    message.replace(':substring', inString);
                }
                this.validator.addError(field, 'contains', message || 'The value of the field can only contain letters and numbers');
                return false;
            }
        }

        return true;
    }

    async digits(field, value, dNumber, message){

        if(message){
            message = message.replace(':digits', dNumber.toString());
        }

        if(!v.isInt(dNumber)){
            this.validator.addError(field, 'digits', 'The arguement entered is an invalid. Please enter digits');
            return false;
        }else if(value != dNumber){
            this.validator.addError(field, 'digits', message || 'The value does not match with the mentioned number');
            return false;
        }

        return true;
    }

    async digitsBetween(field, value, args, message){
        if(!Array.isArray(args) && args.length !== 2){
            this.validator.addError(field, 'digitsBetween', 'The number of arguements in the field are invalid');
            return false;
        }else{
            if(!v.isInt(args[0]) || !v.isInt(args[1])){
                this.validator.addError(field, 'digitsBetween', 'The rule arguements for the field need to be integers');
                return false;
            }else if(parseInt(args[0]) >= parseInt(args[1])){
                this.validator.addError(field, 'digitsBetween', 'The rule arguement for the min value cannot be greater than or equal to the max value');
                return false;
            }else if(parseInt(value) < parseInt(args[0]) || parseInt(value) > parseInt(args[1])){
                if(message){
                    message = message.replace(':min', args[0]).replace(':max', args[1]);
                }

                this.validator.addError(field, 'digitsBetween', message || 'The digits are not within the specified range');
                return false;
            }
        }

        return true;
    }

    async email(field, value, message){
        if(!v.isEmail(value)){
            this.validator.addError(field, 'email', message || 'The value entered is not a valid email');
            return false;
        }

        return true;
    }

    async equals(field, value, arg, message){
        if(value != arg){
            this.validator.addError(field, 'equals', message || 'The value entered does not match with the arguement');
            return false;
        }

        return true;
    }

    async in(field, value, args, message){
        if(!Array.isArray(args)) args = [args];

        let match = false;

        for(let i = 0; i < args.length; i++){
            if(value == args[i]){
                match = true;
            }
        }

        if(!match){
            this.validator.addError(field, 'in', message || 'The value entered does not exist in the arguements supplied');
            return false;
        }

        return true;
    }

    async integer(field, value, message){
        if(!v.isInt(value)){
            this.validator.addError(field, 'integer', message || 'The value entered is not an integer');
            return false;
        }

        return true;
    }

    async ip(field, value, message){
        if(!v.isIP(value)){
            this.validator.addError(field, 'ip', message || 'The value entered is not an IP Address');
            return false;
        }

        return true;
    }

    async json(field, value, message){
        if(!v.isJSON(value)){
            this.validator.addError(field, 'json', message || 'The value entered is not a JSON string');
            return false;
        }

        return true;
    }

    async max(field, value, maxNum, message){
        if(!v.isInt(maxNum)){
            this.validator.addError(field, 'max', message || 'The rule arguements for max fields needs to be an integer');
            return false;
        }else if(!v.isInt(value)){
            this.validator.addError(field, 'max', message || 'The value for max fields must be an integer');
            return false;
        } else if(parseInt(value) > parseInt(maxNum)){
            if(message){
                message.replace(':max', maxNum)
            }
            this.validator.addError(field, 'max', message || 'The value of the field is greater than the max arguement');
            return false;
        }

        return true;
    }

    async maxLength(field, value, maxNum, message){
        if(!v.isInt(maxNum)){
            this.validator.addError(field, 'max', message || 'The rule arguements for max fields needs to be an integer');
            return false;
        }else if(value.toString().length > parseInt(maxNum)){
            if(message){
                message.replace(':maxLength', maxNum)
            }
            this.validator.addError(field, 'maxLength', message || 'The size of the field is greater than the max arguement');
            return false;
        }

        return true;
    }

    async min(field, value, minNum, message){
        if(!v.isInt(minNum)){
            this.validator.addError(field, 'min', message || 'The rule arguements for min fields needs to be an integer');
            return false;
        }else if(parseInt(value) < parseInt(minNum)){
            if(message){
                message.replace(':min', minNum)
            }

            this.validator.addError(field, 'min', message || 'The value of the field is lesser than the min arguement');
            return false;
        }

        return true;
    }

    async minLength(field, value, minNum, message){
        if(!v.isInt(minNum)){
            this.validator.addError(field, 'min', 'The rule arguements for min fields needs to be an integer');
            return false;
        }else if(value.toString().length < parseInt(minNum)){
            if(message){
                message.replace(':minLength', minNum)
            }

            this.validator.addError(field, 'minLength', message || 'The size of the field is lesser than the min arguement');
            return false;
        }

        return true;
    }

    async notContains(field, value, inString, message){
        if(typeof inString !== "string"){
            this.validator.addError(field, 'notContains', 'The number of arguements provided is invalid. Please provide one single string');
            return false;
        }else{
            if(v.contains(value, inString)){
                if(message){
                    message.replace(':substring', inString);
                }

                this.validator.addError(field, 'notContains', message || 'The value of the field can only contain letters and numbers');
                return false;
            }
        }

        return true;
    }

    async notIn(field, value, args, message){
        if(!Array.isArray(args)) args = [args];

        let noMatch = true;

        for(let i = 0; i < args.length; i++){
            if(value == args[i]){
                noMatch = false;
            }
        }

        if(!noMatch){
            this.validator.addError(field, 'notIn', message || 'The value entered exists in the arguements supplied');
            return false;
        }

        return true;
    }

    async numeric(field, value, message){
        if(!v.isNumeric(value.toString())){
            this.validator.addError(field, 'numeric', message || 'The value entered is not numeric');
            return false;
        }

        return true;
    }

    async regex(field, value, regexp, message){
        if(!(regexp instanceof RegExp)){
            this.validator.addError(field, 'regex', message || 'The regex arguement is not a valid regular expression');
            return false;
        }else if(!regexp.test(value)){
            if(message){
                message = message.replace(':regexp', regexp);
            }

            this.validator.addError(field, 'regex', message || 'The value provided did not match with the regex format');
            return false;
        }

        return true;
    }

    async same(field, value, otherField, message){
        if(typeof otherField !== 'string'){
            this.validator.addError(field, 'same', message || 'The number of arguements provided is invalid. Please provide one single string');
            return false;
        }else{
            otherField = otherField.split('.').filter(function(e){ return e !== ''; });
            let otherValue;
            let self = this;

            otherField.map(function(item){
        		if(typeof otherValue === 'undefined'){
        			otherValue = self.validator.fields && self.validator.fields[item];
        		}else{
        			otherValue = otherValue[item];
        		}
        	});

            if(typeof otherValue === 'undefined'){
                this.validator.addError(field, 'same', message || 'The field you are comparing the value against does not exist');
                return false;
            }else if(otherValue != value){
                this.validator.addError(field, 'same', message || 'The field you are comparing the value against are different');
                return false;
            }
        }

        return true;
    }

    async string(field, value, message){
        if(typeof value !== 'string'){
            this.validator.addError(field, 'string', message || 'The value provided is not a string');
            return false;
        }

        return true;
    }

    async url(field, value, message){
        if(!v.isURL(value)){
            this.validator.addError(field, 'url', message || 'The value provided is not a URL');
            return false;
        }

        return true;
    }


}

module.exports = Mix;