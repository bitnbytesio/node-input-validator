const isLatLong = require('validator/lib/isLatLong').default;

module.exports = async function latLong(field, value) {
    if (isLatLong(value)) {
        return true;
    }

    return false;
};
