export function different(args) {
    if (!args.length) {
        throw new Error("Invalid number of arguments.");
    }
    return {
        name: "different",
        handler: (value, v) => {
            const [otherInput] = args;
            const otherValue = v.attributeValue(otherInput);
            if (otherValue === value) {
                return false;
            }
            return true;
        },
    };
}
//# sourceMappingURL=different.rule.js.map