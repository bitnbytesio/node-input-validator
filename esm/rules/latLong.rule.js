import validator from 'validator';
export function latLong() {
    return {
        name: "latLong",
        handler: (value) => {
            return validator.isLatLong(String(value));
        },
    };
}
//# sourceMappingURL=latLong.rule.js.map