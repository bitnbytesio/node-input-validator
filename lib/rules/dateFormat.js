const moment = require('moment');

module.exports = function dateFormat({ value, args }) {
  const [format] = args;
  if (!moment(value, format, true).isValid()) {
    return false;
  }

  return true;
};
