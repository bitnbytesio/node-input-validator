exports.camelToSentance = function camelToSentance(str) {
  return str.replace(/([A-Z]+)/g, ' $1').trimStart().toLowerCase();
};

exports.snakeToSentance = function snakeToSentance(str) {
  return str.replace(/_/g, ' ');
};
