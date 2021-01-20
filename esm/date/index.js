// import { DateFnsAdapter } from "./date-fns.adapter";
let AdapterInstance;
export function useDateAdapter(instance) {
    AdapterInstance = instance;
}
export function dateAdapter() {
    if (!AdapterInstance) {
        throw new Error('Please set date adapter.');
    }
    return AdapterInstance;
}
//# sourceMappingURL=index.js.map