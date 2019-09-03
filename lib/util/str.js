exports.camelToSentance = function camelToSentance(str) {
  return str.replace(/([A-Z]+)/g, ' $1').trimLeft().toLowerCase();
};

exports.snakeToSentance = function snakeToSentance(str) {
  return str.replace(/_/g, ' ');
};

exports.trim = function trim(string, char = ' ') {
  let str = string;

  if (str.charAt(0) === char) {
    str = str.substr(1, str.length);
  }

  const len = str.length;

  if (str.charAt(len - 1) === char) {
    str = str.substr(0, len - 1);
  }

  return str.toString();
};
