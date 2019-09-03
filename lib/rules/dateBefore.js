const moment = require('moment');
const { dateFormats } = require('../util/date');

module.exports = function validateBefore({ value, args }) {
  const [beforeDate] = args;
  const mBeforeDate = moment(beforeDate, dateFormats);
  const mDate = moment(value, dateFormats);

  if (!mBeforeDate.isValid() || !mDate.isValid() || mBeforeDate.valueOf() < mDate.valueOf()) {
    return false;
  }

  return true;
};
