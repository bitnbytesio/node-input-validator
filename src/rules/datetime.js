const moment = require('moment');

module.exports = async function date(field, value) {
  if (!moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
    return false;
  }

  return true;
};
