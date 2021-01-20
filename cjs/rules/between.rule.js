"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.between = void 0;
const validator_1 = __importDefault(require("validator"));
/**
 * The field under validation must be between min and max seed.
 * This will work with number as well as array.
 * In case of array, array values must be numbers between min and max seed.
 * @param args seeds
 */
function between(args) {
    if (args.length !== 2) {
        throw new Error('Invalid number of arguments.');
    }
    if (!validator_1.default.isNumeric(args[0]) || !validator_1.default.isNumeric(args[0])) {
        throw new TypeError('Seeds must be number.');
    }
    const min = Number(args[0]);
    const max = Number(args[1]);
    if (min >= max) {
        throw new RangeError('Seed min must be less then max.');
    }
    return {
        name: 'between',
        handler: (value) => {
            if (Array.isArray(value)) {
                let i = 0;
                const len = value.length;
                for (i; i < len; i++) {
                    const v = String(value[i]);
                    if (!validator_1.default.isNumeric(v)) {
                        return false;
                    }
                }
                const minV = Math.min(...value);
                const maxV = Math.max(...value);
                if (minV < min || maxV > max) {
                    return false;
                }
                return true;
            }
            const v = String(value);
            if (!validator_1.default.isNumeric(v)) {
                return false;
            }
            const valNum = Number(value);
            if (valNum < min || valNum > max) {
                return false;
            }
            return true;
        },
    };
}
exports.between = between;
//# sourceMappingURL=between.rule.js.map