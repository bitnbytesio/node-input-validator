import { Langs } from '../contracts';
export declare const DEFAULT_LANG: Langs;
declare function messagesRefByLang(lang: Langs): any;
export declare function extend(newMessages: any, lang?: Langs): void;
export declare function addCustomMessages(customMessages: any, lang?: Langs): void;
export declare function addNiceNames(attributesNiceNames: any, lang?: Langs): void;
export { messagesRefByLang };
