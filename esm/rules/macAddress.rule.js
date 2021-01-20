import validator from 'validator';
export function macAddress() {
    return {
        name: "macAddress",
        handler: (value) => {
            return validator.isMACAddress(String(value));
        },
    };
}
//# sourceMappingURL=macAddress.rule.js.map