"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageParser = void 0;
const str_util_1 = require("./str.util");
function messageParser(params) {
    const { message, attrName, niceName, ruleArgs, ruleName, attrValue } = params;
    let defaultMessage = message || 'Attribute :attr is malformed.';
    if (typeof defaultMessage === 'function') {
        defaultMessage = defaultMessage(params);
    }
    if (defaultMessage.indexOf(":rule") >= 0) {
        defaultMessage = defaultMessage.replace(":rule", ruleName);
    }
    // replace attribute name
    if (defaultMessage.indexOf(":attr") >= 0) {
        // convert camel to sentance and replce _ with space
        let attributeName = niceName || attrName || "";
        if (!niceName && attributeName.indexOf(".") < 0) {
            attributeName = str_util_1.camelCaseToSentance(str_util_1.snakeCaseToSentance(attrName));
        }
        defaultMessage = defaultMessage.replace(":attr", attributeName);
    }
    // replace args
    if (defaultMessage.indexOf(":args") >= 0) {
        defaultMessage = defaultMessage.replace(":args", ruleArgs.toString());
    }
    // find and replace each arg
    for (let i = 0; i < 10; i++) {
        if (defaultMessage.indexOf(`:arg${i}`) >= 0) {
            defaultMessage = defaultMessage.replace(`:arg${i}`, ruleArgs[i]);
        }
        else {
            break;
        }
    }
    if (defaultMessage.indexOf(":value") >= 0) {
        /* istanbul ignore next */
        if (typeof attrValue === "object") {
            defaultMessage = defaultMessage.replace(":value", JSON.stringify(attrValue));
        }
        else if (typeof attrValue === "undefined") {
            defaultMessage = defaultMessage.replace(":value", "undefined");
        }
        else {
            defaultMessage = defaultMessage.replace(":value", attrValue.toString());
        }
    }
    return defaultMessage;
}
exports.messageParser = messageParser;
//# sourceMappingURL=message-parser.util.js.map