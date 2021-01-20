"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lte = exports.lt = void 0;
function lt(args) {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments.');
    }
    const [anotherAttr] = args;
    return {
        name: "lt",
        handler: (value, v) => {
            const anotherAttrVal = v.attributeValue(anotherAttr);
            return Number(value) < Number(anotherAttrVal);
        },
    };
}
exports.lt = lt;
function lte(args) {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments.');
    }
    const [anotherAttr] = args;
    return {
        name: "lte",
        handler: (value, v) => {
            const anotherAttrVal = v.attributeValue(anotherAttr);
            return Number(value) <= Number(anotherAttrVal);
        },
    };
}
exports.lte = lte;
//# sourceMappingURL=lt.rule.js.map