const v = require('validator');

const DateRules = require('./date');

class Mix extends DateRules {

	constructor(Validator) {
        super(Validator);
        this.validator = Validator;
    }

    /**
     * Validate that an attribute is a accepted.
     *
     * @param  string  filed
     * @param  mixed   value
     * @param  string   message
     * @return bool
     */
    async validateAccepted(field, value, message){
        if([true,1,'1','yes','on'].indexof(value) >= 0){
            return true;
        }else{
           
            return false;
        }
    }

    async validateAlpha(field, value, message){
        if(!v.isAlpha(value)){
           
            return false;
        }

        return true;
    }

    async validateAlphaDash(field, value, message){
        if(!(/^[A-Z0-9_-]+$/i.test(value))){
            
            return false;
        }

        return true;
    }

    async validateAlphaNumeric(field, value, message){
        if(!v.isAlphanumeric(value)){
           
            return false;
        }

        return true;
    }

    async validateBetween(field, value, args, message){

        if(!Array.isArray(args) && args.length !== 2){
            
            return false;
        }else{
            if(!v.isInt(args[0]) || !v.isInt(args[1])){
               
                return false;
            }else if( parseInt(args[0]) >= parseInt(args[1]) ){
                
                return false;
            }else if(value.toString().length < parseInt(args[0]) || value.toString().length > parseInt(args[1])){
                
                return false;
            }
        }

        return true;
    }

    /**
     * Validate that an attribute is a boolean.
     *
     * @param  string field
     * @param  mixed value
     * @param  string message
     * @return bool
     */
    async validateAccepted(field, value, message){
        if([true,false,0,1,'0','1'].indexOf(value) >= 0){
            return true;
        }else{
            return false;
        }
    }
    async validateBoolean(field, value, message){
        if(value === true || value === false || value === 0 || value === "0" ||value === 1 || value === "1"){
            return true;
        }else{
           return false;
        }
    }

    

    async validateContains(field, value, inString, message){
        if(typeof inString !== "string"){
            
            return false;
        }else{
            if(!v.contains(value, inString)){
                               
                return false;
            }
        }

        return true;
    }

    async validateDigits(field, value, dNumber, message){

        
        if(!v.isInt(dNumber)){
            return false;
        }else if(value != dNumber){
            return false;
        }

        return true;
    }

    async validateDigitsBetween(field, value, args, message){
        if(!Array.isArray(args) && args.length !== 2){
            throw new Error('The number of arguements for digits between in the field ' +field+ ' are invalid');
            return false;
        }else{
            if(!v.isInt(args[0]) || !v.isInt(args[1])){
                
                return false;
            }else if(parseInt(args[0]) >= parseInt(args[1])){
               
                return false;
            }else if(parseInt(value) < parseInt(args[0]) || parseInt(value) > parseInt(args[1])){
              
                
                return false;
            }
        }

        return true;
    }

    async validateEmail(field, value, message){
        if(!v.isEmail(value)){
            return false;
        }

        return true;
    }

    async validateEquals(field, value, arg, message){
        if(value != arg){
            return false;
        }

        return true;
    }

    async validateIn(field, value, args, message){
        if(!Array.isArray(args)) args = [args];

        let match = false;

        for(let i = 0; i < args.length; i++){
            if(value == args[i]){
                match = true;
            }
        }

        if(!match){
             return false;
        }

        return true;
    }

    async validateInteger(field, value, message){
        if(!v.isInt(value)){
            return false;
        }

        return true;
    }

    async validateIp(field, value, message){
        if(!v.isIP(value)){
            return false;
        }

        return true;
    }

    async validateArray(field, value, message) {
        return Array.isArray(value);
    }

    async validateJson(field, value, message){
        if(!v.isJSON(value)){
            return false;
        }

        return true;
    }

    async validateMax(field, value, maxNum, message){
        if(!v.isInt(maxNum)){
            //this.validator.addError(field, 'max', message || 'The rule arguements for max fields needs to be an integer');
            return false;
        }else if(!v.isInt(value)){
            //this.validator.addError(field, 'max', message || 'The value for max fields must be an integer');
            return false;
        } else if(parseInt(value) > parseInt(maxNum)){
            if(message){
                message.replace(':max', maxNum)
            }
            //this.validator.addError(field, 'max', message || 'The value of the field is greater than the max arguement');
            return false;
        }

        return true;
    }

    async validateMaxLength(field, value, maxNum, message){
        if(!v.isInt(maxNum)){
            //this.validator.addError(field, 'max', message || 'The rule arguements for max fields needs to be an integer');
            return false;
        }else if(value.toString().length > parseInt(maxNum)){
            /*if(message){
                message.replace(':maxLength', maxNum)
            }*/
            //this.validator.addError(field, 'maxLength', message || 'The size of the field is greater than the max arguement');
            return false;
        }

        return true;
    }

    async validateMin(field, value, minNum, message){
        if(!v.isInt(minNum)){
            //this.validator.addError(field, 'min', message || 'The rule arguements for min fields needs to be an integer');
            return false;
        }else if(parseInt(value) < parseInt(minNum)){
            /*if(message){
                message.replace(':min', minNum)
            }*/

            //this.validator.addError(field, 'min', message || 'The value of the field is lesser than the min arguement');
            return false;
        }

        return true;
    }

    async validateMinLength(field, value, minNum, message){
        if(!v.isInt(minNum)){
            //this.validator.addError(field, 'min', 'The rule arguements for min fields needs to be an integer');
            return false;
        }else if(value.toString().length < parseInt(minNum)){
            //this.validator.addError(field, 'minLength', message || 'The size of the field is lesser than the min arguement');
            return false;
        }

        return true;
    }

    async validateNotContains(field, value, inString, message){
        if(typeof inString !== "string"){
           // this.validator.addError(field, 'notContains', 'The number of arguements provided is invalid. Please provide one single string');
            return false;
        }else{
            if(v.contains(value, inString)){
               return false;
            }
        }

        return true;
    }

    async validateNotIn(field, value, args, message){
        if(!Array.isArray(args)) args = [args];

        let noMatch = true;

        for(let i = 0; i < args.length; i++){
            if(value == args[i]){
                noMatch = false;
            }
        }

        if(!noMatch){
            return false;
        }

        return true;
    }

    async validateNumeric(field, value, message){
        if(!v.isNumeric(value.toString())){
            return false;
        }

        return true;
    }

    async validateRegex(field, value, pattren, message){

        var regexp = new RegExp(pattren);

         if(!regexp.test(value)){
            
           return false;
        }

        return true;
    }

    async validateSame(field, value, otherField, message){
        if(typeof otherField !== 'string'){
           // this.validator.addError(field, 'same', message || 'The number of arguements provided is invalid. Please provide one single string');
            return false;
        }else{
            otherField = otherField.split('.').filter(function(e){ return e !== ''; });
            let otherValue;
            let self = this;

            otherField.map(function(item){
        		if(typeof otherValue === 'undefined'){
        			otherValue = self.validator.inputs && self.validator.inputs[item];
        		}else{
        			otherValue = otherValue[item];
        		}
        	});

            if(typeof otherValue === 'undefined'){
                //this.validator.addError(field, 'same', message || 'The field you are comparing the value against does not exist');
                return false;
            }else if(otherValue != value){
                //this.validator.addError(field, 'same', message || 'The field you are comparing the value against are different');
                return false;
            }
        }

        return true;
    }

    async validateString(field, value, message){
        if(typeof value !== 'string'){
            //this.validator.addError(field, 'string', message || 'The value provided is not a string');
            return false;
        }

        return true;
    }

    async validateUrl(field, value, message){
        if(!v.isURL(value)){
            //this.validator.addError(field, 'url', message || 'The value provided is not a URL');
            return false;
        }

        return true;
    }


}

module.exports = Mix;