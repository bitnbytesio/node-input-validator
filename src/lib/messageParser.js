const messages = require('../messages/index');
const {camelToSentance, snakeToSentance} = require('./str');

/**
 * parse message
 * @param {*} param0
 * @return {string}
 */
module.exports = function messageParser({V, rule, field, value, args, defaultMessage = null}) {
  /**
     * 1. check for attribute.rule
     * 2. check for rule
     * 3. check for attribute
     * 4. fallback to default message
     */

  let message;

  if (defaultMessage === null) {
    defaultMessage = messages[V.lang]._default || 'The :attribute value is malformed.';
  }

  if (V.hasCustomMessages) {
    message = V.customMessages[field + '.' + rule] ||
      V.customMessages[rule] ||
      V.customMessages[field];
  }


  if (!message) {
    message = messages[V.lang].custom && messages[V.lang].custom[field + '.' + rule] ||
      messages[V.lang][rule] ||
      messages[V.lang].custom && messages[V.lang].custom[field] || defaultMessage;
  }

  // replace attribute name
  if (message.indexOf(':attribute') >= 0) {
    // convert camel to sentance and replce _ with space
    let attributeName = field;

    if (attributeName.indexOf('.') < 0) {
      attributeName = camelToSentance(snakeToSentance(field));
    }

    // check if attribute has some nice name
    if (V.attributeNames[field]) {
      attributeName = V.attributeNames[field];
    }

    message = message.replace(':attribute', attributeName);
  }

  // replace args
  if (message.indexOf(':args') >= 0) {
    message = message.replace(':args', args.toString());
  }

  // convert args to array
  if (!Array.isArray(args)) {
    args = [args];
  }

  // find and replace each arg
  for (let i = 0; i < 10; i++) {
    if (message.indexOf(':arg' + i) >= 0) {
      message = message.replace(':arg' + i, args[i]);
    } else {
      break;
    }
  }


  if (message.indexOf(':value') >= 0) {
    /* istanbul ignore next */
    if (typeof value === 'object') {
      message = message.replace(':value', JSON.stringify(V.validations[field].value));
    } else if (typeof V.validations[field].value === 'undefined') {
      message = message.replace(':value', 'undefined');
    } else {
      message = message.replace(':value', V.validations[field].value.toString());
    }
  }

  return message;
};
