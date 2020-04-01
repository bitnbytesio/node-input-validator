"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable guard-for-in */

/* eslint-disable no-restricted-syntax */

/**
 * post validation rule all
 * @param {*} seletedValues
 * @param {Array} args
 * @this Validator
 * @returns Promise<boolean>
 */
// @ts-ignore
module.exports = /*#__PURE__*/function () {
  var _all = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(seletedValues, args) {
    var values, result, k, _k, field;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // @ts-ignore
            values = this.inputs;
            result = true;
            _context.t0 = _regenerator["default"].keys(args);

          case 3:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 10;
              break;
            }

            k = _context.t1.value;

            if (!(values[args[k]] === undefined)) {
              _context.next = 8;
              break;
            }

            result = false;
            return _context.abrupt("break", 10);

          case 8:
            _context.next = 3;
            break;

          case 10:
            if (!result) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", true);

          case 12:
            for (_k in args) {
              field = args[_k]; // @ts-ignore

              this.addError(field, 'required', this.parseMessage('required', field, values[field], args));
            }

            return _context.abrupt("return", false);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function all(_x, _x2) {
    return _all.apply(this, arguments);
  }

  return all;
}();