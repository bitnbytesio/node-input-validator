export function lte(args) {
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
//# sourceMappingURL=lte.rule.js.map