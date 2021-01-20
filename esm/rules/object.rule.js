export function object() {
    return {
        name: "object",
        handler: (value) => {
            return (!!value) && (value.constructor === Object);
        },
    };
}
//# sourceMappingURL=object.rule.js.map