const rules = require('./rules/index');
const postRules = require('./postRules/index');
// const filters = require('./filters/index');
const messages = require('./messages/index');
const messageParser = require('./util/messageParser');
const empty = require('./util/empty');
const { strNotations } = require('./util/obj');

// you can change this value with static method
let shouldBreakIfFailed = true;

const implicitRules = [
  'required',
  'requiredIf',
  'requiredNotIf',
  'requiredWith',
  'requiredWithout',
  'accepted',
  'sometimes',
  'nullable',
];

class Validator {
  /**
    * @constructor
    * @param {*} inputs
    * @param {*} validationsRules
    * @param {*} customMessages
    */
  constructor(inputs = {}, validationsRules = {}, customMessages = {}) {
    // inputs collection
    this.inputs = inputs;

    // errors collections
    this.errors = {};

    // post validation collection
    this.postValidations = [];

    // filters collection
    this.filters = {};

    // default language
    this.lang = messages.defaultLang;

    // validation messages for field
    this.customMessages = customMessages;

    // has custom messages
    this.hasCustomMessages = (Object.keys(this.customMessages).length);

    // attribute nice names
    this.attributeNames = {};

    // store validation results
    this.wasFailed = null;

    // break rules validation loop when failed
    this.breakWhenFailed = shouldBreakIfFailed;

    // parse validations collection, this should be after all assignments
    this.parseRules(validationsRules);
  }

  /**
   * globally should break/bail on failed validation or not
   * @param {boolean} sure
   */
  static bailable(sure) {
    shouldBreakIfFailed = sure;
  }

  /**
   * enable/disable multiple errors on current instance only
   * @param {*} sure
   */
  bail(sure) {
    this.breakWhenFailed = sure;
  }

  /**
   * Allows a custom rule to be added as an implicit rule
   * @param {String} ruleName
   */
  static addImplicitRule(ruleName) {
    implicitRules.push(ruleName);
  }

  /**
     * set attributes nice names
     * @param {*} attributeNames
     */
  niceNames(attributeNames) {
    this.attributeNames = attributeNames;
  }

  /**
   * prepare rules to be used
   * @param {*} validationRules
   */
  parseRules(validationRules) {
    // rules collection
    this.validationRules = {};
    // attributes in rules
    const attrs = Object.keys(validationRules);
    // loop through attributes
    attrs.forEach((attr) => {
      if (attr === '*') {
        this.addPostRules(validationRules[attr].split('|'));
        return;
      }

      // get rules from attribute
      const strRules = validationRules[attr];

      // rule blueprint
      const attrRule = {
        name: attr,
        attr,
        value: null,
        rules: [],
        nullable: false,
      };
      let rulesArray = strRules;
      // if array of rules
      if (!Array.isArray(rulesArray)) {
        // get array of rules from string
        rulesArray = (strRules || '').toString()
          .split('|');
      }
      // set rules of attribute
      this.validationRules[attr] = attrRule;

      // parse array of string rules
      rulesArray.forEach((rule) => {
        // split by colon to get rule name and args
        let ruleName;
        let argsStr;
        if (Array.isArray(rule)) {
          [ruleName, ...argsStr] = rule;
        } else if (rule.indexOf(':') !== -1) {
          [ruleName, argsStr] = rule.split(':');
        } else {
          ruleName = rule;
        }
        // if rule is nullable
        if (ruleName === 'nullable') {
          attrRule.nullable = true;
        }

        // parse rule object with name and args
        let parsedRule;

        // if args exists
        if (typeof argsStr !== 'undefined') {
          const ruleArgs = Array.isArray(argsStr) ? argsStr : argsStr.split(',');
          parsedRule = { rule: ruleName, args: ruleArgs };
        } else {
          // in case of no arguments
          parsedRule = { rule: ruleName, args: [] };
        }

        // if rule has greater priority over
        if (implicitRules.indexOf(ruleName) >= 0) {
          attrRule.rules.unshift(parsedRule);
          attrRule.required = true;
        } else {
          attrRule.rules.push(parsedRule);
        }
      });
      // set parse rules of attribute
      this.validationRules[attr] = attrRule;
    });
  }

  /**
   * get errors
   */
  getErrors() {
    return this.errors;
  }

  /**
   * alias for check
   */
  validate() {
    return this.check();
  }

  /**
   * validate inputs
   * @return {Promise.<boolean>}
   */
  async check() {
    // collection of promises
    const validations = [];
    // get keys of rules
    const attributes = Object.keys(this.validationRules);

    const deeplyNestedAttrs = [];

    // loop through each attribute
    attributes.forEach((attr) => {
      if ((attr.match(/\*/g) || []).length > 1 || Array.isArray(this.inputs)) {
        deeplyNestedAttrs.push(attr);
        return;
      }

      validations.push(this.apply(attr));
    });

    if (deeplyNestedAttrs.length) {
      validations.push(this.applyOnDeep(deeplyNestedAttrs));
    }

    this.postValidations.forEach((postRule) => {
      validations.push(this.postApply(postRule));
    });

    // check all promises resolved
    await Promise.all(validations);

    // store results
    this.wasFailed = (Object.keys(this.errors).length);

    return !this.wasFailed;
  }

  /**
   * find attribute value, can also be used to get object value
   * @param {string} attr
   */
  parseValue(attr) {
    const path = attr.split('.');

    // return with value, if attribute is not an Object
    if (path.length === 1) {
      return this.inputs[attr];
    }

    // find attribute value from object
    let value;
    const keySplit = path.filter((e) => e !== '');
    keySplit.map((item) => {
      if (typeof value === 'undefined') {
        value = this.inputs[item];
      } else {
        value = value[item];
      }
      return value;
    });

    if (typeof value === 'undefined') {
      return '';
    }

    return value;
  }

  /**
   * process deeply nested attributes
   * @param {*} attrs
   */
  async applyOnDeep(attrs) {
    const notations = strNotations(this.inputs);

    const validations = [];

    Object.keys(notations).forEach((notation) => {
      attrs.forEach((attr) => {
        const pttren = attr.replace(/\*/g, '[0-9]+');

        const results = notation.match(RegExp(`^${pttren}$`));
        if (results) {
          this.validationRules[notation] = Object.create(this.validationRules[attr]);
          this.validationRules[notation].value = notations[notation];
          this.validationRules[notation].name = notation;

          validations.push(this.apply(notation));
        }
      });
    });

    await Promise.all(validations);
  }

  /**
   * process single levelt nesting
   * @param {*} attr
   */
  parseNestedAttr(attr) {
    const validation = this.validationRules[attr];

    const splitedAttr = validation.name.split('*');

    const startKey = splitedAttr[0];

    const value = this.parseValue(startKey);

    let index = 0;

    Object.keys(value).forEach(() => {
      const absKey = attr.replace('*', index);
      this.validationRules[absKey] = Object.create(validation);
      this.validationRules[absKey].value = this.parseValue(absKey);
      this.validationRules[absKey].name = absKey;
      this.apply(absKey);
      index++;
    });
  }

  /**
   * Apply rule on attribute, rules must be parsed first
   * @param {string} attr
   */
  async apply(attr) {
    // get parse rule of attribute
    const validation = this.validationRules[attr];
    const attrRules = validation.rules;
    const rulesLen = validation.rules.length;
    // if not, return
    if (!rulesLen) return;

    // if attribute is nested
    if (attr.indexOf('*') >= 0) {
      this.parseNestedAttr(attr);
      return;
    }

    // collection of async rules
    const rulesPromise = [];
    const rulesPromiseProps = [];

    // loop all rules
    for (let r = 0; r < rulesLen; r++) {
      const { rule, args } = attrRules[r];

      // get value
      validation.value = this.parseValue(attr);

      // return if nullable or value is null
      if (rule === 'nullable' || (validation.nullable === true && validation.value === null)) {
        continue;
      }
      // in case rule not found
      if (typeof rules[rule] !== 'function') {
        throw new Error(`Validation Rule: ${rule} does not exists.`);
      }

      // if value is really empty, skip validation
      if (!validation.required && empty.reallyEmpty(validation.value)) {
        continue;
      }

      // call rule method
      const result = rules[rule]({ attr, value: validation.value, args }, this);
      // if promise, add to async rules collection
      if (result instanceof Promise) {
        // result = await result;
        rulesPromise.push(result);
        rulesPromiseProps.push({ rule, args });
        continue;
      }
      if (result && implicitRules.indexOf(validation.rules[r].rule) > 0) {
        // eslint-disable-next-line no-param-reassign
        validation.required = false;
      }

      // if validtion failed, get message
      if (!result) {
        const message = this.getParsedMessage({
          rule,
          args,
          attr: validation.attr,
          value: validation.value,
        });
        if (this.breakWhenFailed) {
          // add error
          this.addError(attr, rule, message);
          return;
        }
        this.appendError(attr, rule, message);
      }
    } // rules loop ends here

    if (rulesPromise.length) {
      const asyncResults = await Promise.all(rulesPromise);
      let promiseIndex = 0;
      asyncResults.every((result) => {
        const { rule, args } = rulesPromiseProps[promiseIndex];
        // if validtion failed, get message
        if (!result) {
          const message = this.getParsedMessage({
            rule,
            args,
            attr: validation.attr,
            value: validation.value,
          });
          if (this.breakWhenFailed) {
            // add error
            this.addError(attr, rule, message);
            return false;
          }
          this.appendError(attr, rule, message);
        }
        promiseIndex++;
        return true;
      });
    }
  }

  async postApply(rule) {
    if (rule.rule === 'function') {
      // eslint-disable-next-line no-return-await
      return await rule.handler(this);
    }

    // eslint-disable-next-line no-return-await
    return await postRules[rule.rule](rule, this);
  }

  /**
  * add post rule
  *
  * post rule is applied to whole input and is used to check constraints
  * across multiple fields
  *
  * @param {*} rule
 */
  addPostRule(rule) {
    if (typeof rule === 'function') {
      this.postValidations.push({
        rule: 'function',
        handler: rule,
      });
      return;
    }

    const ruleArray = rule.split(':', 2);
    const ruleName = ruleArray[0];
    const ruleFields = ruleArray[1].split(','); // there always be a list of fields
    // // eslint-disable-next-line no-return-assign
    // const values = ruleFields.reduce((acc, field) => {
    //   acc[field] = this.parseValue(field);
    //   return [acc[field], acc];
    // }, {});

    this.postValidations.push({
      rule: ruleName,
      params: ruleFields,
    });
  }

  /**
   * add set of post rules
   *
   * @param {string[]} postRulesObj
   */
  addPostRules(postRulesObj) {
    postRulesObj.map((rule) => this.addPostRule(rule));
  }

  /**
   * parse message for rule
   * @param {{rule, args?:[], attr, value, useDefaultMessage?}} args
   */
  getParsedMessage({
    rule,
    args = [],
    attr,
    value,
    useDefaultMessage = true,
  }) {
    /**
    * 1. check for attribute.rule
    * 2. check for rule
    * 3. check for attribute
    * 4. fallback to default message
    */
    let attributeName = attr;
    let message;

    const defaultMessage = messages[this.lang].$default || 'The :attribute value is malformed.';

    // check for local scope messages
    if (this.hasCustomMessages) {
      message = this.customMessages[`${attr}.${rule}`]
        || this.customMessages[attr]
        || this.customMessages[rule];
    }

    // not found in local scope, check for global scope
    if (!message) {
      // from global messages bucket
      messages[this.lang].$custom = messages[this.lang].$custom || {};
      // message.$custom['attribute.rule']
      message = messages[this.lang].$custom[`${attr}.${rule}`]
        // message.$custom.rule
        || messages[this.lang].$custom[rule]
        // message.$custom.attr
        || messages[this.lang].$custom[attr]
        // message.rule
        || messages[this.lang][rule];

      if (useDefaultMessage && !message) {
        message = defaultMessage;
      }
    }

    // global attribute name
    if (messages[this.lang].$niceNames && messages[this.lang].$niceNames[attr]) {
      attributeName = messages[this.lang].$niceNames[attr];
    }

    // check if attribute has some nice name in local scope
    if (this.attributeNames[attr]) {
      attributeName = this.attributeNames[attr];
    }

    return messageParser({
      rule,
      args,
      attr: attributeName,
      value,
      message,
    });
  }

  /**
   * parse existing message only
   * @param {*} args
   */
  getExistinParsedMessage({
    rule,
    args = [],
    attr,
    value,
  }) {
    /**
    * 1. check for attribute.rule
    * 2. check for rule
    * 3. check for attribute
    * 4. fallback to default message
    */

    return this.getParsedMessage({
      rule,
      args,
      attr,
      value,
      useDefaultMessage: false,
    });
  }

  /**
   *
   * @param {string} key
   * @param {string} rule
   * @param {string} message
   */
  error(key, rule, message) {
    if (this.breakWhenFailed) {
      this.addError(key, rule, message);
      return;
    }
    this.appendError(key, rule, message);
  }

  /**
    * add error
    * @param {string} key
    * @param {string} rule
    * @param {string} message
    */
  addError(key, rule, message) {
    this.errors[key] = {
      message,
      rule,
    };
  }

  /**
   * append errors
   * @param {string} key
   * @param {string} rule
   * @param {string} message
   */
  appendError(key, rule, message) {
    if (!this.errors[key]) {
      this.errors[key] = [];
    }

    this.errors[key].push({ message, rule });
  }

  /**
  * check for validation fails
  * @return {Promise}
  */
  async fails() {
    return !(await this.check());
  }

  /**
   * check if validation passes
   * @return {Promise}
   */
  passes() {
    return this.check();
  }
}

module.exports = Validator;
