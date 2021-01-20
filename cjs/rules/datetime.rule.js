"use strict";
/* istanbul ignore file */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.datetime = void 0;
const validator_1 = __importDefault(require("validator"));
function datetime() {
    return {
        name: "datetime",
        handler: (value) => {
            // @ts-ignore
            return validator_1.default.isDate(String(value), 'YYYY-MM-DD HH:mm:ss');
        },
    };
}
exports.datetime = datetime;
//# sourceMappingURL=datetime.rule.js.map