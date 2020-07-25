"use strict";
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
exports.Validator = void 0;
const contracts_1 = require("./contracts");
const obj_util_1 = require("./utils/obj.util");
const ops_util_1 = require("./utils/ops.util");
const message_parser_util_1 = require("./utils/message-parser.util");
const RulesProvider = require("./rules");
const MessagesProvider = require("./messages");
const implicitRules = [
    "required",
    "requiredIf",
    "requiredNotIf",
    "requiredWith",
    "requiredWithout",
    "accepted",
    "sometimes",
    "nullable",
];
class Validator {
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
        // errors collection
        this.errors = {};
        // local custom attributes collecction
        this.niceNames = {};
        // do we have local custom messages?
        this.hasCustomMessages = false;
        this.notationMap = {};
        this.notationVals = {};
        // do we have nested rules?
        this.hasNestedRules = false;
        // rules collection
        this.parsedRulesCollection = {};
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
                this.parsedRulesCollection[attr] = this.parseStringNotationRules(attrRules);
            }
            else {
                // @ts-ignore
                this.parsedRulesCollection[attr] = attrRules;
            }
            // sort rules as
            this.parsedRulesCollection[attr].sort((obj) => {
                return (implicitRules.indexOf(obj.name) >= 0) ? -1 : 1;
            });
        }
    }
    /**
     * parse rules those are in string notation
     * @param attrRules attribute string rules
     */
    parseStringNotationRules(attrRules) {
        const rulesStrArr = attrRules.split("|");
        const rulesArr = [];
        rulesStrArr.forEach((ruleStr) => {
            const ruleNameAndArgs = ruleStr.split(":");
            const [ruleName, ruleArgsStr] = ruleNameAndArgs;
            let args;
            if (ruleArgsStr) {
                args = ruleArgsStr.split(",");
            }
            const ruleProvider = obj_util_1.getKeyValue(ruleName)(RulesProvider);
            if (!ruleProvider) {
                throw new Error(`Rule ${ruleName} does not exists.`);
            }
            const ruleObj = ruleProvider(args);
            rulesArr.push(ruleObj);
        });
        return rulesArr;
    }
    parseInputs() {
        if (!this.hasNestedRules) {
            return;
        }
        const { notationMap, notationsVals } = obj_util_1.getValuesByWildCardStringNotation(this.inputs);
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
            for (i; i < len; i += 1) {
                const attrName = keys[i];
                if (attrName.indexOf('*') < 0) {
                    const attrRules = this.parsedRulesCollection[attrName];
                    if (attrRules) {
                        this.validateAttribute(attrName, attrRules);
                    }
                }
            }
            return !this.hasErrors();
        });
    }
    /**
    * apply rules on attribute
    * @param attrName attribute name
    * @param attrRules attribute rules
    */
    validateAttribute(attrName, attrRules) {
        let i = 0;
        let len = attrRules.length;
        for (i; i < len; i += 1) {
            const validationRule = attrRules[i];
            const attrValue = this.attributeValue(attrName);
            if (
            // no implicit rule and attribute value is empty
            (implicitRules.indexOf(validationRule.name) < 0 &&
                ops_util_1.reallyEmpty(attrValue)) ||
                // attribute can be nullable
                (validationRule.name === "nullable" && attrValue === null) ||
                // attribute will only be validated if presents
                (validationRule.name === "sometimes" &&
                    this.doAttributeHasValue(attrValue) === false)) {
                return;
            }
            // console.log('attr val', attrValue);
            if (!validationRule.handler(attrValue, this)) {
                this.createAttributeError({
                    attrName,
                    attrValue,
                    ruleName: validationRule.name,
                    ruleArgs: validationRule.args,
                });
            }
        }
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
        const messagesCollection = MessagesProvider.messagesRefByLang(contracts_1.Langs.en_US);
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
                messagesCollection[ruleName] ||
                (messagesCollection.$custom && messagesCollection.$custom[attrName]);
            if (useDefaultMessage && !message) {
                message = defaultMessage;
            }
        }
        let attributeName = attrName;
        // check if we have nice name in local scope
        if (this.niceNames[attrName]) {
            attributeName = this.niceNames[attrName];
        }
        else if (messagesCollection.$niceNames && messagesCollection.$niceNames[attrName]) {
            // check if we have nice name in global scope
            attributeName = messagesCollection.$niceNames[attrName];
        }
        return message_parser_util_1.messageParser({
            message,
            attrName: attributeName,
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
}
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map