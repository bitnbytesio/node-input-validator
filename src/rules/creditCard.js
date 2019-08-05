const v = require('validator');


module.exports = async function creditCard(field, value) {
  if (v.isCreditCard(String(value))) {
    return true;
  }

  return false;
};
