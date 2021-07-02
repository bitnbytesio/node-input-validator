import { Validator } from './validator';

export * as Messages from './messages';

import * as rules from './rules';
const Rules = {...rules}

import { Langs, ValidationRuleContract } from './contracts';

import * as config from "./config";
import { DateAdapter } from './date/contracts';

export { Validator, Rules };

export { MomentAdapter, DateFnsAdapter } from './date';

export function configure(customConf: config.IConfig) {
  config.set(customConf);
}

export function useDateAdapter(dateAdapter: DateAdapter) {
  config.modify('dateAdapter', dateAdapter);
}

export function lang(lang: Langs) {
  config.modify('lang', lang);
}

export function addImplicitRule(ruleName:string) {
  config.addImplicitRule(ruleName);
}

export function extend(ruleName: string, ruleFunc: (args?: Array<string>) => ValidationRuleContract) {
  // @ts-ignore
  Rules[ruleName] = ruleFunc;
}

/* istanbul ignore next */
export function koa() {
  return async (ctx: any, next: any) => {
    // @ts-ignore
    ctx.validationErrors = function validationErrors(errors) {
      return {
        body: {
          message: 'The given data is invalid.',
          errors,
        },
      };
    };

    ctx.validate = async function validate(rulesArray: any, inputs: any, useMessages?: any) {
      const v = new Validator(
        inputs || { ...this.request.body, ...this.request.files },
        rulesArray || {},
        useMessages || {},
      );

      if (!(await v.validate())) {
        this.throw(422, this.validationErrors(v.errors));
      }

      return v;
    };

    ctx.validator = (inputs: any, rulesArray: any, useMessages?: any) => new Validator(
      inputs,
      rulesArray,
      useMessages,
    );

    try {
      await next();
    } catch (err) {
      if (err.status && err.status === 422) {
        ctx.type = 'json';
        ctx.status = 422;
        ctx.body = err.body;
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
 export function bailable(sure:boolean) {
  Validator.bailable(sure);
}