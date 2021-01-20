import validator from 'validator';
export function contains(args) {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments.');
    }
    const [find] = args;
    return {
        name: "contains",
        handler: (value) => {
            return validator.contains(String(value), find);
        },
    };
}
export function notContains(args) {
    const containsHandler = contains(args).handler;
    return {
        name: "notContains",
        handler: (value) => {
            return !containsHandler(value);
        },
    };
}
//# sourceMappingURL=contains.rule.js.map