/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable no-continue */
const empty = require('../lib/empty');
const { pathIndex } = require('../lib/ObjectIndex');

module.exports = async function requiredWithout(field, value, args) {
    if (!Array.isArray(args)) args = [args];

    if (!args.length) {
        throw new Error(`Invalid arguments supplied for field ${field} in required with rule.`);
    }

    let i; let
        required = false;

    for (i = 0; i < args.length; ++i) {
        if (args[i] == field) {
            continue;
        }

        // @ts-ignore
        if (empty(pathIndex(this.inputs, args[i]))) {
            required = true;
            break;
        }
    }

    if (required && empty(value)) {
        return false;
    }

    return true;
};
