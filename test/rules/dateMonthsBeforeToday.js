const Validator = require('../../index');
const assert = require('assert');

describe('#dateMonthsBeforeToday', function () {

    const monthsBeforeToday = 0

    it('should return true', async () => {
        const stringFormat = formatDateString(new Date(),monthsBeforeToday)
        const v = new Validator({ dob: stringFormat }, { dob: `required|dateFormat:YYYY-MM-DD|dateMonthsBeforeToday:${monthsBeforeToday}` });
        const matched = await v.check();
        assert.equal(matched, true);

    });

    it('should return false', async () => {
        const stringFormat = formatDateString(new Date(),-1)
        const v = new Validator({ dob: stringFormat }, { dob: `required|dateFormat:YYYY-MM-DD|dateMonthsBeforeToday:${monthsBeforeToday}` });
        const matched = await v.check();
        assert.equal(matched, false);

    });

    const formatDateString = (currentDate, monthsToSubtract) => {
        currentDate.setMonth(currentDate.getMonth()-monthsToSubtract)
        const currentMonth = currentDate.getUTCMonth() + 1
        const currentDay = currentDate.getUTCDate()
        const month = currentMonth < 10 ? `0${currentMonth}` : currentMonth.toString();
        const day = currentDay < 10 ? `0${currentDay}` : currentDay;
        return `${currentDate.getFullYear()}-${month}-${day}`
    }


});