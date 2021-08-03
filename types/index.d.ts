export * from './contracts';
export * as Messages from './messages';
import * as Rules from './rules';
import { Validator } from './validator';
export { Validator, Rules };
export { MomentAdapter, DateFnsAdapter } from './date';
import { Langs, ValidationRuleContract } from './contracts';
import * as config from "./config";
import { DateAdapter } from './date/contracts';
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
