export function max(args) {
    return {
        name: "max",
        handler: (value, v) => {
            const [maxNum] = args;
            if (!Number(String(value)) ||
                Number(value) > Number(v.attributeValue(maxNum))) {
                return false;
            }
            return true;
        },
    };
}
//# sourceMappingURL=max.rule.js.map