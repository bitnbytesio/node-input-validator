/* eslint-disable no-restricted-syntax */
/**
 * post validation rule all
 * @param {*} rule
 * @param {*} v
 * @return {*}
 */
module.exports = function all({ params }, v) {
  const values = v.inputs;

  let result = true;

  for (const k in params) {
    if (values[params[k]] === undefined) {
      result = false;
      break;
    }
  }

  if (result) {
    return true;
  }

  params.forEach((field) => {
    // const field = params[k];
    const value = v.parseValue(field);
    v.error(field, 'required', v.getParsedMessage({
      rule: 'required',
      attr: field,
      value,
      args: params,
    }));
  });

  return false;
};
