import * as dateFns from 'date-fns'
import { useDateAdapter } from '../index';

import {
  dateAfter,
  after,
  dateAfterToday,
  dateBefore,
  dateBeforeToday,
  dateFormat,
  dateISO,
  date,
} from './date.rule';

import { DateFnsAdapter } from '../date/date-fns.adapter';
import { Messages } from '../messages';

const adapter = new DateFnsAdapter(dateFns);
useDateAdapter(adapter);

describe("rules:dateAfter", () => {
  test("should pass", () => {
    const ruleHandler = dateAfter([adapter.FORMAT_DATE, "2020-05-20"]).handler;
    expect(ruleHandler("2020-06-20")).toBe(true);

    const d = new Date();

    d.setTime(d.getTime() + (1 * 60 * 60 * 1000));

    expect(after([adapter.FORMAT_DATETIME]).handler('2021-12-12 10:00:00')).toBe(true);
    expect(after([adapter.FORMAT_DATETIME, '2020-12-12 10:00:00']).handler('2021-12-12 10:00:00')).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = dateAfter([adapter.FORMAT_DATE, "2020-05-20"]).handler;
    expect(ruleHandler("2020-04-20")).toBe(false);
    expect(ruleHandler("2020-05-20")).toBe(false);
  });

  test("should throw exception", function (): void {
    expect(() => dateAfter([])).toThrowError(new Error('Rule accepts 2 argument (format,date).'));
    expect(() => dateAfter([1, 2, 3])).toThrowError(new Error('Rule accepts 2 argument (format,date).'));
    expect(() => dateAfter([1, 2])).toThrowError(new TypeError('First element must be date format.'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('dateAfter');
    expect(Messages.en_US.messages).toHaveProperty('after');
  });
});

describe("rules:dateAfterToday", () => {
  test("should pass", () => {
    const ruleHandler = dateAfterToday([
      adapter.FORMAT_DATE,
    ]).handler;

    const dateafterToday = adapter.format(adapter.addDays(new Date, 1), adapter.FORMAT_DATE);
    expect(ruleHandler(dateafterToday)).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = dateAfterToday([
      adapter.FORMAT_DATE,
    ]).handler;

    const dateToday = adapter.format(new Date, adapter.FORMAT_DATE);
    expect(ruleHandler(dateToday)).toBe(false);
  });

  test("should throw exception", function (): void {
    expect(() => dateAfterToday([])).toThrowError(new Error('Rule accepts only 1 argument (format).'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('dateAfterToday');
  });
});

describe("rules:dateBefore", () => {
  test("should pass", () => {
    const dateToday = adapter.format(new Date, adapter.FORMAT_DATE);

    const ruleHandler = dateBefore([adapter.FORMAT_DATE, dateToday]).handler;

    const datebeforeToday = adapter.format(adapter.subDays(new Date, 1), adapter.FORMAT_DATE);
    expect(ruleHandler(datebeforeToday)).toBe(true);
  });

  test("should fail", () => {
    const dateToday = adapter.format(new Date, adapter.FORMAT_DATE);

    const ruleHandler = dateBefore([adapter.FORMAT_DATE, dateToday]).handler;

    const dateafterToday = adapter.format(adapter.addDays(new Date, 1), adapter.FORMAT_DATE);
    const sameDate = adapter.format(new Date, adapter.FORMAT_DATE);

    expect(ruleHandler(dateafterToday)).toBe(false);
    expect(ruleHandler(sameDate)).toBe(false);
  });

  test("should throw exception", function (): void {
    expect(() => dateBefore([])).toThrowError(new Error('Rule accepts 2 argument (format,date).'));
    expect(() => dateBefore([1, 2, 3])).toThrowError(new Error('Rule accepts 2 argument (format,date).'));
    expect(() => dateBefore([1, 2])).toThrowError(new TypeError('First element must be date format.'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('dateBefore');
    expect(Messages.en_US.messages).toHaveProperty('before');
  });
});

describe("rules:dateBeforeToday", () => {
  test("should pass", () => {
    const ruleHandler = dateBeforeToday([
      adapter.FORMAT_DATE,
    ]).handler;

    const datebeforeToday = adapter.format(adapter.subDays(new Date, 1), adapter.FORMAT_DATE);

    expect(ruleHandler(datebeforeToday)).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = dateBeforeToday([
      adapter.FORMAT_DATE,
    ]).handler;

    const dateToday = adapter.format(new Date, adapter.FORMAT_DATE);

    expect(ruleHandler(dateToday)).toBe(false);
  });

  test("should throw exception", function (): void {
    expect(() => dateBeforeToday([])).toThrowError(new Error('Rule accepts only 1 argument (format).'));
  });


  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('dateBeforeToday');
  });
});

describe("rules:dateFormat", (): void => {
  test("should pass", (): void => {
    const ruleHandler = dateFormat([adapter.FORMAT_DATE]).handler;
    expect(ruleHandler("2019-12-24")).toBe(true);
  });

  test("should fail", (): void => {
    const ruleHandler = dateFormat([adapter.FORMAT_DATE]).handler;
    expect(ruleHandler("2021-13-25")).toBe(false);
  });

  test("should throw exception", function (): void {
    expect(() => dateFormat([])).toThrowError(new Error('Rule accepts only 1 argument (format).'));
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

describe("rules:date", (): void => {
  test("should pass", (): void => {
    const ruleHandler = date().handler;
    expect(ruleHandler("2019-12-24")).toBe(true);
    expect(date([adapter.FORMAT_DATE]).handler("2019-12-24")).toBe(true);
  });

  test("should fail", (): void => {
    const ruleHandler = date([adapter.FORMAT_DATE]).handler;
    expect(ruleHandler("2021-13-25")).toBe(false);
    expect(ruleHandler("2021/12/25")).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('date');
  });
});
