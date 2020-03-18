/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/**
 * post validation rule all
 * @param {*} seletedValues
 * @param {Array} args
 * @this Validator
 * @returns Promise<boolean>
 */
// @ts-ignore
module.exports = async function all(seletedValues, args) {
    // @ts-ignore
    const values = this.inputs;

    let result = true;

    for (const k in args) {
        if (values[args[k]] === undefined) {
            result = false;
            break;
        }
    }

    if (result) {
        return true;
    }

    for (const k in args) {
        const field = args[k];
        // @ts-ignore
        this.addError(field, 'required', this.parseMessage('required', field, values[field], args));
    }

    return false;
};
