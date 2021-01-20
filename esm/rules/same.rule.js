export function same(args) {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments.');
    }
    const [anotherAttr] = args;
    return {
        name: "same",
        handler: (value, v) => {
            if (value === v.attributeValue(anotherAttr)) {
                return true;
            }
            return false;
        },
    };
}
//# sourceMappingURL=same.rule.js.map