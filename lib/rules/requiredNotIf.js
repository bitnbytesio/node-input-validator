"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable no-unused-vars */

/* eslint-disable prefer-rest-params */
var requiredIf = require('./requiredIf');

module.exports = /*#__PURE__*/function () {
  var _requiredNotIf = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value, args) {
    var _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return requiredIf.apply(this, _args);

          case 2:
            return _context.abrupt("return", !_context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function requiredNotIf(_x, _x2, _x3) {
    return _requiredNotIf.apply(this, arguments);
  }

  return requiredNotIf;
}();