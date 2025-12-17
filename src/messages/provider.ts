import { getKeyValue } from "../utils/obj.util.js";
import { Langs, MessagesContract, MessagesDictContract } from "../contracts.js";

export const DEFAULT_LANG: Langs = Langs.en_US;

const MessagesRef: Record<string, { messages: Record<string, unknown> }> = {};

export function messagesRefByLang(lang: Langs) {
  let messages = getKeyValue(lang.toString())(MessagesRef);

  if (typeof messages === "undefined") {
    MessagesRef[lang] = { messages: {} };

    messages = getKeyValue(lang.toString())(MessagesRef);
  }

  return messages;
}

export function extend(newMessages: MessagesContract | MessagesDictContract, lang: Langs = Langs.en_US) {
  const messages = messagesRefByLang(lang);

  Object.assign(messages, newMessages);
}

export function addCustomMessages(customMessages: any, lang: Langs = Langs.en_US) {
  const messages = messagesRefByLang(lang);

  if (!messages.$custom) {
    messages.$custom = {};
  }

  Object.assign(messages.$custom, customMessages);
}

export function addNiceNames(attributesNiceNames: any, lang: Langs = Langs.en_US) {
  const messages = messagesRefByLang(lang);

  if (!messages.$niceNames) {
    messages.$niceNames = {};
  }

  Object.assign(messages.$niceNames, attributesNiceNames);
}
