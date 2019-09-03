const v = require('validator');

module.exports = function base64({ value }) {
  if (v.isBase64(String(value))) {
    return true;
  }

  return false;
};
