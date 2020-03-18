// @ts-ignore
const moment = require('moment');

module.exports = async function yoBiggerThan(field, value, args) {
    const now = moment();
    const birthday = moment(value);
    const diffInYears = now.diff(birthday, 'years');

    return diffInYears >= args;
};
