const Validator = require('../../index');
const assert = require('assert');

describe('#dateMonthsBeforeToday', function () {

    const monthsBeforeToday = 0

    it('should return true', async () => {
        const stringFormat = formatDateString(new Date(),monthsBeforeToday)
        const validator = new Validator({ dob: stringFormat }, { dob: `required|dateFormat:YYYY-MM-DD|dateMonthsBeforeToday:${monthsBeforeToday}` });
        const matched = await validator.check();
        assert.equal(matched, true);
        assert.deepStrictEqual(validator.errors, {});

    });

    it('should return false', async () => {
        const key = "KEY"
        const stringFormat = formatDateString(new Date(),-1)
        const validator = new Validator({ [key]: stringFormat }, { [key]: `required|dateFormat:YYYY-MM-DD|dateMonthsBeforeToday:${monthsBeforeToday}` });
        const matched = await validator.check();
        assert.equal(matched, false);
        const expectedErrorObject = {
            [key]: {
                message: `The ${key} must be a date before ${monthsBeforeToday} months.`,
                rule: 'dateMonthsBeforeToday'
            }
        }
        assert.deepStrictEqual(validator.errors, expectedErrorObject);

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