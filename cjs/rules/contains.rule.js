"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notContains = exports.contains = void 0;
const validator_1 = __importDefault(require("validator"));
function contains(args) {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments.');
    }
    const [find] = args;
    return {
        name: "contains",
        handler: (value) => {
            return validator_1.default.contains(String(value), find);
        },
    };
}
exports.contains = contains;
function notContains(args) {
    const containsHandler = contains(args).handler;
    return {
        name: "notContains",
        handler: (value) => {
            return !containsHandler(value);
        },
    };
}
exports.notContains = notContains;
//# sourceMappingURL=contains.rule.js.map