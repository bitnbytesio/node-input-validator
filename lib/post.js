class PostRules {

    /**
     *
     * @param Validator
     */
    constructor(Validator) {

        this.validator = Validator;

    }

    /**
     * validate post rule
     * @param rule
     */
    async validate(rule) {

        let result;

        switch (rule.rule) {

            case 'any':
                result = await this.validateAny(rule.values, rule.params);
                break;

            case 'all':
                result = await this.validateAll(rule.values, rule.params);
                break;

            case 'function':
                result = await rule.params.apply(this, [rule.values]);
                break;
        }

        return result;
    }

    /**
     * check if any of required fields exists on input
     *
     * @param values {object}
     * @param fields {string[]}
     * @returns {Promise.<boolean>}
     */
    async validateAny(values, fields) {

        for (let k in fields) {

            let field = fields[k];

            if (values[field]) {

                return true;

            }

        }

        for (let k in fields) {

            let field = fields[k];
            let message = this.validator.parseMessage('required', [field], [], []);
            this.validator.addError(field, 'required', message);

        }

        let message = this.validator.parseMessage('any', fields.join(', '), [], []);
        this.validator.addError('*', 'any', message);

        return false;

    }

    /**
     * check if all of required fields exists on input
     *
     * @param values {object}
     * @param fields {string[]}
     * @returns {Promise.<boolean>}
     */
    async validateAll(values, fields) {

        let result = true;

        for (let k in fields) {

            if (values[fields[k]] === undefined) {

                result = false;
                break;

            }

        }

        if (result) {

            return true;

        }

        for (let k in fields) {

            let field = fields[k];
            let message = this.validator.parseMessage('required', [field], [], []);
            this.validator.addError(field, 'required', message);

        }

        return false;

    }

}


module.exports = PostRules;