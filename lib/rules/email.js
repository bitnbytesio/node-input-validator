"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var isEmail = require('validator/lib/isEmail')["default"];

module.exports = /*#__PURE__*/function () {
  var _email = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (isEmail(value)) {
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

  function email(_x, _x2) {
    return _email.apply(this, arguments);
  }

  return email;
}();