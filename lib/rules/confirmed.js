module.exports = ({ value, attr }, v) => {
  const otherInput = `${attr}Confirmation`;

  const otherValue = v.inputs[otherInput];

  if (otherValue === value) {
    return true;
  }

  return false;
};
