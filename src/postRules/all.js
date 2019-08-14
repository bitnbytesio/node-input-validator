/* eslint-disable no-restricted-syntax */
/**
 * post validation rule all
 * @param {*} seletedValues
 * @param {Array} args
 * @return {Promise<boolean>}
 * @this Validator
 */
module.exports = async function all(seletedValues, args) {
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
    if (args.hasOwnProperty(k)) {
      const field = args[k];
      this.addError(field, 'required', this.parseMessage('required', field, values[field], args));
    }
  }

  return false;
};
