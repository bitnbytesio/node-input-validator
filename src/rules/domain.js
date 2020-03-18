const isFQDN = require('validator/lib/isFQDN').default;

module.exports = async function domain(field, value) {
    return isFQDN(value);
};
