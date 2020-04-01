"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var get = require('lodash/get');

var _require = require('../lib/dynamicComparisonOperators'),
    dynamicComparisonOperators = _require.dynamicComparisonOperators;
/**
 * This rule reads like `percentage if this is [operator] than a [percentage]% of [other-field]`
 * Rule Example:
 * "validation": "percentageIfThisNumberIs:>,40%,household.sum-insured"
 * "validation": "ifThisDateIs:>=,household.date"
 * @param {string} field
 * @param {string} value
 * @param {array} args
 */


module.exports = /*#__PURE__*/function () {
  var _ifThisDateIs = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value, args) {
    var _args, operation, property, fieldValueDate, fieldValueInMs, relatedPropertyValue, relatedPropertyDate, relatedPropertyValueInMs;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _args = (0, _slicedToArray2["default"])(args, 2), operation = _args[0], property = _args[1];
            fieldValueDate = new Date(value);
            fieldValueInMs = fieldValueDate.getTime(); // @ts-ignore

            relatedPropertyValue = get(this.inputs, property);
            relatedPropertyDate = new Date(relatedPropertyValue);
            relatedPropertyValueInMs = relatedPropertyDate.getTime();
            return _context.abrupt("return", dynamicComparisonOperators(operation, fieldValueInMs, relatedPropertyValueInMs));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function ifThisDateIs(_x, _x2, _x3) {
    return _ifThisDateIs.apply(this, arguments);
  }

  return ifThisDateIs;
}();