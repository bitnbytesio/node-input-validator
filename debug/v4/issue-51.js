// issue:51 in version 4
const nodeInputValidator = require("node-input-validator")

nodeInputValidator.extend(
  'exists',
  async ({ value, args }) => {
    const results = await new Promise((resolve) => {
      setTimeout(() => {
        resolve([3, 7, 13, 19].indexOf(value) >= 0);
      }, 500);
    });
    return results;
  }
)

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
      antennaPresetId: 6, // this should have returned error
      gpsPresetId: 13,
      servicePresetId: 19,
    },
  ],
};

async function test() {
  const v = new nodeInputValidator.Validator(inputs, rules);

  const passed = await v.validate();

  console.log({ passed, errors: v.errors })
}

test();