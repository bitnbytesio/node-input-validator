import { isDomain, isEmail, isIp, isCreditCard } from './borrowed';

test('borrowed:code', () => {
  expect(isDomain('bitnbytes.io')).toBe(true);
  expect(isDomain('bitnbyte$.io')).toBe(false);
  expect(isDomain('bitn byte.io')).toBe(false);
  expect(isDomain('-bitnbyte.io')).toBe(false);
  expect(isDomain('bitnbyte_.io')).toBe(false);
  expect(isDomain(new Array(65).fill('a', 0, 65).join('') + '.io')).toBe(false);
  expect(isDomain('abcxyz.ab20ab')).toBe(false);
  expect(isEmail('bitnbytesio@gmail.com')).toBe(true);
  expect(isIp('127.0.0.1')).toBe(true);
  expect(isCreditCard('4111111111111111')).toBe(true);
})
