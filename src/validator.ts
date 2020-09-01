import * as RulesProvider from './rules';
import './messages';
import { dateAdapter } from "./date";
import { DateAdapter } from "./date/contracts";
import { ValidatorAbstract } from "./utils/validator-abstract";

export class Validator extends ValidatorAbstract {

  dateAdapter(): DateAdapter {
    return dateAdapter()
  }
}
