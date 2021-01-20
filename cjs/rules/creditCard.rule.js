"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creditCard = void 0;
const validator_1 = __importDefault(require("validator"));
function creditCard() {
    return {
        name: "creditCard",
        handler: (value) => {
            return validator_1.default.isCreditCard(String(value));
        },
    };
}
exports.creditCard = creditCard;
//# sourceMappingURL=creditCard.rule.js.map