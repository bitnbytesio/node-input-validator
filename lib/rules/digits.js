"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var numeric = require('./numeric');

module.exports = /*#__PURE__*/function () {
  var _digits = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value, dNumber) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (numeric(field)) {
              _context.next = 2;
              break;
            }

            throw "Please provide a numeric value for ".concat(field, " under digits rule");

          case 2:
            if (!(dNumber != value.length)) {
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

  function digits(_x, _x2, _x3) {
    return _digits.apply(this, arguments);
  }

  return digits;
}();