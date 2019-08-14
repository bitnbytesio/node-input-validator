const moment = require('moment');
const { dateFormats } = require('../lib/date');

module.exports = async function validateBefore(field, value, beforeDate) {
  const mBeforeDate = moment(beforeDate, dateFormats);
  const mDate = moment(value, dateFormats);

  /* istanbul ignore next */
  if (!mBeforeDate.isValid() || !mDate.isValid() || mBeforeDate.valueOf() < mDate.valueOf()) {
    return false;
  }


  return true;
};
