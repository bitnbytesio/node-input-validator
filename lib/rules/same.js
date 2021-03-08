module.exports = function same({ value, args }, v) {
  let [otherField] = args;
  otherField = otherField.split('.').filter((e) => e !== '');

  let otherValue;

  // eslint-disable-next-line array-callback-return
  otherField.map((item) => {
    if (typeof otherValue === 'undefined') {
      otherValue = v.inputs && v.inputs[item];
    } else {
      otherValue = otherValue[item];
    }
  });

  if (typeof otherValue === 'undefined') {
    return false;
  }

  if (otherValue !== value) {
    return false;
  }

  return true;
};
