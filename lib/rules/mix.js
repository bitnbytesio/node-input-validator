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
     * 
     * @param field
     * @param value
     * @returns {Promise.<boolean>}
     */
    async validateAccepted(field, value) {

        if ([true, 'true', 1, '1', 'yes', 'on'].indexOf(value) >= 0) {

            return true;
        }

        return false;

    }

    /**
     * will only allow ascii chars
     * 
     * @param field
     * @param value
     * @returns {Promise.<boolean>}
     */
    async validateAscii(field, value) {

        if (v.isAscii(value)) {

            return true;
        }

        return false;

    }

    /**
     * will only allow base 64 encoded string
     * 
     * @param field
     * @param value
     * @returns {Promise.<boolean>}
     */
    async validateBase64(field, value) {

        if (v.isBase64(value)) {

            return true;
        }

        return false;

    }

    /**
     * check if the string is a credit card.
     * 
     * @param field
     * @param value
     * @returns {Promise.<boolean>}
     */
    async validateCreditCard(field, value) {

        if (v.isCreditCard(value)) {

            return true;
        }

        return false;

    }

    /**
     * check if the string is a valid latitude-longitude coordinate.
     * 
     * @param field
     * @param value
     * @returns {Promise.<boolean>}
     */
    async validateLatLong(field, value) {

        if (v.isLatLong(value)) {

            return true;
        }

        return false;

    }


    /**
     * this will only allow alphabets
     * 
     * @param field
     * @param value
     * @returns {Promise.<boolean>}
     */
    async validateAlpha(field, value) {

        if (!v.isAlpha(value + '')) {
            return false;
        }

        return true;
    }

    /**
     * alphs-dash validation
     * 
     * @param field
     * @param value
     * @returns {Promise.<boolean>}
     */
    async validateAlphaDash(field, value) {

        if (!(/^[A-Z0-9_-]+$/i.test(value))) {

            return false;
        }

        return true;
    }

    /**
     * alpha numeric vdalidation
     * 
     * @param field
     * @param value
     * @returns {Promise.<boolean>}
     */
    async validateAlphaNumeric(field, value) {

        if (!v.isAlphanumeric(value + '')) {

            return false;
        }

        return true;
    }

    /**
     * between validation
     * 
     * @param field
     * @param value
     * @param args
     * @returns {Promise.<boolean>}
     */
    async validateLengthBetween(field, value, args) {

        if (!Array.isArray(args) && args.length !== 2) {

            return false;
        }

        if (!v.isInt(args[0]) || !v.isInt(args[1])) {

            return false;
        }

        if (parseInt(args[0]) >= parseInt(args[1])) {

            throw new Error('Seeds must be between:min,max.');
        }

        if (value.toString().length < parseInt(args[0]) || value.toString().length > parseInt(args[1])) {

            return false;
        }

        return true;

    }

    /**
     * Validate that an attribute is a boolean.
     * 
     * @param field
     * @param value
     * @returns {Promise.<boolean>}
     */
    async validateBoolean(field, value) {

        if ([true, false, 'true', 'false', 0, 1, '0', '1'].indexOf(value) >= 0) {

            return true;
        }

        return false;

    }

    /**
     * contains validation rule
     * 
     * @param field
     * @param value
     * @param inString
     * @returns {Promise.<boolean>}
     */
    async validateContains(field, value, inString) {

        if (typeof inString !== 'string') {

            return false;
        }

        if (!v.contains(value, inString)) {

            return false;
        }

        return true;

    }

    /**
     * validate digits
     * 
     * @param field
     * @param value
     * @param dNumber
     * @returns {Promise.<boolean>}
     */
    async validateDigits(field, value, dNumber) {

        if (!v.isInt(dNumber) || !this.validateNumeric(field, value + '')) {

            return false;
        }

        if (dNumber != value.length) {
            return false;
        }

        return true;

    }

    /**
     * digits between validation rule
     * 
     * @param field
     * @param value
     * @param args
     * @returns {Promise.<boolean>}
     */
    async validateDigitsBetween(field, value, args) {

        if (!this.validateNumeric(field, value + '')) {

            return false;
        }

        if (!Array.isArray(args) && args.length !== 2) {

            throw new Error('The number of arguments for digits between in the field ' + field + ' are invalid.');
        }

        if (!v.isInt(args[0]) || !v.isInt(args[1])) {

            return false;
        }

        if (parseInt(args[0]) >= parseInt(args[1])) {

            throw new Error('The min values must be less then max for digits between in the field ' + field + '.');
        }

        if (value.length < args[0] || value.length > args[1]) {
            return false;
        }

        return true;

    }

    /**
     * validate email
     * 
     * @param field
     * @param value
     * @returns {Promise.<boolean>}
     */
    async validateEmail(field, value) {

        if (!v.isEmail(value)) {

            return false;
        }

        return true;

    }

    /**
     * check for equal rule
     * 
     * @param field
     * @param value
     * @param arg
     * @returns {Promise.<boolean>}
     */
    async validateEquals(field, value, arg) {

        if (value != arg) {

            return false;
        }

        return true;

    }

    /**
     * check if values exist in provided arguments
     * 
     * @param field
     * @param value
     * @param args
     * @returns {Promise.<boolean>}
     */
    async validateIn(field, value, args) {

        if (!Array.isArray(args)) {

            args = [args];
        }

        if (args.indexOf(value) < 0) {

            return false;
        }

        return true;

    }

    /**
     * integer validation
     * 
     * @param field
     * @param value
     * @returns {Promise.<boolean>}
     */
    async validateInteger(field, value) {

        if (!v.isInt(value + '')) {

            return false;
        }

        return true;

    }

    /**
     * validate ip address
     * 
     * @param field
     * @param value
     * @returns {Promise.<boolean>}
     */
    async validateIp(field, value) {

        if (!v.isIP(value)) {

            return false;
        }

        return true;

    }

    /**
     * is array validation rule
     * 
     * @param field
     * @param value
     * @returns {Promise.<boolean>}
     */
    async validateArray(field, value) {

        return Array.isArray(value);

    }

    /**
     * is json valid
     * 
     * @param field
     * @param value
     * @returns {Promise.<boolean>}
     */
    async validateJson(field, value) {

        if (!v.isJSON(value)) {

            return false;
        }

        return true;

    }

    /**
     * compare values the max integer value
     * 
     * @param field
     * @param value
     * @param maxNum
     * @returns {Promise.<boolean>}
     */
    async validateMax(field, value, maxNum) {
        if (!v.isInt(maxNum)) {
            return false;
        }

        if (!v.isInt(value + '')) {
            return false;
        }

        if (parseInt(value) > parseInt(maxNum)) {
            return false;
        }

        return true;
    }

    /**
     * check string length
     * 
     * @param field
     * @param value
     * @param maxNum
     * @returns {Promise.<boolean>}
     */
    async validateMaxLength(field, value, maxNum) {
        if (!v.isInt(maxNum)) {
            return false;
        }

        if (value.toString().length > parseInt(maxNum)) {
            return false;
        }

        return true;
    }

    /**
     * value must be greater then min
     * 
     * @param field
     * @param value
     * @param minNum
     * @returns {Promise.<boolean>}
     */
    async validateMin(field, value, minNum) {
        if (!v.isInt(minNum)) {
            return false;
        }

        if (parseInt(value) < parseInt(minNum)) {
            return false;
        }

        return true;
    }

    /**
     * string length must be greater then min value
     * 
     * @param field
     * @param value
     * @param minNum
     * @returns {Promise.<boolean>}
     */
    async validateMinLength(field, value, minNum) {
        if (!v.isInt(minNum)) {
            return false;
        }

        if (value.toString().length < parseInt(minNum)) {
            return false;
        }

        return true;
    }

    /**
     * no contains rule
     * 
     * @param field
     * @param value
     * @param inString
     * @returns {Promise.<boolean>}
     */
    async validateNotContains(field, value, inString) {
        if (typeof inString !== 'string') {
            return false;
        }

        if (v.contains(value, inString)) {
            return false;
        }

        return true;
    }

    /**
     * not in arguments
     * 
     * @param field
     * @param value
     * @param args
     * @returns {Promise.<boolean>}
     */
    async validateNotIn(field, value, args) {
        if (!Array.isArray(args)) args = [args];

        if (args.indexOf(value) >= 0) {
            return false;
        }

        return true;
    }

    /**
     * check if value if numeric
     * 
     * @param field
     * @param value
     * @returns {Promise.<boolean>}
     */
    async validateNumeric(field, value) {

        return !isNaN(parseFloat(value)) && isFinite(value)
    }

    /**
     * check if value if decimal
     * 
     * @param field
     * @param value
     * @returns {Promise.<boolean>}
     */
    async validateDecimal(field, value) {

        return v.isDecimal(parseFloat(value) + '')
    }

    /**
     * validate with regex pattern
     * 
     * @param field
     * @param value
     * @param pattren
     * 
     * @returns {Promise.<boolean>}
     */
    async validateRegex(field, value, pattren) {

        var regexp = new RegExp(pattren);

        if (!regexp.test(value)) {

            return false;
        }

        return true;
    }

    /**
     * value must same as of provided field
     * 
     * @param field
     * @param value
     * @param otherField
     * @returns {Promise.<boolean>}
     */
    async validateSame(field, value, otherField) {
        if (typeof otherField !== 'string') {
            // this.validator.addError(field, 'same', message || 'The number of arguements provided is invalid. Please
            // provide one single string');
            return false;
        }

        otherField = otherField.split('.').filter((e) => e !== '');

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
            return false;
        }

        if (otherValue != value) {
            return false;
        }

        return true;
    }

    /**
     * provided values must be string
     * 
     * @param field
     * @param value
     * @returns {Promise.<boolean>}
     */
    async validateString(field, value) {
        if (typeof value !== 'string') {
            return false;
        }

        return true;
    }

    /**
     * validate url
     * 
     * @param field
     * @param value
     * @returns {Promise.<boolean>}
     */
    async validateUrl(field, value) {
        if (!v.isURL(value)) {
            return false;
        }

        return true;
    }

    async validateObject(field, value) {

        return (!!value) && (value.constructor === Object);

    }

}

module.exports = Mix;
