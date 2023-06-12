const Validator = require('../../index');
const assert = require('assert');

describe('#dateMonthsAfterToday', function () {

    const monthsAfterToday = 3

    it('should return true', async () => {
        const stringFormat = formatDateString(new Date(),monthsAfterToday)
        const v = new Validator({ dob: stringFormat }, { dob: `required|dateFormat:YYYY-MM-DD|dateMonthsAfterToday:${monthsAfterToday}` });
        const matched = await v.check();
        assert.equal(matched, true);

    });

    it('should return false', async () => {
        const stringFormat = formatDateString(new Date(),monthsAfterToday+2)
        const v = new Validator({ dob: stringFormat }, { dob: `required|dateFormat:YYYY-MM-DD|dateMonthsAfterToday:${monthsAfterToday}` });
        const matched = await v.check();
        assert.equal(matched, false);

    });

    const formatDateString = (currentDate, monthsToAdd) => {
        currentDate.setMonth(currentDate.getMonth()+monthsToAdd)
        const currentMonth = currentDate.getUTCMonth() + 1
        const currentDay = currentDate.getUTCDate()
        const month = currentMonth < 10 ? `0${currentMonth}` : currentMonth.toString();
        const day = currentDay < 10 ? `0${currentDay}` : currentDay;
        return `${currentDate.getFullYear()}-${month}-${day}`
    }


});