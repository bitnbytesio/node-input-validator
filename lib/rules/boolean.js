"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = /*#__PURE__*/function () {
  var _boolean = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value, args) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!args) {
              // eslint-disable-next-line no-param-reassign
              args = [true, false, 'true', 'false', 0, 1, '0', '1'];
            }

            if (!(args.indexOf(value) >= 0)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", true);

          case 3:
            return _context.abrupt("return", false);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function _boolean2(_x, _x2, _x3) {
    return _boolean.apply(this, arguments);
  }

  return _boolean2;
}();