"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable eqeqeq */
module.exports = /*#__PURE__*/function () {
  var _equals = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value, arg) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(value != arg)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", false);

          case 2:
            return _context.abrupt("return", true);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function equals(_x, _x2, _x3) {
    return _equals.apply(this, arguments);
  }

  return equals;
}();