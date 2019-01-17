const numeric = require('./numeric'), integer = require('./integer'), empty = require('../lib/empty');

module.exports = async function digitsBetween(field, value, args) {

    //const isNumeric = numeric(field, value);

    if (!(await numeric(field, value))) {
        return false;
    }

    if (!Array.isArray(args) && args.length !== 2) {

        throw new Error('The number of arguments for digits between in the field ' + field + ' are invalid.');
    }

    let [min, max] = args;

    if (!(await integer(field, min)) || !(await integer(field, max))) {
        throw new Error('Seeds must be integer for digits between rule.');
    }


    min = parseInt(min);
    max = parseInt(max);

    if (min >= max) {

        throw new Error('Seed min must be less then max in digits between.');
    }

    if (value.length < min || value.length > max) {
        return false;
    }

    return true;

}