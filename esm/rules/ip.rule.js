import validator from 'validator';
export function ip() {
    return {
        name: "ip",
        handler: (value) => {
            return validator.isIP(String(value));
        },
    };
}
//# sourceMappingURL=ip.rule.js.map