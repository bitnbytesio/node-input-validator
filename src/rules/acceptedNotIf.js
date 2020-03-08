const empty = require('../lib/empty');
const { pathIndex } = require('../lib/ObjectIndex');

module.exports = async function acceptedIf(field, value, args) {
    if (!args || args.length < 2) {
        throw new Error(`Invalid arguments supplied for field ${field} in requiredIf rule.`);
    }

    if (args.length % 2 !== 0) {
        throw new Error(`Invalid arguments supplied for field ${field} in requiredIf rule.`);
    }
    const acceptedValues = [true, 'true', 1, '1', 'yes', 'on'];

    let canbetrue = false;
    for (let start = 0; start < args.length; start += 2) {
        const requiredField = args[start];
        const requiredValue = args[start + 1];

        // eslint-disable-next-line eqeqeq
        if (requiredField == field) {
            return false;
        }

        // field can be true if all values are presented
        // @ts-ignore
        if (!empty(pathIndex(this.inputs, requiredField))
            // eslint-disable-next-line eqeqeq
            // @ts-ignore
            // eslint-disable-next-line eqeqeq
            && pathIndex(this.inputs, requiredField).toString() == requiredValue) {
            canbetrue = true;
        } else {
            canbetrue = false;
            break;
        }
    }
    if (canbetrue && acceptedValues.indexOf(value) >= 0) {
        return false;
    }

    return true;
};
