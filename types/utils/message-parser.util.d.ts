import { MessageProviderFuncation } from '../contracts.js';
interface MessageParserParams {
    message: string | MessageProviderFuncation;
    attrName: string;
    niceName?: string;
    ruleArgs?: any;
    ruleName: string;
    attrValue?: any;
}
export declare function messageParser(params: MessageParserParams): string;
export {};
