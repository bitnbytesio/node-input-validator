const { camelToSentance, snakeToSentance } = require('./str');

/**
 * parse message
 * @param {*} param0
 * @return {string}
 */
module.exports = function messageParser({
  args, attr, value, message = '',
}) {
  let defaultMessage = message;

  // replace attribute name
  if (defaultMessage.indexOf(':attribute') >= 0) {
    // convert camel to sentance and replce _ with space
    let attributeName = attr || '';

    if (attributeName.indexOf('.') < 0) {
      attributeName = camelToSentance(snakeToSentance(attr));
    }

    defaultMessage = defaultMessage.replace(':attribute', attributeName);
  }

  // replace args
  if (defaultMessage.indexOf(':args') >= 0) {
    defaultMessage = defaultMessage.replace(':args', args.toString());
  }

  // find and replace each arg
  for (let i = 0; i < 10; i++) {
    if (defaultMessage.indexOf(`:arg${i}`) >= 0) {
      defaultMessage = defaultMessage.replace(`:arg${i}`, args[i]);
    } else {
      break;
    }
  }


  if (defaultMessage.indexOf(':value') >= 0) {
    /* istanbul ignore next */
    if (typeof value === 'object') {
      defaultMessage = defaultMessage.replace(':value', JSON.stringify(value));
    } else if (typeof value === 'undefined') {
      defaultMessage = defaultMessage.replace(':value', 'undefined');
    } else {
      defaultMessage = defaultMessage.replace(':value', value.toString());
    }
  }

  return defaultMessage;
};
