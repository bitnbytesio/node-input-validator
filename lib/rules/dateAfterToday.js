const moment = require('moment');
const { dateFormats } = require('../util/date');


module.exports = function dateDaysAfterToday({ value, args }) {
  // after date moment object
  const mAfterDate = moment().add(args[0], args[1] || 'days');
  // input date moment object
  const mDate = moment(value, dateFormats);

  /* istanbul ignore next */
  if (!mAfterDate.isValid() || !mDate.isValid() || mAfterDate.valueOf() > mDate.valueOf()) {
    return false;
  }

  return true;
};
