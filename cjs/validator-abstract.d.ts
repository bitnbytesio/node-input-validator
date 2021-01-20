import { Langs, AttributeValidationMinimalInfo, ValidationRuleContract, ValidationRulesContract, ValidationRuleStringNotationContract, MessagesContract, NiceNamesContract, ValidatorErrorContract, ValidationRuleArrayStringNotationContract } from "./contracts";
export declare function registerRules(rules: any): any;
export declare abstract class ValidatorAbstract {
    private inputs;
    private rules;
    private customMessages;
    errors: ValidatorErrorContract;
    localNiceNames: NiceNamesContract;
    hasCustomMessages: boolean;
    notationMap: any;
    notationVals: any;
    hasNestedRules: boolean;
    parsedRulesCollection: ValidationRulesContract;
    lang: Langs;
    /**
     * init validator
     * @param inputs
     * @param rules
     * @param customMessages
     */
    constructor(inputs: any, rules?: ValidationRulesContract | ValidationRuleStringNotationContract | ValidationRuleArrayStringNotationContract, customMessages?: MessagesContract);
    /**
     * parse provided rules and inputs
     */
    parse(): void;
    parseRules(): void;
    parseInputs(): void;
    /**
     * apply this set of filters to inputs
     * @param filters set of filters
     */
    applyFilters(filters: any): void;
    /**
    * apply post validation rules
    * @param rules post rules
    */
    applyPostRules(rules: any): void;
    /**
     * validate inputs againest rules
     */
    validate(): Promise<boolean>;
    /**
    * apply rules on attribute
    * @param attrName attribute name
    * @param attrRules attribute rules
    */
    validateAttribute(attrName: string, attrRules: Array<ValidationRuleContract>): Promise<void>;
    /**
    * this will create error object for attribute
    * @param params info object
    */
    createAttributeError(params: AttributeValidationMinimalInfo): void;
    /**
     * this will return parsed error message as per rule or input
     * @param params object with attr and rule name, value, args
     */
    createAttributeErrorMessage(params: AttributeValidationMinimalInfo, useDefaultMessage?: boolean): string;
    /**
    * get attribute value by its name
    * @param attr attribute name
    */
    attributeValue(attr: string): any;
    /**
     * check if attribute has value
     * @param attr attribute name
     */
    doAttributeHasValue(attr: string): boolean;
    /**
     * does attribute present in given inputs
     * @param attr attribute name
     */
    isAttributePresent(attr: string): boolean;
    /**
     * does we have any dirty/failed input
     */
    hasErrors(): boolean;
    /**
     * get validation errors
     */
    getErrors(): any;
    niceNames(niceNames: NiceNamesContract): void;
}
