const moment = require('moment'),
    { dateFormats } = require('../lib/date');

module.exports = async function validateBefore(field, value, beforeDate) {

    let mBeforeDate, mDate;

    mBeforeDate = moment(beforeDate, dateFormats);
    mDate = moment(value, dateFormats);

    /* istanbul ignore next */
    if (!mBeforeDate.isValid() || !mDate.isValid() || mBeforeDate.valueOf() < mDate.valueOf()) {

        return false;
    }



    return true;
}
