
module.exports = async function same(field, value, otherField) {
  otherField = otherField.split('.').filter((e) => e !== '');

  let otherValue;

  // eslint-disable-next-line array-callback-return
  otherField.map((item) => {
    if (typeof otherValue === 'undefined') {
      otherValue = this.inputs && this.inputs[item];
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
