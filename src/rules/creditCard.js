const isCreditCard = require('validator/lib/isCreditCard').default;


module.exports = async function creditCard(field, value) {
    if (isCreditCard(value)) {
        return true;
    }

    return false;
};
