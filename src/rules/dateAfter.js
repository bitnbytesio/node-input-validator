const moment = require('moment'),
    { dateFormats } = require('../lib/date');

module.exports = async function dateAfter(field, value, afterDate) {


    let mAfterDate, mDate;

    mAfterDate = moment(afterDate, dateFormats);
    mDate = moment(value, dateFormats);

    /* istanbul ignore next */
    if (!mAfterDate.isValid() || !mDate.isValid() || mAfterDate.valueOf() > mDate.valueOf()) {
        return false;
    }

    return true;
}