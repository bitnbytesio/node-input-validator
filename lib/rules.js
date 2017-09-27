const Mix = require('./rules/mix');

class Rules extends Mix {

    /**
     *
     * @param Validator
     */
    constructor(Validator) {

        super(Validator);

        this.validator = Validator;

        //this.rules = new Mix(Validator);

    }

    /**
     * required rule
     * @param field
     * @param value
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateRequired(field, value, message) {

        if (typeof value === 'undefined' || !value.toString().trim()) {
            return false;
        }

        return true;
    }

    /**
     * required if rule
     * @param field
     * @param value
     * @param args
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateRequiredIf(field, value, args, message) {
        if (args.length >= 2) {
            if (args.length % 2 === 0) {
                let argGroup, start, required = false, sameField = false;
                for (let i = 0; i < args.length / 2; ++i) {
                    if (!i) start = i
                    else start += 2;

                    argGroup = args.slice(start, start + 2);
                    if (argGroup[0] != field) {
                        if (typeof this.validator.inputs[argGroup[0]] !== 'undefined' && this.validator.inputs[argGroup[0]] == argGroup[1]) {
                            required = true;
                        } else {
                            required = false;
                            break
                        }
                    } else {
                        sameField = true;
                        break
                    }
                }

                if (sameField) {
                    return false;
                }

                if (required && (typeof value === 'undefined' || !value.toString().trim())) {
                    return false;
                }

                return required;
            } else {
                throw new Error('Invalid arguments supplied for field ' + field + ' in requiredIf rule.');

                return false;
            }
        } else {
            throw new Error('Invalid arguments supplied for field ' + field + ' in requiredIf rule.');

            return false;
        }
    }

    /**
     * required not if rule
     * @param field
     * @param value
     * @param args
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateRequiredNotIf(field, value, args, message) {

        if (args.length >= 2) {
            if (args.length % 2 === 0) {
                var argGroup, start, required = false, sameField = false;
                for (var i = 0; i < args.length / 2; ++i) {
                    if (!i) start = i
                    else start += 2;

                    argGroup = args.slice(start, start + 2);

                    if (argGroup[0] != field) {
                        if (typeof this.validator.inputs[argGroup[0]] !== 'undefined' && this.validator.inputs[argGroup[0]] != argGroup[1]) {
                            required = true;
                        } else {
                            required = false;
                            break;
                        }
                    } else {
                        sameField = true;
                        break;
                    }
                }

                if (sameField) {
                    throw new Error('Invalid arguments supplied for field ' + field + ' in required not if rule.');

                }

                if (required && (typeof value === 'undefined' || !value.toString().trim())) {
                    return false;
                }

                return true;
            } else {
                throw new Error('Invalid arguments supplied for field ' + field + ' in required not if rule.');

            }
        } else {
            throw new Error('Invalid arguments supplied for field ' + field + ' in required not if rule.');

        }
    }

    /**
     * required with rule
     * @param field
     * @param value
     * @param args
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateRequiredWith(field, value, args, message) {
        if (!Array.isArray(args)) args = [args];
        if (args.length) {
            var required = false;
            for (var i = 0; i < args.length; ++i) {
                if (args[i] != field) {
                    if (this.validator.inputs[args[i]] && typeof this.validator.inputs[args[i]] !== 'undefined') {
                        required = true;
                        break;
                    }
                }
            }

            if (required && (typeof value === 'undefined' || !value.toString().trim())) {

                return false;
            }

            return required;
        } else {
            throw new Error('Invalid arguments supplied for field ' + field + ' in required with rule.');

        }
    }

    /**
     * required without rule
     * @param field
     * @param value
     * @param args
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateRequiredWithout(field, value, args, message) {
        if (!Array.isArray(args)) args = [args];
        if (args.length) {
            var required = false;
            for (var i = 0; i < args.length; ++i) {
                if (args[i] != field) {
                    if (!this.validator.inputs[args[i]] || typeof this.validator.inputs[args[i]] === 'undefined') {
                        required = true;
                        break;
                    }
                }
            }

            if (required && (typeof value === 'undefined' || !value.toString().trim())) {

                return false;
            }

            return required;
        } else {
            throw new Error('Invalid arguments supplied for field ' + field + ' in required without rule.');

        }
    }

    /**
     * apply rules on inputs
     * @param field
     * @returns {Promise.<boolean>}
     */
    async validate(field) {


        let proceed = true;

        for (let r = 0; r < field.rules.length; r++) {


            let func = 'validate' + field.rules[r].rule.charAt(0).toUpperCase() + field.rules[r].rule.slice(1);


            if (typeof this[func] === 'function') {
                //if((!field.required && typeof field.value !== 'undefined') || field.required){
                let ruleArgs = [field.field, field.value || ''];

                if (field.rules[r].args) {
                    ruleArgs.push(field.rules[r].args);
                }

                if (field.rules[r].message) {
                    ruleArgs.push(field.rules[r].message);
                }


                if (!(await this[func].apply(this, ruleArgs))) {

                    field.message = this.validator.parseMessage(field.rules[r].rule, field.field, this.validator.validations[field.field].value, field.message, field.rules[r].args);
                    this.validator.addError(field.field, field.rules[r].rule, field.message);
                    proceed = false;
                    break;
                }
                /*}else{
                    proceed = false;
                }*/
            } else {
                throw new Error('Invalid Validation Rule: ' + field.rules[r].rule + ' does not exist');
                proceed = false;
            }


        }

        return proceed;

    }


}

module.exports = Rules;