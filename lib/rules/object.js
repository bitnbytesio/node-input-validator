module.exports = function object({ value }) {
  return (!!value) && (value.constructor === Object);
};
