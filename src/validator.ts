import * as Rules from './rules/index.js';
import * as PostRules from './post-rules/index.js';
import './messages/index.js';
import { dateAdapter } from "./date/index.js";
import { DateAdapter } from "./date/contracts.js";
import { ValidatorAbstract, registerRules, registerPostRules } from "./validator-abstract.js";

registerRules(Rules);

registerPostRules(PostRules);

export class Validator extends ValidatorAbstract {

  dateAdapter(): DateAdapter {
    return dateAdapter()
  }
}
