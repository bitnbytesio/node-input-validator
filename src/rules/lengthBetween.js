const integer = require('./integer');

module.exports = async function lengthBetween(attribute, value, args) {

    if (!Array.isArray(args) && args.length !== 2) {
        throw 'The number of arguments for length between in the field ' + attribute + ' are invalid.';
    }

    let [min, max] = args;

    let [isIntMin, isIntMax] = await Promise.all([
        integer(attribute, min.toString()),
        integer(max.toString()),
    ]);

    if (!isIntMin || !isIntMin) {
        throw 'Seeds must be integer for lengthBetween rule.';
    }

    min = parseInt(min);
    max = parseInt(max);

    if (min >= max) {

        throw 'Seed min must be less then max in lengthBetween.';
    }

    // if (Array.isArray(attribute)) {

    //     if (attribute.length < min || attribute.length > max) {
    //         return false;
    //     }

    //     return true;
    // }

    if (typeof value == 'string' || Array.isArray(value)) {
        if (value.length < min || value.length > max) {
            return false;
        }

        return true;
    }

     /* istanbul ignore next */
    return false;
}