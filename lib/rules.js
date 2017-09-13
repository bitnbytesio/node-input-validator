const Mix = require('./rules/mix');

class Rules extends Mix {

	constructor(Validator) {

		super(Validator);
		
        this.validator = Validator;

    }

    /*async custom(field, value, message) {

    }*/

}

module.exports = Rules;