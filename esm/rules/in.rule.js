export function _in(args) {
    if (!args.length) {
        throw new Error('Invalid number of arguments.');
    }
    return {
        name: "in",
        handler: (value) => {
            return !(args.indexOf(value) < 0);
        },
    };
}
export function notIn(args) {
    if (!args.length) {
        throw new Error('Invalid number of arguments.');
    }
    return {
        name: "notIn",
        handler: (value) => {
            return !_in(args).handler(value);
        },
    };
}
//# sourceMappingURL=in.rule.js.map