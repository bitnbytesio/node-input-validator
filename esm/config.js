import { Langs } from "./contracts";
let config = {
    wildcardIterations: 1000,
    wildcardSeperator: '.',
    lang: Langs.en_US,
};
export function set(customConfig) {
    config = Object.assign(Object.assign({}, config), customConfig);
}
export function get(key, defaultValue = null) {
    if (key) {
        return config[key] || defaultValue;
    }
    return config;
}
//# sourceMappingURL=config.js.map