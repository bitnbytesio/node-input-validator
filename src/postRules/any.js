/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/**
 * post validation rule any
 * @param {*} seletedValues
 * @param {Array} args
 * @this Validator
 * @return {Promise<boolean>}
 */
module.exports = async function any(seletedValues, args) {
  const values = this.inputs;

  for (const k in args) {
    const field = args[k];

    if (values[field]) {
      return true;
    }
  }

  for (const k in args) {
    const field = args[k];

    this.addError(field, 'required', this.parseMessage('required', field, values[field], args));
  }

  this.addError('*', 'any', this.parseMessage('any', '*', values, args));

  return false;
};
