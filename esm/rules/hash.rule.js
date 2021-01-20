import validator from 'validator';
export function hash(args) {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments.');
    }
    const [algo] = args;
    return {
        name: "hash",
        handler: (value) => {
            return validator.isHash(String(value), algo);
        },
    };
}
//# sourceMappingURL=hash.rule.js.map