"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNiceNames = exports.addCustomMessages = exports.extend = exports.messagesRefByLang = exports.DEFAULT_LANG = void 0;
const obj_util_1 = require("../utils/obj.util");
const contracts_1 = require("../contracts");
exports.DEFAULT_LANG = contracts_1.Langs.en_US;
const MessagesRef = {};
function messagesRefByLang(lang) {
    let messages = obj_util_1.getKeyValue(lang.toString())(MessagesRef);
    if (typeof messages === "undefined") {
        // @ts-ignore
        MessagesRef[lang] = { messages: {} };
        messages = obj_util_1.getKeyValue(lang.toString())(MessagesRef);
    }
    return messages;
}
exports.messagesRefByLang = messagesRefByLang;
;
function extend(newMessages, lang = contracts_1.Langs.en_US) {
    const messages = messagesRefByLang(lang);
    Object.assign(messages, newMessages);
}
exports.extend = extend;
function addCustomMessages(customMessages, lang = contracts_1.Langs.en_US) {
    const messages = messagesRefByLang(lang);
    if (!messages.$custom) {
        messages.$custom = {};
    }
    Object.assign(messages.$custom, customMessages);
}
exports.addCustomMessages = addCustomMessages;
function addNiceNames(attributesNiceNames, lang = contracts_1.Langs.en_US) {
    const messages = messagesRefByLang(lang);
    if (!messages.$niceNames) {
        messages.$niceNames = {};
    }
    Object.assign(messages.$niceNames, attributesNiceNames);
}
exports.addNiceNames = addNiceNames;
//# sourceMappingURL=provider.js.map