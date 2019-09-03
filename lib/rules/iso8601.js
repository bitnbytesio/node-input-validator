const v = require('validator');

module.exports = function iso8601({ value }) {
  return v.isISO8601(String(value));
};
