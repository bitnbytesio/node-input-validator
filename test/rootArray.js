const assert = require('assert');
const { Validator } = require('../lib/index');

describe('Root Level Array', () => {
  it('should pass with array as root level', async () => {
    const v = new Validator(
      [
        { field: 'admin@example.com' },
      ],
      { '*.field': 'required|email' },
    );

    const matched = await v.check();
    assert.equal(matched, true);
  });

  it('should fail with array as root level', async () => {
    const v = new Validator(
      [
        { field: 'string' },
      ],
      { '*.field': 'required|email' },
    );

    const matched = await v.check();
    assert.equal(matched, false);
    v.errors.should.have.key('0.field');
  });

  it('should pass with array as root level contains nested object', async () => {
    const v = new Validator([
      {
        field: {
          email: 'admin@example.com'
        },
      },
    ],
    { '*.field.email': 'required|email' },);

    const matched = await v.check();
    assert.equal(matched, true);
  });

  it('should fail with array as root level contains nested object', async () => {
    const v = new Validator(
      [
        {
          field: {
            email: 'string'
          },
        },
      ],
      { '*.field.email': 'required|email' },
    );
    const matched = await v.check();
    assert.equal(matched, false);
    v.errors.should.have.key('0.field.email');
  });

  it('should pass with array as root level contains nested object', async () => {
    const v = new Validator(
      [
        {
          field: {
            mails: [
              {
                email: 'admin@example.com'
              }
            ],
          },
        },
      ],
      { '*.field.mails.*.email': 'required|email' }
    );

    const matched = await v.check();
    assert.equal(matched, true);
  });

  it('should fail with array as root level contains nested object', async () => {
    const v = new Validator(
      [
        {
          field: {
            mails: [
              {
                email: 'admin@example.com'
              },
              {
                email: 'string'
              },
              {
                email: 'admin@example.com'
              }
            ],
          },
        },
      ],
      { '*.field.mails.*.email': 'required|email' }
    );

    const matched = await v.check();
    assert.equal(matched, false);
    v.errors.should.have.key('0.field.mails.1.email');
  });
});
