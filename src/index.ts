export { Validator } from './validator';

export * as Messages from './messages';

export * as Rules from './rules';

export function extend(ruleName: string, callback: Function) {
  // @ts-ignore
  Rules[ruleName] = callback;
}
