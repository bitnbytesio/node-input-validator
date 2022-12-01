import { ValidationRuleContract , ValidatorContract} from "../contracts.js";

export function sometimes(): ValidationRuleContract {
    return {
      name: "sometimes",
      handler: (_: any, v:ValidatorContract, attrName:string) => {
        if (v.isAttributePresent(attrName) === false) {
            v.release();
        }
      },
    };
  }

  export function nullable(): ValidationRuleContract {
    return {
      name: "nullable",
      handler: (value: any, v:ValidatorContract) => {
        if( value === null) {
            v.release();
        }
      },
    };
  }