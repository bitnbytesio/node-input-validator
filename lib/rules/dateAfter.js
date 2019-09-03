const moment = require('moment');
const { dateFormats } = require('../util/date');

module.exports = function dateAfter({ value, args }) {
  const [afterDate] = args;

  const mAfterDate = moment(afterDate, dateFormats);
  const mDate = moment(value, dateFormats);

  if (!mAfterDate.isValid() || !mDate.isValid() || mAfterDate.valueOf() > mDate.valueOf()) {
    return false;
  }

  return true;
};
