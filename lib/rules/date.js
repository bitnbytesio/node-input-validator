const moment = require('moment');

module.exports = function date({ value, args }) {
  const [format = 'YYYY-MM-DD'] = args;
  if (!moment(value, format, true).isValid()) {
    return false;
  }

  return true;
};
