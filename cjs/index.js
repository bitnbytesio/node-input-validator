"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.koa = exports.extend = exports.lang = exports.configure = exports.Rules = exports.Validator = void 0;
const validator_1 = require("./validator");
Object.defineProperty(exports, "Validator", { enumerable: true, get: function () { return validator_1.Validator; } });
exports.Messages = __importStar(require("./messages"));
const Rules = __importStar(require("./rules"));
exports.Rules = Rules;
const config = __importStar(require("./config"));
function configure(customConf) {
    config.set(customConf);
}
exports.configure = configure;
function lang(lang) {
    config.set({
        lang,
    });
}
exports.lang = lang;
function extend(ruleName, ruleFunc) {
    // @ts-ignore
    Rules[ruleName] = ruleFunc;
}
exports.extend = extend;
/* istanbul ignore next */
function koa() {
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
                const v = new validator_1.Validator(inputs || Object.assign(Object.assign({}, this.request.body), this.request.files), rulesArray || {}, useMessages || {});
                if (!(yield v.validate())) {
                    this.throw(422, this.validationErrors(v.errors));
                }
                return v;
            });
        };
        ctx.validator = (inputs, rulesArray, useMessages) => new validator_1.Validator(inputs, rulesArray, useMessages);
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
exports.koa = koa;
//# sourceMappingURL=index.js.map