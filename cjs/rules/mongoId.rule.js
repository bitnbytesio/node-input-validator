"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoId = void 0;
const validator_1 = __importDefault(require("validator"));
function mongoId() {
    return {
        name: "mongoId",
        handler: (value) => {
            return validator_1.default.isMongoId(String(value));
        },
    };
}
exports.mongoId = mongoId;
//# sourceMappingURL=mongoId.rule.js.map