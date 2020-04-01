"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable eqeqeq */
// @ts-ignore
module.exports = /*#__PURE__*/function () {
  var _same = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value, otherField) {
    var _this = this;

    var otherValue;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // eslint-disable-next-line no-param-reassign
            otherField = otherField.split('.').filter(function (e) {
              return e !== '';
            });
            otherField.map(function (item) {
              if (typeof otherValue === 'undefined') {
                // @ts-ignore
                otherValue = _this.inputs && _this.inputs[item];
              } else {
                otherValue = otherValue[item];
              }

              return true;
            });

            if (!(typeof otherValue === 'undefined')) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", false);

          case 4:
            if (!(otherValue != value)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", false);

          case 6:
            return _context.abrupt("return", true);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function same(_x, _x2, _x3) {
    return _same.apply(this, arguments);
  }

  return same;
}();