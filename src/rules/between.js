const numeric = require('./numeric'),
    integer = require('./integer');


module.exports = async function between(attribute, value, args) {

    if (!Array.isArray(args) && args.length !== 2) {
        throw new Error('The number of arguments for between in the field ' + attribute + ' are invalid.');
    }

    let [min, max] = args;

    if (!numeric(min) || !numeric(max)) {
        throw new Error('Seeds must be integer for between rule.');
    }

    min = parseFloat(min);
    max = parseFloat(max);

    if (min >= max) {

        throw new Error('Seed min must be less then max in between.');
    }



    if (Array.isArray(value)) {
        if (value.length < min || value.length > max) {
            return false;
        }
        return true;
    }

    if (numeric(value)) {

        value = Number(value);

        if (value < min || value > max) {
            return false;
        }

        return true;
    }

    return false;
}
