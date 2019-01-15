/**
 * post validation rule any
 * @param {*} seletedValues
 * @param {Array} args
 * @this Validator
 * @returns Promise<boolean>
 */
module.exports = async function any(seletedValues, args) {

    const values = this.inputs;

    for (let k in args) {

        let field = args[k];

        if (values[field]) {

            return true;

        }

    }

    for (let k in args) {

        let field = args[k];

        this.addError(field, 'required', this.parseMessage('required', field, values[field], args));

    }

    this.addError('*', 'any', this.parseMessage('any', '*', values, args));

    return false;

}