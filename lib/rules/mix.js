const v = require('validator');

const DateRules = require('./date');

class Mix extends DateRules {

    /**
     *
     * @param Validator
     */
    constructor(Validator) {
        super(Validator);
        this.validator = Validator;
    }

    /**
     * Validate that an attribute is a accepted.
     * @param field
     * @param value
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateAccepted(field, value, message) {
        if ([true, 'true', 1, '1', 'yes', 'on'].indexof(value) >= 0) {
            return true;
        } else {

            return false;
        }
    }

    /**
     * will only allow ascii chars
     * @param field
     * @param value
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateAscii(field, value, message) {
        if (!v.isAscii(value)) {
            return true;
        }

        return false;

    }

    /**
     * will only allow base 64 encoded string
     * @param field
     * @param value
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateBase64(field, value, message) {
        if (!v.isBase64(value)) {
            return true;
        }

        return false;

    }

    /**
     * check if the string is a credit card.
     * @param field
     * @param value
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateCreditCard(field, value, message) {
        if (!v.isCreditCard(value)) {
            return true;
        }

        return false;

    }

    /**
     * check if the string is a valid latitude-longitude coordinate.
     * @param field
     * @param value
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateLatLong(field, value, message) {
        if (!v.isLatLong(value)) {
            return true;
        }

        return false;

    }



    /**
     * this will only allow alphabets
     * @param field
     * @param value
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateAlpha(field, value, message) {
        if (!v.isAlpha(value)) {

            return false;
        }

        return true;
    }

    /**
     * alphs-dash validation
     * @param field
     * @param value
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateAlphaDash(field, value, message) {
        if (!(/^[A-Z0-9_-]+$/i.test(value))) {

            return false;
        }

        return true;
    }

    /**
     * alpha numeric vdalidation
     * @param field
     * @param value
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateAlphaNumeric(field, value, message) {
        if (!v.isAlphanumeric(value)) {

            return false;
        }

        return true;
    }

    /**
     * between validation
     * @param field
     * @param value
     * @param args
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateBetween(field, value, args, message) {

        if (!Array.isArray(args) && args.length !== 2) {

            return false;
        } else {
            if (!v.isInt(args[0]) || !v.isInt(args[1])) {

                return false;
            } else if (parseInt(args[0]) >= parseInt(args[1])) {

                return false;
            } else if (value.toString().length < parseInt(args[0]) || value.toString().length > parseInt(args[1])) {

                return false;
            }
        }

        return true;
    }

    /**
     * Validate that an attribute is a boolean.
     * @param field
     * @param value
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateBoolean(field, value, message) {
        if ([true, false, 0, 1, '0', '1'].indexOf(value) >= 0) {
            return true;
        } else {
            return false;
        }
    }


    /**
     * contains validation rule
     * @param field
     * @param value
     * @param inString
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateContains(field, value, inString, message) {
        if (typeof inString !== "string") {

            return false;
        } else {
            if (!v.contains(value, inString)) {

                return false;
            }
        }

        return true;
    }

    /**
     * validate digits
     * @param field
     * @param value
     * @param dNumber
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateDigits(field, value, dNumber, message) {


        if (!v.isInt(dNumber)) {
            return false;
        } else if (value != dNumber) {
            return false;
        }

        return true;
    }

    /**
     * digits between validation rule
     * @param field
     * @param value
     * @param args
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateDigitsBetween(field, value, args, message) {
        if (!Array.isArray(args) && args.length !== 2) {
            throw new Error('The number of arguements for digits between in the field ' + field + ' are invalid');
            return false;
        } else {
            if (!v.isInt(args[0]) || !v.isInt(args[1])) {

                return false;
            } else if (parseInt(args[0]) >= parseInt(args[1])) {

                return false;
            } else if (parseInt(value) < parseInt(args[0]) || parseInt(value) > parseInt(args[1])) {


                return false;
            }
        }

        return true;
    }

    /**
     * validate email
     * @param field
     * @param value
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateEmail(field, value, message) {
        if (!v.isEmail(value)) {
            return false;
        }

        return true;
    }

    /**
     * check for equal rule
     * @param field
     * @param value
     * @param arg
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateEquals(field, value, arg, message) {
        if (value != arg) {
            return false;
        }

        return true;
    }

    /**
     * check if values exist in provided arguments
     * @param field
     * @param value
     * @param args
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateIn(field, value, args, message) {
        if (!Array.isArray(args)) args = [args];

        let match = false;

        for (let i = 0; i < args.length; i++) {
            if (value == args[i]) {
                match = true;
            }
        }

        if (!match) {
            return false;
        }

        return true;
    }

    /**
     * integer validation
     * @param field
     * @param value
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateInteger(field, value, message) {
        if (!v.isInt(value)) {
            return false;
        }

        return true;
    }

    /**
     * validate ip address
     * @param field
     * @param value
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateIp(field, value, message) {
        if (!v.isIP(value)) {
            return false;
        }

        return true;
    }

    /**
     * is array validation rule
     * @param field
     * @param value
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateArray(field, value, message) {
        return Array.isArray(value);
    }

    /**
     * is json valid
     * @param field
     * @param value
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateJson(field, value, message) {
        if (!v.isJSON(value)) {
            return false;
        }

        return true;
    }

    /**
     * compare values tih max integer value
     * @param field
     * @param value
     * @param maxNum
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateMax(field, value, maxNum, message) {
        if (!v.isInt(maxNum)) {
            return false;
        } else if (!v.isInt(value)) {
            return false;
        } else if (parseInt(value) > parseInt(maxNum)) {
            if (message) {
                message.replace(':max', maxNum)
            }
            //this.validator.addError(field, 'max', message || 'The value of the field is greater than the max arguement');
            return false;
        }

        return true;
    }

    /**
     * check string length
     * @param field
     * @param value
     * @param maxNum
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateMaxLength(field, value, maxNum, message) {
        if (!v.isInt(maxNum)) {
            return false;
        } else if (value.toString().length > parseInt(maxNum)) {
            return false;
        }

        return true;
    }

    /**
     * value must be greater then min
     * @param field
     * @param value
     * @param minNum
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateMin(field, value, minNum, message) {
        if (!v.isInt(minNum)) {
             return false;
        } else if (parseInt(value) < parseInt(minNum)) {
           return false;
        }

        return true;
    }

    /**
     * string length must be greater then min value
     * @param field
     * @param value
     * @param minNum
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateMinLength(field, value, minNum, message) {
        if (!v.isInt(minNum)) {
            //this.validator.addError(field, 'min', 'The rule arguements for min fields needs to be an integer');
            return false;
        } else if (value.toString().length < parseInt(minNum)) {
            //this.validator.addError(field, 'minLength', message || 'The size of the field is lesser than the min arguement');
            return false;
        }

        return true;
    }

    /**
     * no contains rule
     * @param field
     * @param value
     * @param inString
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateNotContains(field, value, inString, message) {
        if (typeof inString !== "string") {
            // this.validator.addError(field, 'notContains', 'The number of arguements provided is invalid. Please provide one single string');
            return false;
        } else {
            if (v.contains(value, inString)) {
                return false;
            }
        }

        return true;
    }

    /**
     * no in arguments
     * @param field
     * @param value
     * @param args
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateNotIn(field, value, args, message) {
        if (!Array.isArray(args)) args = [args];

        let noMatch = true;

        for (let i = 0; i < args.length; i++) {
            if (value == args[i]) {
                noMatch = false;
            }
        }

        if (!noMatch) {
            return false;
        }

        return true;
    }

    /**
     * check if value if numeric
     * @param field
     * @param value
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateNumeric(field, value, message) {
        if (!v.isNumeric(value.toString())) {
            return false;
        }

        return true;
    }

    /**
     * validate with regex pattren
     * @param field
     * @param value
     * @param pattren
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateRegex(field, value, pattren, message) {

        var regexp = new RegExp(pattren);

        if (!regexp.test(value)) {

            return false;
        }

        return true;
    }

    /**
     * value must same as of provided field
     * @param field
     * @param value
     * @param otherField
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateSame(field, value, otherField, message) {
        if (typeof otherField !== 'string') {
            // this.validator.addError(field, 'same', message || 'The number of arguements provided is invalid. Please provide one single string');
            return false;
        } else {
            otherField = otherField.split('.').filter(function (e) {
                return e !== '';
            });
            let otherValue;
            let self = this;

            otherField.map(function (item) {
                if (typeof otherValue === 'undefined') {
                    otherValue = self.validator.inputs && self.validator.inputs[item];
                } else {
                    otherValue = otherValue[item];
                }
            });

            if (typeof otherValue === 'undefined') {
                //this.validator.addError(field, 'same', message || 'The field you are comparing the value against does not exist');
                return false;
            } else if (otherValue != value) {
                //this.validator.addError(field, 'same', message || 'The field you are comparing the value against are different');
                return false;
            }
        }

        return true;
    }

    /**
     * provided values must be string
     * @param field
     * @param value
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateString(field, value, message) {
        if (typeof value !== 'string') {
            //this.validator.addError(field, 'string', message || 'The value provided is not a string');
            return false;
        }

        return true;
    }

    /**
     * validate url
     * @param field
     * @param value
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateUrl(field, value, message) {
        if (!v.isURL(value)) {
            //this.validator.addError(field, 'url', message || 'The value provided is not a URL');
            return false;
        }

        return true;
    }


}

module.exports = Mix;