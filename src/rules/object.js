
module.exports = async function object(field, value) {
  return (!!value) && (value.constructor === Object);
};
