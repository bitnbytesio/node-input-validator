"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable eqeqeq */

/* eslint-disable no-plusplus */

/* eslint-disable no-continue */

/* eslint-disable no-param-reassign */
var empty = require('../lib/empty');

var _require = require('../lib/ObjectIndex'),
    pathIndex = _require.pathIndex;

module.exports = /*#__PURE__*/function () {
  var _requiredWith = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value, args) {
    var i, required;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!Array.isArray(args)) args = [args];

            if (args.length) {
              _context.next = 3;
              break;
            }

            throw new Error("Invalid arguments supplied for field ".concat(field, " in required with rule."));

          case 3:
            required = false;
            i = 0;

          case 5:
            if (!(i < args.length)) {
              _context.next = 14;
              break;
            }

            if (!(args[i] == field)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("continue", 11);

          case 8:
            if (empty(pathIndex(this.inputs, args[i]))) {
              _context.next = 11;
              break;
            }

            required = true;
            return _context.abrupt("break", 14);

          case 11:
            ++i;
            _context.next = 5;
            break;

          case 14:
            if (!(required && empty(value))) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", false);

          case 16:
            return _context.abrupt("return", true);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function requiredWith(_x, _x2, _x3) {
    return _requiredWith.apply(this, arguments);
  }

  return requiredWith;
}();