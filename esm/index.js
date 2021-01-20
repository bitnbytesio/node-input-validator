var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Validator } from './validator';
export * as Messages from './messages';
import * as Rules from './rules';
import * as config from "./config";
export { Validator, Rules };
export function configure(customConf) {
    config.set(customConf);
}
export function lang(lang) {
    config.set({
        lang,
    });
}
export function extend(ruleName, ruleFunc) {
    // @ts-ignore
    Rules[ruleName] = ruleFunc;
}
/* istanbul ignore next */
export function koa() {
    return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        ctx.validationErrors = function validationErrors(errors) {
            return {
                body: {
                    message: 'The given data is invalid.',
                    errors,
                },
            };
        };
        ctx.validate = function validate(rulesArray, inputs, useMessages) {
            return __awaiter(this, void 0, void 0, function* () {
                const v = new Validator(inputs || Object.assign(Object.assign({}, this.request.body), this.request.files), rulesArray || {}, useMessages || {});
                if (!(yield v.validate())) {
                    this.throw(422, this.validationErrors(v.errors));
                }
                return v;
            });
        };
        ctx.validator = (inputs, rulesArray, useMessages) => new Validator(inputs, rulesArray, useMessages);
        try {
            yield next();
        }
        catch (err) {
            if (err.status && err.status === 422) {
                ctx.type = 'json';
                ctx.status = 422;
                ctx.body = err.body;
                return;
            }
            throw err;
        }
    });
}
//# sourceMappingURL=index.js.map