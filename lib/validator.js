"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable no-plusplus */

/* eslint-disable no-param-reassign */

/* eslint-disable no-await-in-loop */

/* eslint-disable eqeqeq */

/* eslint-disable no-continue */

/* eslint-disable no-restricted-syntax */
// @ts-ignore
var validationRules = require('./rules'); // @ts-ignore


var postValidationRules = require('./postRules');

var implicitRules = ['required', 'requiredIf', 'requiredNotIf', 'requiredWith', 'requiredWithout', 'accepted', 'sometimes', 'nullable'];
module.exports.implicitRules = implicitRules;
/**
 * apply rules
 * @param {*} field
 * @param {*} validator
 */

module.exports.applyRules = /*#__PURE__*/function () {
  var _apply = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, validator) {
    var proceed, fieldArr, fieldName, validatorInputs, i, indexedField, r, rule, ruleArgs, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            proceed = true;

            if (!field.multiple) {
              _context.next = 15;
              break;
            }

            fieldArr = field.path;
            fieldName = field.field;
            validatorInputs = validator.inputs[fieldArr[0]]; // eslint-disable-next-line guard-for-in

            _context.t0 = _regenerator["default"].keys(validatorInputs);

          case 6:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 14;
              break;
            }

            i = _context.t1.value;
            indexedField = fieldName.replace('*', i);
            _context.next = 11;
            return apply({
              field: indexedField,
              multiple: false,
              rules: field.rules,
              required: field.required
            }, validator);

          case 11:
            proceed = _context.sent;
            _context.next = 6;
            break;

          case 14:
            return _context.abrupt("return", proceed);

          case 15:
            r = 0;

          case 16:
            if (!(r < field.rules.length)) {
              _context.next = 39;
              break;
            }

            field.value = validator.inputVal(field.field, field.multiple);
            rule = field.rules[r].rule;

            if (!(rule == 'nullable' || field.nullable === true && field.value == null)) {
              _context.next = 21;
              break;
            }

            return _context.abrupt("continue", 36);

          case 21:
            if (!(typeof validationRules[rule] !== 'function')) {
              _context.next = 23;
              break;
            }

            throw new Error("Invalid Validation Rule: ".concat(rule, " does not exist"));

          case 23:
            if (!(!field.required && validator.isEmpty(field.value))) {
              _context.next = 25;
              break;
            }

            return _context.abrupt("continue", 36);

          case 25:
            ruleArgs = [field.field, field.value || ''];

            if (field.rules[r].args) {
              ruleArgs.push(field.rules[r].args);
            }

            _context.next = 29;
            return validationRules[rule].apply(validator, ruleArgs);

          case 29:
            result = _context.sent;

            if (result && implicitRules.indexOf(field.rules[r].rule) > 0) {
              field.required = false;
            }

            if (result) {
              _context.next = 36;
              break;
            }

            field.message = validator.parseMessage(field.rules[r].rule, field.field, field.value, field.rules[r].args);
            validator.addError(field.field, field.rules[r].rule, field.message);
            proceed = false;
            return _context.abrupt("break", 39);

          case 36:
            r++;
            _context.next = 16;
            break;

          case 39:
            return _context.abrupt("return", proceed);

          case 40:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function apply(_x, _x2) {
    return _apply.apply(this, arguments);
  }

  return apply;
}();
/**
 * apply post rules
 * @param {*} rule
 * @param {*} validator
 */


module.exports.applyPostRules = /*#__PURE__*/function () {
  var _postApply = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(rule, validator) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(rule.rule == 'function')) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", rule.params.apply(validator, [rule.values]));

          case 2:
            return _context2.abrupt("return", postValidationRules[rule.rule].apply(validator, [rule.values, rule.params]));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  function postApply(_x3, _x4) {
    return _postApply.apply(this, arguments);
  }

  return postApply;
}();