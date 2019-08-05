const v = require('validator');

module.exports = async function iso8601(field, value) {
  return v.isISO8601(String(value));
};
