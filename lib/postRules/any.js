/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/**
 * post validation rule any
 * @param {*} rule
 * @param {*} v
 * @return {*}
 */
module.exports = function any({ params }, v) {
  const values = v.inputs;

  for (const k in params) {
    const field = params[k];

    if (values[field]) {
      return true;
    }
  }

  for (const k in params) {
    const field = params[k];

    v.error(field, 'required', v.getParsedMessage({
      rule: 'required',
      attr: field,
      value: values[field],
      args: params,
    }));
  }

  v.error('*', 'any', v.getParsedMessage({
    rule: 'any',
    attr: '*',
    value: values,
    args: params,
  }));

  return false;
};
