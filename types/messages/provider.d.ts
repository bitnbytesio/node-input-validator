import { Langs, MessagesContract, MessagesDictContract } from "../contracts.js";
export declare const DEFAULT_LANG: Langs;
export declare function messagesRefByLang(lang: Langs): any;
export declare function extend(newMessages: MessagesContract | MessagesDictContract, lang?: Langs): void;
export declare function addCustomMessages(customMessages: any, lang?: Langs): void;
export declare function addNiceNames(attributesNiceNames: any, lang?: Langs): void;
