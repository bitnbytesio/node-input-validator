const assert = require('assert');

const Validator = require('../index');


describe('Multiple rules test', () => {
  describe('required|minLength|maxLength|alpha', () => {
    it('should return true', async () => {
      // { name: 'required|minLength:5|maxLength:8|alpha' }
      // @ts-ignore
      // Validator.make(
      //   { name: 'artisan' },
      // );

      const v = Validator.make(
        { name: 'artisan' },
        {
          name: ['required', ['minLength', '5'], ['maxLength', '10'], 'alpha'],
        }
      );

      const matched = await v.check();

      // console.log(v.errors);

      assert.equal(matched, true);
    });

    it('should return false due to minLength failed', async () => {
      const v = Validator.make(
        { name: 'art' },
        {
          name: ['required', ['minLength', '5'], ['maxLength', '10'], 'alpha'],
        }
      );

      const matched = await v.check();

      assert.equal(matched, false);
    });

    it('should return false due to lengthBetween failed', async () => {
      const v = Validator.make(
        { uid: 'abcdefghi' },
        {
          uid: ['required', ['lengthBetween', '5', '8'], 'alpha'],
        }
      );
      const matched = await v.check();

      assert.equal(matched, false);
    });

    it('regex delimiters fix', async () => {
      const v = Validator.make(
        { uid: 'xyz' },
        {
          uid: ['required', ['regex', 'abc|xyz']],
        }
      );
      const matched = await v.check();

      assert.equal(matched, true);
    });
  });
});
