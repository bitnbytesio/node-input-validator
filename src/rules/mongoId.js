const v = require('validator');

module.exports = async function mongoId(field, value) {
  return v.isMongoId(String(value));
};
