"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lte = void 0;
function lte(args) {
    return {
        name: "lte",
        handler: (value, v) => {
            const [anotherAttr] = args;
            const anotherAttrVal = v.attributeValue(anotherAttr);
            if (Number(value) <= Number(anotherAttrVal)) {
                return true;
            }
            return false;
        },
    };
}
exports.lte = lte;
//# sourceMappingURL=lte.rule.js.map