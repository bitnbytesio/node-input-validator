module.exports = function boolean({ value, args }) {
  let opts = [true, false, 'true', 'false', 0, 1, '0', '1'];

  if (args.length) {
    opts = args;
  }
  // throw new Error(`${value}, ${opts.indexOf(value)}, ${attr}`);

  if (opts.indexOf(value) >= 0) {
    return true;
  }

  return false;
};
