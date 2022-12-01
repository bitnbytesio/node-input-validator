export * from './contracts.js';
export * as Messages from './messages/index.js';
import * as Rules from './rules/index.js';
import { Validator } from './validator.js';
export { Validator, Rules };
export { MomentAdapter, DateFnsAdapter } from './date/index.js';
import { Langs, ValidationRuleContract } from './contracts.js';
import * as config from "./config.js";
import { DateAdapter } from './date/contracts.js';
export declare function configure(customConf: config.IConfig): void;
export declare function useDateAdapter(dateAdapter: DateAdapter): void;
export declare function lang(lang: Langs): void;
export declare function addImplicitRule(ruleName: string): void;
export declare function extend(ruleName: string, ruleFunc: (args?: Array<string>) => ValidationRuleContract): void;
export declare function koa(): (ctx: any, next: any) => Promise<void>;
/**
 * enable/disable multiple errors output
 * @param {boolean} sure
 */
export declare function bailable(sure: boolean): void;
