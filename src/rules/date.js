const moment = require('moment');

module.exports = async function date(field, value, format = 'YYYY-MM-DD') {
  if (!moment(value, format, true).isValid()) {
    return false;
  }

  return true;
};
