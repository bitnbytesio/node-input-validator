const assert = require('assert');

const Validator = require('../index');


describe('crash', () => {
  it('passing clousers and hex', async () => {
    const v = new Validator({ name() { }, tape: 0x023 }, { name: 'required', tape: 'required|integer' });

    const matched = await v.passes();

    assert.equal(matched, true);
  });


  it('Checking for invalid rule', async () => {
    try {
      const v = new Validator({ name: 'Harcharan Singh' }, { name: 'required|fullName' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'Error: Invalid Validation Rule: fullName does not exist');
    }
  });
});


describe('acceptedIf exception', () => {
  it('acceptedIf: Checking for invalid arguments', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|acceptedIf' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'Error: Invalid arguments supplied for field attribute in acceptedIf rule.');
    }

    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|acceptedIf:1,2,3' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'Error: Invalid arguments supplied for field attribute in acceptedIf rule.');
    }
  });
});

describe('acceptedNotIf exception', () => {
  it('acceptedNotIf: Checking for invalid arguments', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|acceptedNotIf' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'Error: Invalid arguments supplied for field attribute in acceptedNotIf rule.');
    }

    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|acceptedNotIf:1,2,3' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'Error: Invalid arguments supplied for field attribute in acceptedNotIf rule.');
    }
  });
});

describe('between exception', () => {
  it('Between: Checking for invalid seed count', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|between:a' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'The number of arguments for between in the field attribute are invalid.');
    }
  });


  it('Between: Checking for invalid seed min', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|between:a,10' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'Seeds must be integer for attribute under between rule.');
    }
  });

  it('Between: Checking for invalid seed max', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|between:10,b' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'Seeds must be integer for attribute under between rule.');
    }
  });


  it('Between: Checking for invalid seed min and max', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|between:10,5' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'Seed min must be less then max in between rule for attribute.');
    }
  });
});


describe('lengthBetween exception', () => {
  it('Between: Checking for invalid seed count', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|lengthBetween:a' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'The number of arguments for length between in the field attribute are invalid.');
    }
  });


  it('Between: Checking for invalid seed min', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|lengthBetween:a,10' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'Seeds must be integer for lengthBetween rule.');
    }
  });

  it('Between: Checking for invalid seed max', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|lengthBetween:10,b' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'Seeds must be integer for lengthBetween rule.');
    }
  });


  it('Between: Checking for invalid seed min and max', async () => {
    try {
      const v = new Validator({ attribute: '789456' }, { attribute: 'required|lengthBetween:10,5' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'Seed min must be less then max in lengthBetween.');
    }
  });
});

describe('digitsBetween exception', () => {
  it('Non numeric value', async () => {
    const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|digitsBetween' });

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('Between: Checking for invalid seed count', async () => {
    try {
      const v = new Validator({ attribute: '789456' }, { attribute: 'required|digitsBetween:a' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'The number of arguments for digits between rule in the field attribute are invalid.');
    }
  });


  it('Between: Checking for invalid seed min', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|digitsBetween:a,10' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'Seeds must be integer for attribute under digits between rule.');
    }
  });

  it('Between: Checking for invalid seed max', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|digitsBetween:10,b' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'Seeds must be integer for digits between rule.');
    }
  });


  it('Between: Checking for invalid seed min and max', async () => {
    try {
      const v = new Validator({ attribute: '789456123' }, { attribute: 'required|digitsBetween:10,5' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'Seed min must be less then max in digits between rule for attribute.');
    }
  });
});


describe('max exception', () => {
  it('max: Checking for invalid seed', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|max:test' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'Seed in max rule for attribute must be a number.');
    }
  });
});


describe('min exception', () => {
  it('min: Checking for invalid seed', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|min:test' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'Seed in min rule for attribute must be a number.');
    }
  });
});


describe('maxLength exception', () => {
  it('maxLength: Checking for invalid seed', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|maxLength:test' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'Seed in maxLength rule for attribute must be a number.');
    }
  });
});


describe('minLength exception', () => {
  it('minLength: Checking for invalid seed', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|minLength:test' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'Seed in minLength rule for attribute must be a number.');
    }
  });
});

describe('digits exception', () => {
  it('digits: Checking for invalid seed', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|digits:test' });

      await v.check();

      // assert.equal(matched, true);
    } catch (e) {
      assert.equal(e, 'Please provide a numeric value for attribute under digits rule.');
    }
  });
});
