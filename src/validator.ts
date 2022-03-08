import Rules from './rules';
import * as PostRules from './post-rules';
import './messages';
import { dateAdapter } from "./date";
import { DateAdapter } from "./date/contracts";
import { ValidatorAbstract, registerRules, registerPostRules } from "./validator-abstract";

registerRules(Rules);

registerPostRules(PostRules);

export class Validator extends ValidatorAbstract {

  dateAdapter(): DateAdapter {
    return dateAdapter()
  }
}
