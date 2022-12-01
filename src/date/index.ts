import { DateAdapter } from "./contracts.js";
import { get } from '../config.js';

export * from './date-fns.adapter.js';
export * from './moment.adapter.js';

export { DateAdapter };

export function dateAdapter(): DateAdapter {
  const adapterInstance = get('dateAdapter');
  if (!adapterInstance) {
    throw new Error('Please set date adapter to use date rules.');
  }

  return adapterInstance;
}
