import { Langs, ValidationRuleContract } from './contracts.js';
import * as niv from './index.js';
import * as config from './config.js';

describe(
  "niv:extend",
  function (): void {
    test(
      "should pass, add custom rule",
      async function (): Promise<void> {
        niv.extend('even', (): ValidationRuleContract => {
          return {
            name: 'even',
            handler: (value: any) => {
              if ((parseInt(value) % 2) == 0) {
                return true;
              }
              return false;
            }
          };
        });
      }
    );

    test("should pass, with custom rule", () => {
      // @ts-ignore
      expect(niv.Rules.even().handler("2")).toBe(true);
    });

    test("should pass, with custom rule as string notation", async () => {
      const v = new niv.Validator({ num: 2 }, { num: 'even' });
      const pass = await v.validate();
      expect(pass).toBe(true);
    });

    test("should fail, with custom rule", () => {
      // @ts-ignore
      expect(niv.Rules.even().handler("3")).toBe(false);
    });
  });

describe(
  "niv:Message",
  function (): void {
    test(
      "should have rule messages",
      async function (): Promise<void> {
        expect(typeof niv.Messages.messagesRefByLang(Langs.en_US).required === 'string').toBe(true);
      }
    );

    test(
      "should extend messages",
      async function (): Promise<void> {
        niv.Messages.extend({
          even: 'The attribute value must be an even number.'
        });

        expect(typeof niv.Messages.messagesRefByLang(Langs.en_US).even === 'string').toBe(true);
        expect(typeof niv.Messages.messagesRefByLang(Langs.en_US).evened === 'string').toBe(false);
      }
    );
  });

describe(
  "niv:configure",
  function (): void {
    test('should update config', () => {
      niv.configure({
        // wildcardIterations: 2000,
        // wildcardSeperator: '_',
        lang: Langs.en_US,
        custom: 'value',
      });

      expect(config.get()).toMatchObject({
        // wildcardIterations: 2000,
        // wildcardSeperator: '_',
        lang: Langs.en_US,
        custom: 'value',
      });
    });

    test('should set language', () => {
      niv.lang(Langs.pb);

      expect(config.get().lang).toMatch('pb');
    });
  });
