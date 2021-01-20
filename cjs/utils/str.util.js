"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sizeToBytes = exports.trim = exports.replaceAll = exports.kebabCaseToSentance = exports.snakeCaseToSentance = exports.camelCaseToSentance = void 0;
function camelCaseToSentance(str) {
    return str.replace(/([A-Z]+)/g, " $1").trimLeft().toLowerCase();
}
exports.camelCaseToSentance = camelCaseToSentance;
function snakeCaseToSentance(str) {
    return str.replace(/_/g, " ");
}
exports.snakeCaseToSentance = snakeCaseToSentance;
function kebabCaseToSentance(str) {
    return str.replace(/-/g, " ");
}
exports.kebabCaseToSentance = kebabCaseToSentance;
function replaceAll(str, replaceWhat, replaceWith) {
    return str.replace(new RegExp(replaceWhat, "g"), replaceWith);
}
exports.replaceAll = replaceAll;
function trim(string, char = " ") {
    let str = string;
    if (str.charAt(0) === char) {
        str = str.substr(1, str.length);
    }
    const len = str.length;
    if (str.charAt(len - 1) === char) {
        str = str.substr(0, len - 1);
    }
    return str.toString();
}
exports.trim = trim;
function sizeToBytes(inputSize) {
    const size = inputSize.toLowerCase();
    /* istanbul ignore next */
    if (size.includes('gb') || size.includes('g')) {
        return parseInt(size.replace('gb', '').replace('g', '')) * 1024 * 1024 * 1024;
    }
    /* istanbul ignore next */
    if (size.includes('mb') || size.includes('m')) {
        return parseInt(size.replace('mb', '').replace('m', '')) * 1024 * 1024;
    }
    /* istanbul ignore next */
    if (size.includes('kb') || size.includes('k')) {
        return parseInt(size.replace('kb', '').replace('k', '')) * 1024;
    }
    /* istanbul ignore next */
    if (size.includes('b')) {
        return parseInt(size.replace('b', ''));
    }
    /* istanbul ignore next */
    return parseInt(size) * 1024;
}
exports.sizeToBytes = sizeToBytes;
;
//# sourceMappingURL=str.util.js.map