export function equals(args) {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments.');
    }
    const [otherValue] = args;
    return {
        name: "equals",
        handler: (value) => {
            return value === otherValue;
        },
    };
}
//# sourceMappingURL=equals.rule.js.map