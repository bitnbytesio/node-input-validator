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
            status: 'draft',
          },
          {
            accepted: 'required|accepted',
            status: 'in:draft,public',
          },
        );
      });
  }
);
