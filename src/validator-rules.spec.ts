import { Validator } from './validator';

describe(
  "Validator:validate string rules",
  function (): void {
    test(
      "should pass",
      async () => {
        const v = new Validator(
          {
            accepted: 'yes',
          },
          {
            accepted: 'required|accepted',
          },
        );
      });
  }
);
