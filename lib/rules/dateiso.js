const moment = require('moment');

module.exports = function date({ value }) {
  if (!moment(value, moment.ISO_8601).isValid()) {
    return false;
  }

  return true;
};
