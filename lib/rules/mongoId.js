const v = require('validator');

module.exports = function mongoId({ value }) {
  return v.isMongoId(String(value));
};
