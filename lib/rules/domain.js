"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var isFQDN = require('validator/lib/isFQDN')["default"];

module.exports = /*#__PURE__*/function () {
  var _domain = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", isFQDN(value));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function domain(_x, _x2) {
    return _domain.apply(this, arguments);
  }

  return domain;
}();