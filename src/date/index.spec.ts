import * as dateFns from 'date-fns'

import { dateAdapter, useDateAdapter } from './index';
import { DateFnsAdapter } from './date-fns.adapter';

describe('date:dateAdapter', () => {
  test('should throw exception', () => {
    expect(() => dateAdapter()).toThrowError(new Error('Please set date adapter.'));
  })

  test('should set date adapter', () => {
    const adapter = new DateFnsAdapter(dateFns);
    useDateAdapter(adapter);
    expect(dateAdapter()).toBeInstanceOf(DateFnsAdapter);
  })
})
