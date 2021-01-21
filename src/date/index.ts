import { DateAdapter } from "./contracts";
import { get } from '../config';

export * from './date-fns.adapter';
export * from './moment.adapter';

export { DateAdapter };

export function dateAdapter(): DateAdapter {
  const adapterInstance = get('dateAdapter');
  if (!adapterInstance) {
    throw new Error('Please set date adapter to use date rules.');
  }

  return adapterInstance;
}
