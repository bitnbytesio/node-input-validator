import validator from 'validator';
export function reallyEmpty(value) {
    return validator.isEmpty((value === undefined || value === null ? "" : value) + "", { ignore_whitespace: false });
}
//# sourceMappingURL=ops.util.js.map