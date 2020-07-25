import * as Messages from './messages';
import { getKeyValue } from '../utils/obj.util';
import { Langs } from '../contracts';

export const DEFAULT_LANG: Langs = Langs.en_US;

function messagesRefByLang(lang: Langs) {
  let messages = getKeyValue(lang.toString())(Messages);

  if (typeof messages === "undefined") {
    // @ts-ignore
    Messages[lang] = { messages: {} };

    messages = getKeyValue(lang.toString())(Messages);
  }

  return messages;
};

export function extend(newMessages: any, lang: Langs = Langs.en_US) {
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

  Object.assign(messages[lang].$niceNames, attributesNiceNames);
}

export { messagesRefByLang }
