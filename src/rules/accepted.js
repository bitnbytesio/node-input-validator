module.exports = async function accepted(field, value, args) {
  if (!args) {
    args = [true, 'true', 1, '1', 'yes', 'on'];
  }

  if (args.indexOf(value) >= 0) {
    return true;
  }

  return false;
};
