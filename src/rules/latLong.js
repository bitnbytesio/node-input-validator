const v = require('validator');

module.exports = async function latLong(field, value) {

    if (v.isLatLong(value)) {

        return true;
    }

    return false;

}