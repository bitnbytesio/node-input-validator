/* eslint-disable prefer-const */
// @ts-ignore
const moment = require('moment');
const { dateFormats } = require('../lib/date');

module.exports = async function dateMonthsAfterToday(field, value, months) {
    let mAfterDate; let
        mDate;

    mAfterDate = moment().add(months, 'months');
    mDate = moment(value, dateFormats);

    /* istanbul ignore next */
    if (!mAfterDate.isValid() || !mDate.isValid()) {
        return false;
    }
    return mDate.isBefore(mAfterDate);
};
