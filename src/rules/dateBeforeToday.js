const moment = require('moment'),
    { dateFormats } = require('../lib/date');

const dateAfterToday = require('./dateAfterToday');

module.exports = async function dateDaysBeforeToday(field, value, args) {
    if (!Array.isArray(args)) {
        args = [args];
    }

    // after date moment object
    const mAfterDate = moment().subtract(args[0], args[1] || 'days');
    // input date moment object
    const mDate = moment(value, dateFormats);

    /* istanbul ignore next */
    if (!mAfterDate.isValid() || !mDate.isValid() || mAfterDate.valueOf() < mDate.valueOf()) {
        return false;
    }

    return true;
}
