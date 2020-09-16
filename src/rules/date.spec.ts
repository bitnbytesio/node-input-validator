import * as dateFns from 'date-fns'
import { useDateAdapter } from '../date';

import {
  dateAfter,
  dateAfterToday,
  dateBefore,
  dateBeforeToday,
  dateFormat,
  dateISO,
} from './date.rule';

import { DateFnsAdapter } from '../date/date-fns.adapter';
import { Messages } from '../messages';

const adapter = new DateFnsAdapter(dateFns);
useDateAdapter(adapter);

describe("rules:dateAfter", () => {
  test("should pass", () => {
    const ruleHandler = dateAfter([DateFnsAdapter.FORMAT_yyyy_MM_dd, "2020-05-20"]).handler;
    expect(ruleHandler("2020-06-20")).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = dateAfter([DateFnsAdapter.FORMAT_yyyy_MM_dd, "2020-05-20"]).handler;
    expect(ruleHandler("2020-04-20")).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('dateAfter');
  });
});

describe("rules:dateAfterToday", () => {
  test("should pass", () => {
    const ruleHandler = dateAfterToday([
      DateFnsAdapter.FORMAT_yyyy_MM_dd,
    ]).handler;

    const dateafterToday = adapter.format(adapter.addDays(new Date, 1), DateFnsAdapter.FORMAT_yyyy_MM_dd);
    expect(ruleHandler(dateafterToday)).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = dateAfterToday([
      DateFnsAdapter.FORMAT_yyyy_MM_dd,
    ]).handler;

    const dateToday = adapter.format(new Date, DateFnsAdapter.FORMAT_yyyy_MM_dd);
    expect(ruleHandler(dateToday)).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('dateAfterToday');
  });
});

describe("rules:dateBefore", () => {
  test("should pass", () => {
    const dateToday = adapter.format(new Date, DateFnsAdapter.FORMAT_yyyy_MM_dd);

    const ruleHandler = dateBefore([DateFnsAdapter.FORMAT_yyyy_MM_dd, dateToday]).handler;

    const datebeforeToday = adapter.format(adapter.subDays(new Date, 1), DateFnsAdapter.FORMAT_yyyy_MM_dd);
    expect(ruleHandler(datebeforeToday)).toBe(true);
  });

  test("should fail", () => {
    const dateToday = adapter.format(new Date, DateFnsAdapter.FORMAT_yyyy_MM_dd);

    const ruleHandler = dateBefore([DateFnsAdapter.FORMAT_yyyy_MM_dd, dateToday]).handler;

    const dateafterToday = adapter.format(adapter.addDays(new Date, 1), DateFnsAdapter.FORMAT_yyyy_MM_dd);

    expect(ruleHandler(dateafterToday)).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('dateBefore');
  });
});

describe("rules:dateBeforeToday", () => {
  test("should pass", () => {
    const ruleHandler = dateBeforeToday([
      DateFnsAdapter.FORMAT_yyyy_MM_dd,
    ]).handler;

    const datebeforeToday = adapter.format(adapter.subDays(new Date, 1), DateFnsAdapter.FORMAT_yyyy_MM_dd);

    expect(ruleHandler(datebeforeToday)).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = dateBeforeToday([
      DateFnsAdapter.FORMAT_yyyy_MM_dd,
    ]).handler;

    const dateToday = adapter.format(new Date, DateFnsAdapter.FORMAT_yyyy_MM_dd);

    expect(ruleHandler(dateToday)).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('dateBeforeToday');
  });
});

describe("rules:dateFormat", (): void => {
  test("should pass", (): void => {
    const ruleHandler = dateFormat([DateFnsAdapter.FORMAT_yyyy_MM_dd]).handler;
    expect(ruleHandler("2019-12-24")).toBe(true);
  });

  test("should fail", (): void => {
    const ruleHandler = dateFormat([DateFnsAdapter.FORMAT_yyyy_MM_dd]).handler;
    expect(ruleHandler("2021-13-25")).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('dateFormat');
  });
});

describe("rules:dateISO", () => {
  test("should pass", () => {
    const ruleHandler = dateISO().handler;
    expect(ruleHandler("2019-07-01T10:10:00")).toBe(true);
    expect(ruleHandler("2019-07-01T10:10:00.00Z")).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = dateISO().handler;
    expect(ruleHandler("01/26/2018")).toBe(false);
    expect(ruleHandler("12 12 18")).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('dateISO');
  });
});
