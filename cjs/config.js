"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.set = void 0;
const contracts_1 = require("./contracts");
let config = {
    wildcardIterations: 1000,
    wildcardSeperator: '.',
    lang: contracts_1.Langs.en_US,
};
function set(customConfig) {
    config = Object.assign(Object.assign({}, config), customConfig);
}
exports.set = set;
function get(key, defaultValue = null) {
    if (key) {
        return config[key] || defaultValue;
    }
    return config;
}
exports.get = get;
//# sourceMappingURL=config.js.map