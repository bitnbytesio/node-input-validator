export function min(args) {
    return {
        name: "min",
        handler: (value, v) => {
            const [maxNum] = args;
            if (!Number(String(value)) ||
                Number(value) < Number(v.attributeValue(maxNum))) {
                return false;
            }
            return true;
        },
    };
}
//# sourceMappingURL=min.rule.js.map