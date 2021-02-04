module.exports = function regex({ value, args }) {
  const [pattren, flags] = args;
  const regexp = new RegExp(pattren, flags);

  if (!regexp.test(value)) {
    return false;
  }

  return true;
};
