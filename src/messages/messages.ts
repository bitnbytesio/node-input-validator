import { Langs } from "../contracts.js";
import * as en_US from "./en-US.messages.js";
import { extend } from './provider.js';

extend(en_US.messages, Langs.en_US);

export { en_US };
