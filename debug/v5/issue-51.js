const niv = require("../../cjs/index");

const { Validator } = niv;

niv.extend("asyncIn", (args = []) => {
  return {
    name: 'asyncIn',
    async: true,
    handler: async (value) => {
      const results = await new Promise((resolve) => {
        setTimeout(() => {
          if (args.indexOf(value) >= 0) {
            resolve(true);
            return;
          }

          resolve(false);
        }, 500);
      });
      console.log({results})
      return results;
    },
  }
});

async function testArray() {
  const v = new Validator({ "status": ["active"] }, { "status.*": "asyncIn:active,inactive" });

  const matched = await v.validate();

  console.log({ matched })
}

// testArray();

niv.extend("exists", () => {
  return {
    name: 'exists',
    async: true,
    handler: async (value) => {
      const results = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([3, 7, 13, 19].indexOf(value) >= 0);
        }, 500);
      });
      return results;
    },
  }
});

const rules = {
  name: 'required|string|lengthBetween:3,30',
  presetId: 'required|exists:testPresets',
  additionalPresets: 'required|array',
  'additionalPresets.*.antennaPresetId': 'required|exists:testPresets',
  'additionalPresets.*.gpsPresetId': 'required|exists:testPresets',
  'additionalPresets.*.servicePresetId': 'required|exists:testPresets',
}

const inputs = {
  name: 'test',
  presetId: 3,
  additionalPresets: [
    {
      antennaPresetId: 6,
      gpsPresetId: 13,
      servicePresetId: 19,
    },
  ],
};

async function test() {
  const v = new Validator(inputs, rules);

  const passed = await v.validate();

  console.log({ passed, errors: v.errors })
}

test();
