import { Validator } from './validator';

export * as Messages from './messages';

import * as Rules from './rules';

import { Langs, ValidationRuleContract } from './contracts';

import * as config from "./config";

export { Validator, Rules };

export function configure(customConf: config.IConfig) {
  config.set(customConf);
}

export function lang(lang: Langs) {
  config.set({
    lang,
  });
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
