const isMACAddress = require('validator/lib/isMACAddress').default;

module.exports = async function macAddress(field, value) {
    return isMACAddress(value);
};
