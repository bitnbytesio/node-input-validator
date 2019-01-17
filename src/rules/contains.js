const v = require('validator');

module.exports = async function contains(field, value, inString) {

    if (!v.contains(value, inString.toString())) {

        return false;
    }

    return true;

}