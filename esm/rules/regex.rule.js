export function regex(args) {
    return {
        name: "regex",
        handler: (value, v) => {
            const [pattren] = args;
            const regexp = new RegExp(v.attributeValue(pattren));
            if (!regexp.test(value)) {
                return false;
            }
            return true;
        },
    };
}
//# sourceMappingURL=regex.rule.js.map