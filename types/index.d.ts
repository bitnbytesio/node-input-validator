export * from './contracts.js';
export * as Messages from './messages/index.js';
import { Rules } from './rules.js';
import { Validator } from './validator.js';
export { Validator, Rules };
export { MomentAdapter, DateFnsAdapter } from './date/index.js';
import { Langs, ValidationRuleContract } from './contracts.js';
import * as config from "./config.js";
import { DateAdapter } from './date/contracts.js';
export declare function configure(customConf: Partial<config.IConfig>): void;
export declare function useDateAdapter(dateAdapter: DateAdapter): void;
export declare function lang(lang: Langs): void;
export declare function addImplicitRule(ruleName: string): void;
export declare function extend(ruleName: string, ruleFunc: (args?: Array<string>) => ValidationRuleContract): void;
interface KoaValidatorContext {
    request: {
        body: Record<string, unknown>;
        files: Record<string, unknown>;
    };
    type: string;
    status: number;
    body: unknown;
    throw(status: number, body: unknown): never;
    validationErrors(errors: unknown): {
        body: {
            message: string;
            errors: unknown;
        };
    };
    validate(rulesArray: unknown, inputs: unknown, useMessages?: unknown): Promise<Validator>;
    validator(inputs: unknown, rulesArray: unknown, useMessages?: unknown): Validator;
}
export declare function koa(): (ctx: KoaValidatorContext, next: () => Promise<void>) => Promise<void>;
/**
 * enable/disable multiple errors output
 * @param {boolean} sure
 */
export declare function bailable(sure: boolean): void;
