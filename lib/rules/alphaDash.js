module.exports = function alphaDash({ value }) {
  if (!(/^[A-Z0-9_-]+$/i.test(value))) {
    return false;
  }

  return true;
};
