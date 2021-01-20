"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateAdapter = exports.useDateAdapter = void 0;
// import { DateFnsAdapter } from "./date-fns.adapter";
let AdapterInstance;
function useDateAdapter(instance) {
    AdapterInstance = instance;
}
exports.useDateAdapter = useDateAdapter;
function dateAdapter() {
    if (!AdapterInstance) {
        throw new Error('Please set date adapter.');
    }
    return AdapterInstance;
}
exports.dateAdapter = dateAdapter;
//# sourceMappingURL=index.js.map