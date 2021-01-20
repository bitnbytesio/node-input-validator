"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = void 0;
const validator_1 = __importDefault(require("validator"));
function hash(args) {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments.');
    }
    const [algo] = args;
    return {
        name: "hash",
        handler: (value) => {
            return validator_1.default.isHash(String(value), algo);
        },
    };
}
exports.hash = hash;
//# sourceMappingURL=hash.rule.js.map