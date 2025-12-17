export * from './contracts.js';

export * as Messages from './messages/index.js';

import { Rules } from './rules.js';

import { Validator } from './validator.js';

export { Validator, Rules };

export { MomentAdapter, DateFnsAdapter } from './date/index.js';

import { Langs, ValidationRuleContract, ValidationRuleStringNotationContract } from './contracts.js';

import * as config from "./config.js";

import { DateAdapter } from './date/contracts.js';

export function configure(customConf: Partial<config.IConfig>) {
  config.set(customConf);
}

export function useDateAdapter(dateAdapter: DateAdapter) {
  config.modify('dateAdapter', dateAdapter);
}

export function lang(lang: Langs) {
  config.modify('lang', lang);
}

export function addImplicitRule(ruleName: string) {
  config.addImplicitRule(ruleName);
}

export function extend(ruleName: string, ruleFunc: (args?: Array<string>) => ValidationRuleContract) {
  Rules[ruleName] = ruleFunc;
}

interface KoaValidatorContext {
  request: { body: Record<string, unknown>; files: Record<string, unknown> };
  type: string;
  status: number;
  body: unknown;
  throw(status: number, body: unknown): never;
  validationErrors(errors: unknown): { body: { message: string; errors: unknown } };
  validate(rulesArray: unknown, inputs: unknown, useMessages?: unknown): Promise<Validator>;
  validator(inputs: unknown, rulesArray: unknown, useMessages?: unknown): Validator;
}

/* istanbul ignore next */
export function koa() {
  return async (ctx: KoaValidatorContext, next: () => Promise<void>) => {
    ctx.validationErrors = function validationErrors(errors: unknown) {
      return {
        body: {
          message: 'The given data is invalid.',
          errors,
        },
      };
    };

    ctx.validate = async function validate(this: KoaValidatorContext, rulesArray: unknown, inputs: unknown, useMessages?: unknown) {
      const v = new Validator(
        inputs || { ...this.request.body, ...this.request.files },
        rulesArray as ValidationRuleStringNotationContract,
        useMessages as Record<string, string>,
      );

      if (!(await v.validate())) {
        this.throw(422, this.validationErrors(v.errors));
      }

      return v;
    };

    ctx.validator = (inputs: unknown, rulesArray: unknown, useMessages?: unknown) => new Validator(
      inputs,
      rulesArray as ValidationRuleStringNotationContract,
      useMessages as Record<string, string>,
    );

    try {
      await next();
    } catch (err: unknown) {
      const error = err as { status?: number; body?: unknown };
      if (error.status && error.status === 422) {
        ctx.type = 'json';
        ctx.status = 422;
        ctx.body = error.body;
        return;
      }
      throw err;
    }
  };
}

/**
 * enable/disable multiple errors output
 * @param {boolean} sure
 */
export function bailable(sure: boolean) {
  Validator.bailable(sure);
}