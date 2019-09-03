module.exports.reallyEmpty = function reallyEmpty(value) {
  if (!value && [false, 0].indexOf(value) < 0) {
    return true;
  }

  return !value.toString().trim();
};
