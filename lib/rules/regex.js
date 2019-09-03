
module.exports = function regex({ value, args }) {
  const [pattren] = args;
  const regexp = new RegExp(pattren);

  if (!regexp.test(value)) {
    return false;
  }

  return true;
};
