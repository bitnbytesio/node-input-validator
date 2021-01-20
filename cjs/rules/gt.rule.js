"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gte = exports.gt = void 0;
function gt(args) {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments.');
    }
    const [anotherAttr] = args;
    return {
        name: "gt",
        handler: (value, v) => {
            const anotherAttrVal = v.attributeValue(anotherAttr);
            return Number(value) > Number(anotherAttrVal);
        },
    };
}
exports.gt = gt;
function gte(args) {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments.');
    }
    const [anotherAttr] = args;
    return {
        name: "gte",
        handler: (value, v) => {
            const [anotherAttr] = args;
            const anotherAttrVal = v.attributeValue(anotherAttr);
            return Number(value) >= Number(anotherAttrVal);
        },
    };
}
exports.gte = gte;
//# sourceMappingURL=gt.rule.js.map