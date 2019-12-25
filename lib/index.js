const messages = require('./messages/index');
const rules = require('./rules/index');
const Validator = require('./validator');

/**
* set default language
* @param {*} lang
*/
function setLang(lang) {
  messages.defaultLang = lang;
}

function extend(name, callback) {
  rules[name] = callback;
}

/**
* extend/update validation rule default messages
* @param {Object} newMessages
* @param {string} lang
*/
function extendMessages(newMessages, lang = 'en') {
  if (typeof messages[lang] === 'undefined') {
    messages[lang] = {};
  }
  messages[lang] = Object.assign(messages[lang], newMessages);
}

/**
 * add/update your own custom validation messages
 * @param {*} customMessages
 * @param {*} lang
 */
function addCustomMessages(customMessages, lang = 'en') {
  if (typeof messages[lang] === 'undefined') {
    messages[lang] = {};
  }
  messages[lang].$custom = Object.assign(messages[lang].$custom || {}, customMessages);
}

function niceNames(attributes, lang = 'en') {
  messages[lang].$niceNames = Object.assign(messages[lang].$niceNames || {}, attributes);
}

/* istanbul ignore next */
function koa() {
  return async (ctx, next) => {
    // @ts-ignore
    ctx.validationErrors = function validationErrors(errors) {
      return {
        body: {
          message: 'The given data is invalid.',
          errors,
        },
      };
    };

    ctx.validate = async function validate(rulesArray, inputs, useMessages) {
      const v = new Validator(
        inputs || { ...this.request.body, ...this.request.files },
        rulesArray || {},
        useMessages || {},
      );

      if (await v.fails()) {
        this.throw(422, this.validationErrors(v.errors));
      }

      return v;
    };

    ctx.validator = (inputs, rulesArray, useMessages) => new Validator(
      inputs || { ...this.request.body, ...this.request.files },
      rulesArray || {},
      useMessages || {},
    );

    try {
      await next();
    } catch (err) {
      if (err.status && err.status === 422) {
        ctx.type = 'json';
        ctx.status = 422;
        ctx.body = err.body;
        return;
      }
      throw err;
    }
  };
}

/**
 * enable/disable multiple errors output
 * @param {boolean} sure
 */
function bailable(sure) {
  Validator.bailable(sure);
}

function assert(validationRules) {
  Object.keys(validationRules).forEach((key) => {
    const rawRules = validationRules[key];
    let arrayRules = [];
    if (Array.isArray(rawRules)) {
      arrayRules = rawRules;
    } else {
      rawRules.split('|').forEach((raw) => {
        const [ruleName] = raw.split(':');
        arrayRules.push(ruleName);
      });
    }
    arrayRules.forEach((rule) => {
      if (typeof rules[rule] !== 'function') {
        throw new Error(`Rule ${rule} used for attribute ${key} is invalid.`);
      }
    });
  });

  return validationRules;
}

module.exports = {
  Validator,
  setLang,
  extend,
  extendMessages,
  addCustomMessages,
  niceNames,
  koa,
  bailable,
  assert,
};
