"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable no-restricted-globals */
module.exports = /*#__PURE__*/function () {
  var _numeric = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", !isNaN(value) && isFinite(value));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function numeric(_x, _x2) {
    return _numeric.apply(this, arguments);
  }

  return numeric;
}();