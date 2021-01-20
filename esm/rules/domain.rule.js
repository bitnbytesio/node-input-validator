import validator from 'validator';
export function domain() {
    return {
        name: "domain",
        handler: (value) => {
            return validator.isFQDN(String(value));
        },
    };
}
//# sourceMappingURL=domain.rule.js.map