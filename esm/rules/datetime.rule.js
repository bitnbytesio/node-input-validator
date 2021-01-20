/* istanbul ignore file */
import validator from 'validator';
export function datetime() {
    return {
        name: "datetime",
        handler: (value) => {
            // @ts-ignore
            return validator.isDate(String(value), 'YYYY-MM-DD HH:mm:ss');
        },
    };
}
//# sourceMappingURL=datetime.rule.js.map