const moment = require('moment'),
    { dateFormats } = require('../lib/date');

module.exports = async function dateDaysBeforeToday(field, value, days) {


    let mAfterDate, mDate;

    mAfterDate = moment().add(days, 'years');
    mDate = moment(value, dateFormats);

    /* istanbul ignore next */
    if (!mAfterDate.isValid() || !mDate.isValid() || mAfterDate.valueOf() < mDate.valueOf()) {
        return false;
    }

    return true;
}
