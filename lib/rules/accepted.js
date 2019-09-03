module.exports = function accepted({ value, args }) {
  // default options
  let opts = [true, 'true', 1, '1', 'yes', 'on'];
  // in case of custom options
  if (args.length) {
    opts = args;
  }
  // if value not found in opts
  if (opts.indexOf(value) >= 0) {
    return true;
  }

  return false;
};
