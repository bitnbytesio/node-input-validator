const empty = require('../lib/empty');

module.exports = async function requiredIf(field, value, args) {

    if (!args || args.length < 2) {

        throw new Error('Invalid arguments supplied for field ' + field + ' in requiredIf rule.');
        return false;
    }

    if (args.length % 2 !== 0) {

        throw new Error('Invalid arguments supplied for field ' + field + ' in requiredIf rule.');
        return false;
    }

    let required = false;
    for (let start = 0; start < args.length; start += 2) {
        let requiredField = args[start];
        let requiredValue = args[start + 1];

        if (requiredField == field) {
            return false;
        }

        // field is required if all values are presented
        if (!empty(this.inputs[requiredField])
            && this.inputs[requiredField].toString() == requiredValue) {
            required = true;
        } else {
            required = false;
            break
        }
    }

    if (required && empty(value)) {
        return false;
    }

    return true;
}