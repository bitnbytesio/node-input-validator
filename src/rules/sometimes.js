const empty = require('../lib/empty');

module.exports = async function sometimes(field, value) {

    if (!(field in this.inputs)) {
        return true;
    }

    if (empty(value)) {
        return false;
    }

    return true;
}