function reallyEmpty(value) {
  if (!value && [false, 0].indexOf(value) < 0) {
    return true;
  }

  return !value.toString();
};

function reallyEmptyTrimmed(value) {
  if (!value && [false, 0].indexOf(value) < 0) {
    return true;
  }

  return !value.toString().trim();
};

module.exports = {
  reallyEmpty,
  reallyEmptyTrimmed,
  alter(prop, value) {
    module.exports[prop] = value;
  },
};

