import { ValidationRuleContract } from "../contracts.js";
/**
 * The field under validation must be yes, on, 1, or true.
 * This is useful for validating "Terms of Service" acceptance.
 * @param {Array<string>} args seeds
 */
/**
 * Usage Example
 *
 * ```js
 *  async (req,res) => {
 *    const v = new niv.Validator(req.body, { tandc: 'accepted' })
 *    const passed = await v.validate();
 *    console.log(passed) // output: true/false, depends on input
 *  }
 * ```
 */
export declare function accepted(args?: Array<string>): ValidationRuleContract;
/**
 * The field under validation must be yes, on, 1, or true if the attribute given in the seed present and has value given value.
 * This is useful for validating "Terms of Service" acceptance of some service that is optional and user only have to agree, if user has enabled that service.
 * @param args seeds
 * @param acceptedValues
 */
/**
* Usage Example
*
* ```js
*  async (req,res) => {
*    const v = new niv.Validator(req.body, { tandc: 'acceptedIf:newsletter,yes' })
*    const passed = await v.validate();
*    console.log(passed) // output: true/false, depends on input
*  }
* ```
*/
export declare function acceptedIf(args: Array<string>, acceptedValues?: Array<string>): ValidationRuleContract;
/**
 * The field under validation must no be yes, on, 1, or true if the attribute given in the seed present and has value given value.
 * This is useful for validating "Terms of Service" acceptance of some service that user should not accept if user has disabled that service.
 * @param args seeds
 * @param acceptedValues
 */
/**
* Usage Example
*
* ```js
*  async (req,res) => {
*    const v = new niv.Validator(req.body, { tandc: 'acceptedNotIf:newsletter,no' })
*    const passed = await v.validate();
*    console.log(passed) // output: true/false, depends on input
*  }
* ```
*/
export declare function acceptedNotIf(args: Array<string>, acceptedValues?: Array<string>): ValidationRuleContract;
