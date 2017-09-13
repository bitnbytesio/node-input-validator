const Mix = require('./rules/mix');

class Rules extends Mix {

	constructor(Validator) {

		super(Validator);
		
        this.validator = Validator;

    }

}

module.exports = Rules;