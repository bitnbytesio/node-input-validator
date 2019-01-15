/**
 * post validation rule all
 * @param {*} seletedValues
 * @param {Array} args
 * @this Validator
 * @returns Promise<boolean>
 */
module.exports = async function all(seletedValues, args) {

    const values = this.inputs;

    let result = true;

    for (let k in args) {

        if (values[args[k]] === undefined) {

            result = false;
            break;

        }

    }

    if (result) {

        return true;

    }

    for (let k in args) {

        let field = args[k];
        this.addError(field, 'required', this.parseMessage('required', field, values[field], args));

    }

    return false;

}