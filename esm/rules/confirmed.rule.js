export function confirmed(args = []) {
    return {
        name: "confirmed",
        handler: (value, v, attrName) => {
            if (value === v.attributeValue(`${attrName}Confirmation`)) {
                return true;
            }
            return false;
        },
    };
}
//# sourceMappingURL=confirmed.rule.js.map