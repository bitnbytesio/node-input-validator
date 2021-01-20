import './messages';
import { DateAdapter } from "./date/contracts";
import { ValidatorAbstract } from "./validator-abstract";
export declare class Validator extends ValidatorAbstract {
    dateAdapter(): DateAdapter;
}
