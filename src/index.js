/* eslint-disable no-restricted-syntax */
const rules = require('./rules/index');
const postRules = require('./postRules/index');
const messages = require('./messages/index');
const { applyRules, implicitRules, applyPostRules } = require('./validator');
const empty = require('./lib/empty');
// const filters = require('./filters/index');

const messageParser = require('./lib/messageParser');

/**
 * @class Validator
 */
class Validator {
  /**
     * @constructor
     * @param {*} inputs
     * @param {*} validationsRules
     * @param {*} customMessages
     */
  constructor(inputs, validationsRules, customMessages = {}) {
    // errors collections
    this.errors = {};

    // validations collection
    this.validations = {};

    // filters collection
    this.filters = {};

    // default language
    this.lang = messages.defaultLang;

    // post validations collection
    this.postValidations = [];

    // inputs collection
    this.inputs = inputs;

    // // for top level array support
    // if (Array.isArray(inputs)) {
    //   this.inputs = { ...inputs };
    // }

    // filter inputs collection
    this.filterInputs = {};

    // validation messages for field
    this.customMessages = customMessages;

    this.hasCustomMessages = false;

    if (Object.keys(this.customMessages).length) {
      this.hasCustomMessages = true;
    }

    // parse rules
    this.parseRules(validationsRules);

    this.attributeNames = {};
  }

  /**
     * set attributes nice names
     * @param {*} niceNames
     */
  setAttributeNames(niceNames) {
    this.attributeNames = niceNames;
  }

  /**
     * make validator for arrya rules
     * @param {*} inputs
     * @param {*} validationRules
     * @param {*} customMessages
     * @return {Validator}
     */
  static make(inputs, validationRules, customMessages = {}) {
    const v = new Validator(inputs, {}, customMessages);

    v.makeValidationsFromArray(validationRules);

    return v;
  }

  /**
     * create validator
     * @param {*} validationRules
     * @param {*} customMessages
     * @return {Validator}
     */
  /* istanbul ignore next */
  static create(validationRules, customMessages = {}) {
    /* istanbul ignore next */
    return new Validator({}, rules, customMessages);
  }

  /**
     * apply rules on custom inputs
     * @param {*} inputs
     */
  async apply(inputs) {
    /* istanbul ignore next */
    const v = new Validator(inputs, {});
    /* istanbul ignore next */
    v.validations = this.validations;
    /* istanbul ignore next */
    v.postValidations = this.postValidations;
    /* istanbul ignore next */
    return v;
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

  /* istanbul ignore next */
  /**
     * set before/after filters
     * @param {*} filters
     * @param {*} filterInputs
     */
  static filter(filters, filterInputs) {
    /* istanbul ignore next */
    this.filters = filters;
    /* istanbul ignore next */
    this.filterInputs = filterInputs;
  }

  /**
   * set default language for session only
   * @param {*} lang
   */
  setLang(lang) {
    this.lang = lang;
  }

  /* istanbul ignore next */
  /**
   * check if given value is empty or not
   * @param {*} value
   * @return {boolean}
   */
  isEmpty(value) {
    return empty(value);
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
        params: rule,
        values: this.inputs,
      });
      return;
    }

    rule = rule.split(':', 2);
    const ruleName = rule[0];
    const ruleFields = rule[1].split(','); // there always be a list of fields
    // eslint-disable-next-line no-return-assign
    const values = ruleFields.reduce((acc, field) => {
      acc[field] = this.parseKey(field, this.inputs);
      return [acc[field], acc];
    }, {});

    this.postValidations.push({
      rule: ruleName,
      params: ruleFields,
      values,
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
   * validate inputs
   * @return {Promise.<boolean>}
   */
  async check() {
    const validations = [];

    // console.log(this.validations);

    for (const i in this.validations) {
      if (this.validations.hasOwnProperty(i)) {
        validations.push(this.evaluteInputs(this.validations[i]));
      }
    }

    for (const j in this.postValidations) {
      if (this.postValidations.hasOwnProperty(j)) {
        validations.push(this.evaluteInputsPostValidation(this.postValidations[j]));
      }
    }

    if (validations.length) {
      await Promise.all(validations);
    }

    return !((this.errors && Object.keys(this.errors) && Object.keys(this.errors).length));
  }

  /**
     * validate input against rule
     * @param {*} field
     * @return {Promise.<void>}
     */
  async evaluteInputs(field) {
    if (field.rules.length) {
      await applyRules(field, this);
    }
  }

  /**
     * validate input as a whole against post rule
     * @param {*} rule
     * @return {Promise.<void>}
     */
  async evaluteInputsPostValidation(rule) {
    await applyPostRules(rule, this);
  }

  /**
     * split by dot
     * @param {string} key
     * @param {*} data
     * @return {*}
     */
  parseKey(key, data) {
    let value;
    // let self = this;

    const keySplit = key.split('.').filter((e) => e !== '');

    // console.log('Key Split', keySplit);

    keySplit.map((item) => {
      if (typeof value === 'undefined') {
        value = data && data[item];
      } else {
        value = value[item];
      }
    });


    if (value === null) {
      return value;
    }

    switch (typeof value) {
      case 'string':
        value = value.trim();
        break;

      case 'undefined':
        value = '';
        break;
    }

    return value;
  }

  /**
     * parse input value
     * @param {*} field
     * @param {*} multiple
     * @return {*}
     */
  inputVal(field, multiple = false) {
    // let val = this.inputs[field] || '';

    if (multiple === true) {
      this.parseKey(field, this.inputs);
    }

    return this.parseKey(field, this.inputs);
  }

  /**
     *
     * @param {*} rulesToParse
     * @return {*}
     */
  parseRules(rulesToParse) {
    if (!rulesToParse || !Object.keys(rulesToParse).length) {
      return;
    }


    let rsplit;
    let argsplit;
    let args;
    let field;

    // here r is field name
    for (field in rulesToParse) {
      if (!rulesToParse.hasOwnProperty(field)) {
        continue;
      }
      // console.log('rules->', r);

      let multipleFields = -1;

      if (field === '*') {
        this.addPostRules(rulesToParse[field].split('|'));
        return;
      }

      // console.log('in loop', field);

      if (!this.validations[field]) {
        multipleFields = field.indexOf('*');

        this.validations[field] = {
          field,
          multiple: (multipleFields >= 0),
          path: field.split('.'),
          required: false,
          nullable: false,
          rules: [],
        };
      }

      rsplit = rulesToParse[field].toString().split('|');

      let rs;

      for (rs in rsplit) {
        if (!rsplit.hasOwnProperty(rs)) {
          continue;
        }
        argsplit = rsplit[rs].split(':');
        if (typeof argsplit[1] !== 'undefined') {
          args = argsplit[1].split(',');
          this.rule = { rule: argsplit[0], args: (args.length > 1) ? args : args[0] };
        } else {
          this.rule = { rule: argsplit[0] };
        }

        if (this.rule.rule === 'nullable') {
          this.validations[field].nullable = true;
        }

        this.populateRule(field);
      }
    }

    // console.log(JSON.stringify(this.validations, null, 2));
  }

  /**
     * make rules from array
     * @param {*} arrayRules
     * @return {*}
     */
  makeValidationsFromArray(arrayRules) {
    if (!arrayRules || !Object.keys(arrayRules).length) {
      return;
    }

    let field; let fieldRule;

    // here r is field name
    // eslint-disable-next-line no-restricted-syntax
    for (field in arrayRules) {
      if (!arrayRules.hasOwnProperty(field)) {
        continue;
      }

      // const fieldWithIndex = [];
      let multipleFields = 0;

      if (field === '*') {
        this.addPostRules(arrayRules[field]);
        return;
      }

      // console.log('in loop', field);

      if (!this.validations[field]) {
        multipleFields = field.indexOf('*');

        this.validations[field] = {
          field,
          multiple: (multipleFields > 0),
          path: field.split('.'),
          required: false,
          rules: [],
        };
      }


      // eslint-disable-next-line no-restricted-syntax
      for (fieldRule of arrayRules[field]) {
        let args = [];

        if (fieldRule instanceof Array) {
          args = fieldRule;
          fieldRule = fieldRule.splice(0, 1).toString();
        }

        this.rule = { rule: fieldRule, args: (args.length === 1) ? args[0] : args };

        this.populateRule(field);
      }
    }
  }

  /**
     * re-arrange rules
     * @param{*} field
     */
  populateRule(field) {
    // console.log('filed and rule in populate rules', field, rule);

    if (implicitRules.indexOf(this.rule.rule) >= 0) {
      this.validations[field].rules.unshift(this.rule);
      this.validations[field].required = true;
    } else {
      this.validations[field].rules.push(this.rule);
    }

    this.rule = {};
  }

  /**
     *
     * @param {*} rule
     * @param {*} field
     * @param {*} value
     * @param {*} args
     * @return {string}
     */
  parseMessage(rule, field, value, args) {
    return messageParser({
      V: this, rule, field, value, args,
    });
  }

  /**
    *  this is only used in testing
    * @param {*} rule
    * @param {*} field
    * @param {*} value
    * @param {*} args
    * @return {*}
    */
  parseExistingMessageOnly(rule, field, value, args) {
    /* istanbul ignore next */
    return messageParser({
      V: this, rule, field, value, args, defaultMessage: `Message is missing for rule ${rule}`,
    });
  }
}

module.exports = Validator;
module.exports.rules = rules;
module.exports.postRules = postRules;
