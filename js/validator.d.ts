import { ValidatorErrorContract, NiceNamesContract, ValidationRulesContract, ValidationRuleStringNotationContract, MessagesContract, AttributeValidationMinimalInfo, ValidationRuleContract } from "./contracts";
export declare class Validator {
    private inputs;
    private rules;
    private customMessages;
    errors: ValidatorErrorContract;
    niceNames: NiceNamesContract;
    hasCustomMessages: boolean;
    notationMap: any;
    notationVals: any;
    hasNestedRules: boolean;
    parsedRulesCollection: ValidationRulesContract;
    /**
     * init validator
     * @param inputs
     * @param rules
     * @param customMessages
     */
    constructor(inputs: any, rules?: ValidationRulesContract | ValidationRuleStringNotationContract, customMessages?: MessagesContract);
    /**
     * parse provided rules and inputs
     */
    parse(): void;
    parseRules(): void;
    /**
     * parse rules those are in string notation
     * @param attrRules attribute string rules
     */
    parseStringNotationRules(attrRules: string): Array<ValidationRuleContract>;
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
    validateAttribute(attrName: string, attrRules: Array<ValidationRuleContract>): void;
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
     * does we have any dirty/failed input
     */
    hasErrors(): boolean;
    /**
     * get validation errors
     */
    getErrors(): any;
}
