/**
 * node-input-validator
 * https://github.com/artisangang/node-input-validator
 */

const Validator = require('./src/index');
const messages = require('./src/messages/index');

// main validator class
module.exports = Validator;

/**
 * set default language
 * @param {*} lang
 */
module.exports.setLang = (lang) => {
  messages.defaultLang = lang;
};

/**
 * add custom validation rules
 * @param {string} rule
 * @param {function} func
 */
module.exports.extend = (rule, func) => {
  Validator.rules[rule] = func;
};

/**
 * extend/update validation rule default messages
 * @param {Object} newMessages
 * @param {string} lang
 */
module.exports.messages = (newMessages, lang = 'en') => {
  if (typeof messages[lang] === 'undefined') {
    messages[lang] = {};
  }

  messages[lang] = Object.assign(messages[lang], newMessages);
};

/**
 * add/update your own custom validation messages
 * @param {Object} customMessages
 * @param {string} lang
 */
module.exports.customMessages = (customMessages, lang = 'en') => {
  if (typeof messages[lang] === 'undefined') {
    messages[lang] = {};
  }

  messages[lang].custom = Object.assign(messages[lang].custom || {}, customMessages);
};

/* istanbul ignore next */
module.exports.koa = function koa() {
  return async (ctx, next) => {
    ctx.validationErrors = function validationErrors(errors) {
      return { body: { errors, message: 'The given data is invalid.' } };
    };

    ctx.validate = async function validate(rules, inputs, customMessages) {
      if (!inputs) {
        // eslint-disable-next-line prefer-object-spread
        inputs = Object.assign({}, this.request.body, this.request.files);
      }

      const v = new Validator(
        inputs,
        rules,
        customMessages
      );

      if (await v.fails()) {
        this.throw(422, this.validationErrors(v.errors));
      }

      return v;
    };

    ctx.validator = async function validator(rules, inputs, customMessages) {
      const v = new Validator(
        // eslint-disable-next-line prefer-object-spread
        inputs || Object.assign({}, this.request.body, this.request.files),
        rules,
        customMessages
      );

      return v;
    };


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
};
