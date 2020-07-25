import * as dateFns from 'date-fns'
import { useDateAdapter } from '../date';

import { dateAfter, dateAfterToday, dateBefore, dateBeforeToday } from './date.rule';
import { DateFnsAdapter } from '../date/date-fns.adapter';

const adapter = new DateFnsAdapter(dateFns);
useDateAdapter(adapter);

test("rules:dateAfter", function (): void {
  const ruleHandler = dateAfter([DateFnsAdapter.FORMAT_yyyy_MM_dd, "2020-05-20"]).handler;
  expect(ruleHandler("2020-06-20")).toBe(true);
  expect(ruleHandler("2020-04-20")).toBe(false);
});

test("rules:dateAfterToday", function (): void {
  const ruleHandler = dateAfterToday([
    DateFnsAdapter.FORMAT_yyyy_MM_dd,
  ]).handler;

  const dateafterToday = adapter.format(adapter.addDays(new Date, 1), DateFnsAdapter.FORMAT_yyyy_MM_dd)
  const dateToday = adapter.format(new Date, DateFnsAdapter.FORMAT_yyyy_MM_dd)

  expect(ruleHandler(dateafterToday)).toBe(true);
  expect(ruleHandler(dateToday)).toBe(false);
});

test("rules:dateBefore", function (): void {
  const ruleHandler = dateBefore([DateFnsAdapter.FORMAT_yyyy_MM_dd, "2020-06-20"]).handler;
  expect(ruleHandler("2020-06-20")).toBe(false);
  expect(ruleHandler("2020-04-20")).toBe(true);
});

test("rules:dateBeforeToday", function (): void {
  const ruleHandler = dateBeforeToday([
    DateFnsAdapter.FORMAT_yyyy_MM_dd,
  ]).handler;

  const datebeforeToday = adapter.format(adapter.subDays(new Date, 1), DateFnsAdapter.FORMAT_yyyy_MM_dd)
  const dateToday = adapter.format(new Date, DateFnsAdapter.FORMAT_yyyy_MM_dd)

  console.log(datebeforeToday, dateToday);

  expect(ruleHandler(datebeforeToday)).toBe(true);
  expect(ruleHandler(dateToday)).toBe(false);
});
