import * as Rules from './rules';
import './messages';
import { dateAdapter } from "./date";
import { ValidatorAbstract, registerRules } from "./validator-abstract";
registerRules(Rules);
export class Validator extends ValidatorAbstract {
    dateAdapter() {
        return dateAdapter();
    }
}
//# sourceMappingURL=validator.js.map