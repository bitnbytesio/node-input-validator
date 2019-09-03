const moment = require('moment');
const { dateFormats } = require('../util/date');

module.exports = function dateDaysBeforeToday({ value, args }) {
  // after date moment object
  const mAfterDate = moment().subtract(args[0], args[1] || 'days');
  // input date moment object
  const mDate = moment(value, dateFormats);

  if (!mAfterDate.isValid() || !mDate.isValid() || mAfterDate.valueOf() < mDate.valueOf()) {
    return false;
  }

  return true;
};
