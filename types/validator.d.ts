import './messages/index.js';
import { DateAdapter } from "./date/contracts.js";
import { ValidatorAbstract } from "./validator-abstract.js";
export declare class Validator extends ValidatorAbstract {
    dateAdapter(): DateAdapter;
}
