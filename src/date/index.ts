import { DateAdapter } from "./contracts";
// import { DateFnsAdapter } from "./date-fns.adapter";

let AdapterInstance: DateAdapter;

export function useDateAdapter(instance: DateAdapter) {
  AdapterInstance = instance;
}

export function dateAdapter(): DateAdapter {
  if (!AdapterInstance) {
    throw new Error('Please set date adapter.');
  }

  return AdapterInstance;
}
