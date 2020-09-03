import * as Rules from './rules';
import './messages';
import { dateAdapter } from "./date";
import { DateAdapter } from "./date/contracts";
import { ValidatorAbstract, registerRules } from "./validator-abstract";

registerRules(Rules);

export class Validator extends ValidatorAbstract {

  dateAdapter(): DateAdapter {
    return dateAdapter()
  }
}
