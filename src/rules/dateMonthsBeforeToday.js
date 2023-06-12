/* eslint-disable prefer-const */
// @ts-ignore
const moment = require('moment');
const { dateFormats } = require('../lib/date');

module.exports = async function dateMonthsBeforeToday(field, value, months) {
    let mBeforeDate; let
        mDate;

    mBeforeDate = moment().subtract(months, 'months');
    mDate = moment(value, dateFormats);

    if (!mBeforeDate.isValid() || !mDate.isValid()) {
        return false;
    }
    return mDate.isBefore(mBeforeDate);
};
