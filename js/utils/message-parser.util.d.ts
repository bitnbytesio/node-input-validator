interface MessageParserParams {
    message: string;
    attrName: string;
    ruleArgs?: any;
    ruleName: string;
    attrValue?: any;
}
export declare function messageParser(params: MessageParserParams): string;
export {};
