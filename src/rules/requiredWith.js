const empty = require('../lib/empty');

module.exports = async function requiredWith(field, value, args) {

    if (!Array.isArray(args)) args = [args];

    if (!args.length) {
        throw new Error('Invalid arguments supplied for field ' + field + ' in required with rule.');
    }

    let i, required = false;

    for (i = 0; i < args.length; ++i) {

        if (args[i] == field) {
            continue;
        }

        if (!empty(this.inputs[args[i]])) {
            required = true;
            break;
        }
    }

    if (required && empty(value)) {

        return false;
    }

    return true;
}