export function maxLength(args) {
    return {
        name: "maxLength",
        handler: (value, v) => {
            const [maxNum] = args;
            if (value.toString().length > parseInt(v.attributeValue(maxNum))) {
                return false;
            }
            return true;
        },
    };
}
//# sourceMappingURL=max-length.rule.js.map