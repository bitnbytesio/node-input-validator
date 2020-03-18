const isMobilePhone = require('validator/lib/isMobilePhone').default;

module.exports = async function phoneNumber(field, value) {
    // @ts-ignore
    return isMobilePhone(value);
};
