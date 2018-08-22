const Mix = require('./rules/mix');

class Rules extends Mix {

    /**
     *
     * @param Validator
     */
    constructor(Validator) {

        super(Validator);

        this.validator = Validator;

    }

    /**
     * helper function - check if provided value is empty
     * @param value
     * @returns {Boolean}
     */
    isEmpty(value) {

        if (typeof value === 'undefined') {
            return true;
        }

        if (value === null) {
            return true;
        }

        return !value.toString().trim();

    }

    /**
     * 
     * @param {*} field 
     * @param {*} value 
     */
    async validateRequired(field, value) {

        if (this.isEmpty(value)) {
            return false;
        }

        return true;
    }

    /**
     * 
     * @param {*} field 
     * @param {*} value 
     * @param {*} args 
     */
    async validateRequiredIf(field, value, args) {

        if (!args || args.length < 2) {

            throw new Error('Invalid arguments supplied for field ' + field + ' in requiredIf rule.');
            return false;
        }

        if (args.length % 2 !== 0) {

            throw new Error('Invalid arguments supplied for field ' + field + ' in requiredIf rule.');
            return false;
        }

        let required = false;
        for (let start = 0; start < args.length; start += 2) {
            let requiredField = args[start];
            let requiredValue = args[start + 1];

            if (requiredField == field) {
                return false;
            }

            if (!this.isEmpty(this.validator.inputs[requiredField])
                && this.validator.inputs[requiredField] == requiredValue) {
                required = true;
            } else {
                required = false;
                break
            }
        }

        if (required && this.isEmpty(value)) {
            return false;
        }

        return required;
    }

    /**
     * 
     * @param {*} field 
     * @param {*} value 
     * @param {*} args 
     */
    async validateRequiredNotIf(field, value, args) {

        if (args.length < 2) {
            throw new Error('Invalid arguments supplied for field ' + field + ' in required not if rule.');
        }

        if (args.length % 2 !== 0) {
            throw new Error('Invalid arguments supplied for field ' + field + ' in required not if rule.');
        }

        let required = false;
        for (let start = 0; start < args.length; start += 2) {
            let requiredField = args[start];
            let requiredValue = args[start + 1];

            if (requiredField == field) {
                throw new Error('Invalid arguments supplied for field ' + field + ' in required not if rule.');
            }

            if (!this.isEmpty(this.validator.inputs[requiredField])
                && this.validator.inputs[requiredField] != requiredValue) {
                required = true;
            } else {
                required = false;
                break;
            }
        }

        if (required && this.isEmpty(value)) {
            return false;
        }

        return true;
    }

    /**
     * 
     * @param {*} field 
     * @param {*} value 
     * @param {*} args 
     */
    async validateRequiredWith(field, value, args) {

        if (!Array.isArray(args)) args = [args];

        if (!args.length) {
            throw new Error('Invalid arguments supplied for field ' + field + ' in required with rule.');
        }

        var required = false;
        for (var i = 0; i < args.length; ++i) {
            if (args[i] == field) {
                continue;
            }

            if (!this.isEmpty(this.validator.inputs[args[i]])) {
                required = true;
                break;
            }
        }

        if (required && this.isEmpty(value)) {

            return false;
        }

        return true;
    }

    /**
     * 
     * @param {*} field 
     * @param {*} value 
     * @param {*} args 
     */
    async validateRequiredWithout(field, value, args) {
        if (!Array.isArray(args)) args = [args];

        if (!args.length) {
            throw new Error('Invalid arguments supplied for field ' + field + ' in required without rule.');
        }

        var required = false;
        for (var i = 0; i < args.length; ++i) {
            if (args[i] == field) {
                continue;
            }

            if (this.isEmpty(this.validator.inputs[args[i]])) {
                required = true;
                break;
            }
        }

        if (required && this.isEmpty(value)) {

            return false;
        }

        return true;
    }

    /**
     * apply rules on inputs
     * @param field
     * @returns {Promise.<boolean>}
     */
    async validate(field) {

        let proceed = true;

        if (field.multiple) {


            let fieldArr = field.path;

            let fieldName = field.field;



            for (let i in this.validator.inputs[fieldArr[0]]) {

                let item = this.validator.inputs[fieldArr[0]][i];

                //console.log(item, fieldArr);

                let indexedField = fieldName.replace('*', i);

                //fieldWithIndex.push(indexedField);

                let value = '';

                let fieldArrLen = fieldArr.length;

                if (fieldArrLen == 3) {
                    value = item[fieldArr[2]];
                } else if (fieldArrLen == 2) {
                    value = item;
                }

                proceed = await this.validate({
                    field: indexedField,
                    multiple: false,
                    rules: field.rules,
                    required: field.required
                });

            }

            return proceed;
        }

        for (let r = 0; r < field.rules.length; r++) {

            field.value = this.validator.inputVal(field.field, field.multiple);

            if (field.value == false) {
                field.value = String(field.value);
            }

            //console.log('validated rule', field.rules[r], field);
            //console.log('--------------------------------------');

            let func = 'validate' + field.rules[r].rule.charAt(0).toUpperCase() + field.rules[r].rule.slice(1);

            if (typeof this[func] !== 'function') {
                throw new Error('Invalid Validation Rule: ' + field.rules[r].rule + ' does not exist');
            }

            if (!field.required && this.isEmpty(field.value)) {
                continue;
            }

            let ruleArgs = [field.field, field.value || ''];

            if (field.rules[r].args) {
                ruleArgs.push(field.rules[r].args);
            }

            let result = await this[func].apply(this, ruleArgs);

            if (result && this.validator.implicitRules.indexOf(field.rules[r].rule) > 0) {
                field.required = false;
            }

            if (!result) {

                //this.validator.validations[field.field].value in place of file.value
                field.message = this.validator.parseMessage(field.rules[r].rule, field.field, field.value, field.rules[r].args);
                this.validator.addError(field.field, field.rules[r].rule, field.message);
                proceed = false;
                break;
            }

        }

        return proceed;

    }

}

module.exports = Rules;