"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable radix */
var isInt = require('validator/lib/isInt')["default"];

module.exports = /*#__PURE__*/function () {
  var _maxLength = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value, maxNum) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (isInt(maxNum)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", false);

          case 2:
            if (!(value.toString().length > parseInt(maxNum))) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", false);

          case 4:
            return _context.abrupt("return", true);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function maxLength(_x, _x2, _x3) {
    return _maxLength.apply(this, arguments);
  }

  return maxLength;
}();