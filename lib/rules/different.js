module.exports = ({ value, args }, v) => {
  if (!args.length) {
    throw new Error('Invalid number of arguments');
  }

  const [otherInput] = args;

  const otherValue = v.inputs[otherInput];

  if (otherValue === value) {
    return false;
  }

  return true;
};
