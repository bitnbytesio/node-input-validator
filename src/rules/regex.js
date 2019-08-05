
module.exports = async function regex(field, value, pattren) {
  const regexp = new RegExp(pattren);

  if (!regexp.test(value)) {
    return false;
  }

  return true;
};
