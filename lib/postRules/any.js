"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable guard-for-in */

/* eslint-disable no-restricted-syntax */

/**
 * post validation rule any
 * @param {*} seletedValues
 * @param {Array} args
 * @this Validator
 * @returns Promise<boolean>
 */
// @ts-ignore
module.exports = /*#__PURE__*/function () {
  var _any = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(seletedValues, args) {
    var values, k, field, _k, _field;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // @ts-ignore
            values = this.inputs;
            _context.t0 = _regenerator["default"].keys(args);

          case 2:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 9;
              break;
            }

            k = _context.t1.value;
            field = args[k];

            if (!values[field]) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", true);

          case 7:
            _context.next = 2;
            break;

          case 9:
            for (_k in args) {
              _field = args[_k]; // @ts-ignore

              this.addError(_field, 'required', this.parseMessage('required', _field, values[_field], args));
            } // @ts-ignore


            this.addError('*', 'any', this.parseMessage('any', '*', values, args));
            return _context.abrupt("return", false);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function any(_x, _x2) {
    return _any.apply(this, arguments);
  }

  return any;
}();