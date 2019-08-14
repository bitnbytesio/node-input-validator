const moment = require('moment');
const { dateFormats } = require('../lib/date');

module.exports = async function dateAfter(field, value, afterDate) {
  // let mAfterDate; let mDate;

  const mAfterDate = moment(afterDate, dateFormats);
  const mDate = moment(value, dateFormats);

  /* istanbul ignore next */
  if (!mAfterDate.isValid() || !mDate.isValid() || mAfterDate.valueOf() > mDate.valueOf()) {
    return false;
  }

  return true;
};
