var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { messageParser } from "./utils/message-parser.util";
import { implicitRules } from "./implicit-rules";
import { reallyEmpty } from "./utils/ops.util";
import { getValuesByWildCardStringNotation } from "./utils/obj.util";
import { parseStringNotationRules, parseStringRule } from "./utils/rules-parser.util";
import * as MessagesProvider from './messages/provider';
import * as config from './config';
let RulesProvider = {};
export function registerRules(rules) {
    // Object.keys(rules).forEach((rule) => {
    //   RulesProvider[rule] = rules[rule];
    // });
    // return RulesProvider;
    return RulesProvider = rules;
}
export class ValidatorAbstract {
    /**
     * init validator
     * @param inputs
     * @param rules
     * @param customMessages
     */
    constructor(inputs, rules = {}, customMessages = {}) {
        this.inputs = inputs;
        this.rules = rules;
        this.customMessages = customMessages;
        // validation errors collection
        this.errors = {};
        // local custom attributes collection
        this.localNiceNames = {};
        // do we have custom messages?
        this.hasCustomMessages = false;
        this.notationMap = {};
        this.notationVals = {};
        // do we have nested rules?
        this.hasNestedRules = false;
        // rules collection
        this.parsedRulesCollection = {};
        this.lang = config.get('lang');
        this.hasCustomMessages = Object.keys(customMessages).length > 0;
        this.parse();
    }
    /**
     * parse provided rules and inputs
     */
    parse() {
        this.parseRules();
        this.parseInputs();
    }
    parseRules() {
        let attr;
        for (attr of Object.keys(this.rules)) {
            if (attr.indexOf(".")) {
                this.hasNestedRules = true;
            }
            const attrRules = this.rules[attr];
            if (typeof attrRules === 'string') {
                this.parsedRulesCollection[attr] = parseStringNotationRules(RulesProvider, attrRules);
            }
            else {
                attrRules.forEach((strRule, index) => {
                    if (typeof strRule === 'string') {
                        attrRules[index] = parseStringRule(RulesProvider, strRule);
                    }
                });
                // @ts-ignore
                this.parsedRulesCollection[attr] = attrRules;
            }
            // sort rules as
            this.parsedRulesCollection[attr].sort((obj) => {
                return (implicitRules.indexOf(obj.name) >= 0) ? -1 : 1;
            });
        }
    }
    parseInputs() {
        if (!this.hasNestedRules) {
            return;
        }
        const { notationMap, notationsVals } = getValuesByWildCardStringNotation(this.inputs);
        this.notationMap = notationMap;
        this.notationVals = notationsVals;
        const keys = Object.keys(this.notationMap);
        const len = keys.length;
        let i = 0;
        for (i; i < len; i += 1) {
            const key = keys[i];
            const attrRules = this.parsedRulesCollection[key];
            if (attrRules && key.indexOf('*') >= 0) {
                this.notationMap[key].forEach((attrName) => {
                    this.parsedRulesCollection[attrName] = attrRules;
                });
            }
        }
    }
    /**
     * apply this set of filters to inputs
     * @param filters set of filters
     */
    applyFilters(filters) {
        // future ref
    }
    /**
    * apply post validation rules
    * @param rules post rules
    */
    applyPostRules(rules) {
        // to-do
    }
    /**
     * validate inputs againest rules
     */
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = Object.keys(this.parsedRulesCollection);
            const len = keys.length;
            let i = 0;
            const promises = [];
            for (i; i < len; i += 1) {
                const attrName = keys[i];
                if (attrName.indexOf('*') < 0) {
                    const attrRules = this.parsedRulesCollection[attrName];
                    if (attrRules) {
                        promises.push(this.validateAttribute(attrName, attrRules));
                    }
                }
            }
            yield Promise.all(promises);
            return !this.hasErrors();
        });
    }
    /**
    * apply rules on attribute
    * @param attrName attribute name
    * @param attrRules attribute rules
    */
    validateAttribute(attrName, attrRules) {
        return __awaiter(this, void 0, void 0, function* () {
            let i = 0;
            let len = attrRules.length;
            for (i; i < len; i += 1) {
                const validationRule = attrRules[i];
                const attrValue = this.attributeValue(attrName);
                if (
                // no implicit rule and attribute value is empty
                (implicitRules.indexOf(validationRule.name) < 0 &&
                    reallyEmpty(attrValue)) ||
                    // attribute can be nullable
                    (validationRule.name === "nullable" && attrValue === null) ||
                    // attribute will only be validated if presents
                    (validationRule.name === "sometimes" &&
                        this.isAttributePresent(attrName) === false)) {
                    return;
                }
                // console.log('attr val', attrValue);
                const passed = yield validationRule.handler(attrValue, this, attrName);
                if (!passed) {
                    this.createAttributeError({
                        attrName,
                        attrValue,
                        ruleName: validationRule.name,
                        ruleArgs: validationRule.args,
                    });
                }
            }
        });
    }
    /**
    * this will create error object for attribute
    * @param params info object
    */
    createAttributeError(params) {
        const { attrName, ruleName } = params;
        this.errors[attrName] = {
            rule: ruleName,
            message: this.createAttributeErrorMessage(params),
        };
    }
    /**
     * this will return parsed error message as per rule or input
     * @param params object with attr and rule name, value, args
     */
    createAttributeErrorMessage(params, useDefaultMessage = true) {
        const { attrName, ruleName, attrValue, ruleArgs } = params;
        const messagesCollection = MessagesProvider.messagesRefByLang(this.lang);
        const defaultMessage = messagesCollection.$default;
        let message;
        // check for local scope messages
        if (this.hasCustomMessages) {
            message = this.customMessages[`${attrName}.${ruleName}`] ||
                this.customMessages[ruleName] ||
                this.customMessages[attrName];
        }
        // not found in local scope, check for global scope
        if (!message) {
            message = (messagesCollection.$custom &&
                messagesCollection.$custom[`${attrName}.${ruleName}`]) ||
                (messagesCollection.$custom && messagesCollection.$custom[attrName]) ||
                messagesCollection[ruleName];
            if (useDefaultMessage && !message) {
                message = defaultMessage;
            }
        }
        let attributeName = attrName;
        let niceName;
        // check if we have nice name in local scope
        if (this.localNiceNames[attrName]) {
            niceName = this.localNiceNames[attrName];
        }
        else if (messagesCollection.$niceNames && messagesCollection.$niceNames[attrName]) {
            // check if we have nice name in global scope
            niceName = messagesCollection.$niceNames[attrName];
        }
        return messageParser({
            message,
            attrName: attributeName,
            niceName,
            ruleName,
            attrValue,
            ruleArgs,
        });
    }
    /**
    * get attribute value by its name
    * @param attr attribute name
    */
    attributeValue(attr) {
        return this.inputs[attr] || this.notationVals[attr];
    }
    /**
     * check if attribute has value
     * @param attr attribute name
     */
    doAttributeHasValue(attr) {
        return this.attributeValue(attr) === undefined ? true : false;
    }
    /**
     * does attribute present in given inputs
     * @param attr attribute name
     */
    isAttributePresent(attr) {
        if (this.inputs[attr] || this.notationVals[attr]) {
            return true;
        }
        return false;
    }
    /**
     * does we have any dirty/failed input
     */
    hasErrors() {
        return Object.keys(this.errors).length > 0;
    }
    /**
     * get validation errors
     */
    getErrors() {
        return this.errors;
    }
    niceNames(niceNames) {
        this.localNiceNames = niceNames;
    }
}
//# sourceMappingURL=validator-abstract.js.map