"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* eslint-disable array-callback-return */
// @ts-nocheck

/* eslint-disable no-underscore-dangle */

/* eslint-disable no-mixed-operators */

/* eslint-disable no-plusplus */

/* eslint-disable no-unused-vars */

/* eslint-disable no-sequences */

/* eslint-disable no-return-assign */

/* eslint-disable consistent-return */

/* eslint-disable eqeqeq */

/* eslint-disable default-case */

/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */

/* eslint-disable guard-for-in */

/* eslint-disable no-param-reassign */

/* eslint-disable no-shadow */
var rules = require('./rules');

var rulesDefinition = require('./rulesDefinition/rulesDefinition');

var transform = require('./transform/transform');

var postRules = require('./postRules');

var messages = require('./messages');

var _require = require('./validator'),
    applyRules = _require.applyRules,
    implicitRules = _require.implicitRules,
    applyPostRules = _require.applyPostRules;

var empty = require('./lib/empty');

var filters = require('./filters');
/**
 * @class Validator
 */


var Validator = /*#__PURE__*/function () {
  /**
   * @constructor
   * @param {*} inputs
   * @param {*} rules
   * @param {*} customMessages
   */
  function Validator(inputs, rules) {
    var customMessages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2["default"])(this, Validator);
    // errors collections
    this.errors = {}; // validations collection

    this.validations = {}; // filters collection

    this.filters = {}; // default language

    this.lang = messages.defaultLang; // post validations collection

    this.postValidations = []; // inputs collection

    this.inputs = inputs; // filter inputs collection

    this.filterInputs = {}; // validation messages for field

    this.customMessages = customMessages;
    this.hasCustomMessages = false;

    if (Object.keys(this.customMessages).length) {
      this.hasCustomMessages = true;
    } // parse rules


    this.parseRules(rules);
  }
  /**
   * make validator for arrya rules
   * @param {*} inputs
   * @param {*} rules
   * @param {*} messages
   */


  (0, _createClass2["default"])(Validator, [{
    key: "apply",

    /**
     * apply rules on custom inputs
     * @param {*} inputs
     */

    /* istanbul ignore next */
    value: function () {
      var _apply = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(inputs) {
        var v;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                v = new Validator(inputs, {});
                v.validations = this.validations;
                v.postValidations = this.postValidations;
                return _context.abrupt("return", v);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function apply(_x) {
        return _apply.apply(this, arguments);
      }

      return apply;
    }()
    /**
     * check for validation fails
     */

  }, {
    key: "fails",
    value: function () {
      var _fails = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.check();

              case 2:
                return _context2.abrupt("return", !_context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fails() {
        return _fails.apply(this, arguments);
      }

      return fails;
    }()
    /**
     * check if validation passes
     */

  }, {
    key: "passes",
    value: function () {
      var _passes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.check());

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function passes() {
        return _passes.apply(this, arguments);
      }

      return passes;
    }()
    /**
     * set before/after filters
     * @param {*} filters
     * @param {*} filterInputs
     */

    /* istanbul ignore next */

  }, {
    key: "setLang",

    /**
     * set default language for session only
     * @param {*} lang
     */
    value: function setLang(lang) {
      this.lang = lang;
    }
    /**
     * check if given value is empty or not
     * @param {*} value
     * @returns {boolean}
     */

  }, {
    key: "isEmpty",
    value: function isEmpty(value) {
      return empty(value);
    }
    /**
     * add error
     * @param key
     * @param rule
     * @param message
     */

  }, {
    key: "addError",
    value: function addError(key, rule, message) {
      this.errors[key] = {
        message: message,
        rule: rule
      };
    }
    /**
     * add post rule
     *
     * post rule is applied to whole input and is used to check constraints
     * across multiple fields
     *
     * @param rule
    */

  }, {
    key: "addPostRule",
    value: function addPostRule(rule) {
      var _this = this;

      if (typeof rule === 'function') {
        this.postValidations.push({
          rule: 'function',
          params: rule,
          values: this.inputs
        });
        return;
      }

      rule = rule.split(':', 2);
      var ruleName = rule[0];
      var ruleFields = rule[1].split(','); // there always be a list of fields

      var values = ruleFields.reduce(function (acc, field) {
        return acc[field] = _this.parseKey(field, _this.inputs), acc;
      }, {});
      this.postValidations.push({
        rule: ruleName,
        params: ruleFields,
        values: values
      });
    }
    /**
     * add set of post rules
     *
     * @param rules {string[]}
     */

  }, {
    key: "addPostRules",
    value: function addPostRules(rules) {
      var _this2 = this;

      rules.map(function (rule) {
        return _this2.addPostRule(rule);
      });
    }
    /**
     * validate inputs
     * @returns {Promise.<boolean>}
     */

  }, {
    key: "check",
    value: function () {
      var _check = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var validations, i, j;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                validations = []; // console.log(this.validations);

                _context4.t0 = _regenerator["default"].keys(this.validations);

              case 2:
                if ((_context4.t1 = _context4.t0()).done) {
                  _context4.next = 11;
                  break;
                }

                i = _context4.t1.value;
                _context4.t2 = validations;
                _context4.next = 7;
                return this.evaluteInputs(this.validations[i]);

              case 7:
                _context4.t3 = _context4.sent;

                _context4.t2.push.call(_context4.t2, _context4.t3);

                _context4.next = 2;
                break;

              case 11:
                _context4.t4 = _regenerator["default"].keys(this.postValidations);

              case 12:
                if ((_context4.t5 = _context4.t4()).done) {
                  _context4.next = 21;
                  break;
                }

                j = _context4.t5.value;
                _context4.t6 = validations;
                _context4.next = 17;
                return this.evaluteInputsPostValidation(this.postValidations[j]);

              case 17:
                _context4.t7 = _context4.sent;

                _context4.t6.push.call(_context4.t6, _context4.t7);

                _context4.next = 12;
                break;

              case 21:
                if (!validations.length) {
                  _context4.next = 24;
                  break;
                }

                _context4.next = 24;
                return validations;

              case 24:
                return _context4.abrupt("return", !(this.errors && Object.keys(this.errors) && Object.keys(this.errors).length));

              case 25:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function check() {
        return _check.apply(this, arguments);
      }

      return check;
    }()
    /**
     * validate input against rule
     * @param {*} field
     * @returns {Promise.<void>}
     */

  }, {
    key: "evaluteInputs",
    value: function () {
      var _evaluteInputs = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(field) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!field.rules.length) {
                  _context5.next = 3;
                  break;
                }

                _context5.next = 3;
                return applyRules(field, this);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function evaluteInputs(_x2) {
        return _evaluteInputs.apply(this, arguments);
      }

      return evaluteInputs;
    }()
    /**
     * validate input as a whole against post rule
     * @param rule
     * @returns {Promise.<void>}
     */

  }, {
    key: "evaluteInputsPostValidation",
    value: function () {
      var _evaluteInputsPostValidation = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(rule) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return applyPostRules(rule, this);

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function evaluteInputsPostValidation(_x3) {
        return _evaluteInputsPostValidation.apply(this, arguments);
      }

      return evaluteInputsPostValidation;
    }()
    /**
     * split by dot
     * @param key
     * @param data
     * @returns {*}
     */

  }, {
    key: "parseKey",
    value: function parseKey(key, data) {
      var value; // let self = this;

      var keySplit = key.split('.').filter(function (e) {
        return e !== '';
      }); // console.log('Key Split', keySplit);

      keySplit.map(function (item) {
        if (typeof value === 'undefined') {
          value = data && data[item];
        } else {
          value = value[item];
        }
      });

      if (value === null) {
        return value;
      }

      switch ((0, _typeof2["default"])(value)) {
        case 'string':
          // @ts-ignore
          value = value.trim();
          break;

        case 'boolean':
          value = String(value);
          break;

        case 'number':
          value = String(value);
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
     */

  }, {
    key: "inputVal",
    value: function inputVal(field) {
      var multiple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      // let val = this.inputs[field] || '';
      if (multiple == true) {
        this.parseKey(field, this.inputs);
      }

      return this.parseKey(field, this.inputs);
    }
    /**
     *
     * @param {*} rules
     */

  }, {
    key: "parseRules",
    value: function parseRules(rules) {
      if (!rules || !Object.keys(rules).length) {
        return;
      }

      var rsplit;
      var argsplit;
      var args;
      var field; // here r is field name

      for (field in rules) {
        // console.log('rules->', r);
        var multipleFields = -1;

        if (field === '*') {
          return this.addPostRules(rules[field].split(/\|\s*(?![^()]*\))/));
        } // console.log('in loop', field);


        if (!this.validations[field]) {
          multipleFields = field.indexOf('*');
          this.validations[field] = {
            field: field,
            multiple: multipleFields > 0,
            path: field.split('.'),
            required: false,
            nullable: false,
            rules: []
          };
        }

        if (Array.isArray(rules[field])) {
          rsplit = rules[field];
        } else {
          rsplit = rules[field].split(/\|\s*(?![^()]*\))/);
        }

        var _iterator = _createForOfIteratorHelper(rsplit),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var ruleArg = _step.value;
            argsplit = ruleArg.split(':');

            if (typeof argsplit[1] !== 'undefined') {
              args = argsplit[1].split(',');
              this.rule = {
                rule: argsplit[0],
                args: args.length > 1 ? args : args[0]
              };
            } else {
              this.rule = {
                rule: argsplit[0]
              };
            }

            if (this.rule.rule == 'nullable') {
              this.validations[field].nullable = true;
            }

            this.populateRule(field);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } // console.log(JSON.stringify(this.validations, null, 2));

    }
    /**
     * make rules from array
     * @param {*} rules
     */

  }, {
    key: "makeValidationsFromArray",
    value: function makeValidationsFromArray(rules) {
      if (!rules || !Object.keys(rules).length) {
        return;
      }

      var field;
      var fieldRule; // here r is field name

      for (field in rules) {
        var fieldWithIndex = [];
        var multipleFields = 0;

        if (field === '*') {
          return this.addPostRules(rules[field]);
        } // console.log('in loop', field);


        if (!this.validations[field]) {
          multipleFields = field.indexOf('*');
          this.validations[field] = {
            field: field,
            multiple: multipleFields > 0,
            path: field.split('.'),
            required: false,
            rules: []
          };
        }

        var _iterator2 = _createForOfIteratorHelper(rules[field]),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            fieldRule = _step2.value;
            var args = [];

            if (fieldRule instanceof Array) {
              args = fieldRule;
              fieldRule = fieldRule.splice(0, 1).toString();
            }

            this.rule = {
              rule: fieldRule,
              args: args.length == 1 ? args[0] : args
            };
            this.populateRule(field);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
    /**
     * re-arrange rules
     * @param field
     */

  }, {
    key: "populateRule",
    value: function populateRule(field) {
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
     */

  }, {
    key: "parseMessage",
    value: function parseMessage(rule, field, value, args) {
      /**
       * 1. check for attribute.rule
       * 2. check for rule
       * 3. check for attribute
       * 4. fallback to default message
       */
      var message;
      var defaultMessage = messages[this.lang]._default || 'The :attribute value is malformed.';

      if (this.hasCustomMessages) {
        message = this.customMessages["".concat(field, ".").concat(rule)] || this.customMessages[rule] || this.customMessages[field];
      }

      if (!message) {
        message = messages[this.lang].custom && messages[this.lang].custom["".concat(field, ".").concat(rule)] || messages[this.lang][rule] || messages[this.lang].custom && messages[this.lang].custom[field] || defaultMessage;
      }

      if (message.indexOf(':attribute') !== -1) {
        message = message.replace(':attribute', field);
      }

      if (message.indexOf(':args') !== -1) {
        message = message.replace(':args', args.toString());
      }

      if (!Array.isArray(args)) {
        args = [args];
      }

      for (var i = 0; i < 10; i++) {
        if (message.indexOf(":arg".concat(i)) >= 0) {
          message = message.replace(":arg".concat(i), args[i]);
        } else {
          break;
        }
      } // } else {
      //     message = message.replace(':arg0', args).replace(':arg', args);
      // }


      if (message.indexOf(':value') !== -1) {
        if ((0, _typeof2["default"])(value) === 'object') {
          message = message.replace(':value', JSON.stringify(this.validations[field].value));
        } else if (typeof this.validations[field].value === 'undefined') {
          message = message.replace(':value', 'undefined');
        } else {
          message = message.replace(':value', this.validations[field].value.toString());
        }
      }

      return message.replace('_', ' ');
    }
    /**
    *  this is only used in testing
    * @param {*} rule
    * @param {*} field
    * @param {*} value
    * @param {*} args
    */

    /* istanbul ignore next */

  }, {
    key: "parseExistingMessageOnly",
    value: function parseExistingMessageOnly(rule, field, value, args) {
      var message = messages[this.lang].custom["".concat(field, ".").concat(rule)] || messages[this.lang][rule] || messages[this.lang].custom[field] || "Messages is missing for rule ".concat(rule);

      if (message.indexOf(':attribute') !== -1) {
        message = message.replace(':attribute', field);
      }

      if (message.indexOf(':args') !== -1) {
        message = message.replace(':args', args.toString());
      }

      if (!Array.isArray(args)) {
        args = [args];
      }

      for (var i = 0; i < 10; i++) {
        if (message.indexOf(":arg".concat(i)) >= 0) {
          message = message.replace(":arg".concat(i), args[i]);
        } else {
          break;
        }
      } // } else {
      //     message = message.replace(':arg0', args).replace(':arg', args);
      // }


      if (message.indexOf(':value') !== -1) {
        if ((0, _typeof2["default"])(value) === 'object') {
          message = message.replace(':value', JSON.stringify(value));
        } else if (typeof value === 'undefined') {
          message = message.replace(':value', 'undefined');
        } else {
          message = message.replace(':value', value.toString());
        }
      }

      return message.replace('_', ' ');
    }
  }], [{
    key: "make",
    value: function make(inputs, rules) {
      var messages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var v = new Validator(inputs, {}, messages);
      v.makeValidationsFromArray(rules);
      return v;
    }
    /**
     * create validator
     * @param {*} rules
     * @param {*} messages
     */

    /* istanbul ignore next */

  }, {
    key: "create",
    value: function create(rules) {
      var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Validator({}, rules, messages);
    }
  }, {
    key: "filter",
    value: function filter(filters, filterInputs) {
      this.filters = filters;
      this.filterInputs = filterInputs;
    }
  }]);
  return Validator;
}();

module.exports = Validator;
module.exports.rules = rules;
module.exports.rulesDefinition = rulesDefinition;
module.exports.transform = transform;
module.exports.postRules = postRules;