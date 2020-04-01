"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var get = require('lodash/get');

var _require = require('../lib/dynamicComparisonOperators'),
    percentageRuleComparison = _require.percentageRuleComparison;

module.exports = /*#__PURE__*/function () {
  var _percentageIfThisNumberIs = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value, args) {
    var _args, operation, percentage, property, relatedPropertyValue;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _args = (0, _slicedToArray2["default"])(args, 3), operation = _args[0], percentage = _args[1], property = _args[2]; // @ts-ignore

            relatedPropertyValue = get(this.inputs, property);
            return _context.abrupt("return", percentageRuleComparison(operation, percentage, value, relatedPropertyValue));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function percentageIfThisNumberIs(_x, _x2, _x3) {
    return _percentageIfThisNumberIs.apply(this, arguments);
  }

  return percentageIfThisNumberIs;
}();