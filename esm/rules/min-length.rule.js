export function minLength(args) {
    return {
        name: "minLength",
        handler: (value, v) => {
            const [maxNum] = args;
            if (value.toString().length < parseInt(v.attributeValue(maxNum))) {
                return false;
            }
            return true;
        },
    };
}
//# sourceMappingURL=min-length.rule.js.map