import { getValuesByWildCardStringNotation } from "./obj.util.js";
import *  as objUtil from "./obj.util.js";

const input: any = {
  event: {
    name: "event name",
  },
  users: [
    {
      name: "test",
      contacts: [{
        code: 13,
      }],
    },
    {
      name: "rest",
      contacts: [{
        code: 14,
        contactPerson: {
          name: "Contact Person",
        },
      }],
    },
  ],
};

const inputs = [input];
const inp = {
  user: {
    address: {
      contacts: {
        phone: "Test",
      },
    },
  },
};

const inpf = {
  name: "username",
  email: "user@example.com",
};

describe('util:obj:getValuesByWildCardStringNotation', (): void => {
  test("util:obj:getValuesByWildCardStringNotation", (): void => {
    const { notationsVals, notationMap } = getValuesByWildCardStringNotation(
      inputs,
    );
    expect(notationsVals).toMatchObject({
      0: inputs[0],
      "0.event": inputs[0].event,
      "0.event.name": inputs[0].event.name,

      "0.users": inputs[0].users,
      "0.users.0": inputs[0].users[0],
      "0.users.0.name": inputs[0].users[0].name,
      "0.users.1": inputs[0].users[1],
      "0.users.1.name": inputs[0].users[1].name,

      "0.users.0.contacts": inputs[0].users[0].contacts,
      "0.users.0.contacts.0": inputs[0].users[0].contacts[0],
      "0.users.0.contacts.0.code": inputs[0].users[0].contacts[0].code,

      "0.users.1.contacts": inputs[0].users[1].contacts,
      "0.users.1.contacts.0": inputs[0].users[1].contacts[0],
      "0.users.1.contacts.0.code": inputs[0].users[1].contacts[0].code,

      "0.users.1.contacts.0.contactPerson":
        inputs[0].users[1].contacts[0].contactPerson,
      "0.users.1.contacts.0.contactPerson.name":
        inputs[0].users[1].contacts[0].contactPerson.name,
    });

    const compareMap = {
      // '*': ["0"],
      "0": ["0"],

      "*.event": ["0.event"],
      "*.event.name": ["0.event.name"],

      "*.users": ["0.users"],
      // "*.users.*": ["0.users.0", "0.users.1"],
      "*.users.0": ["0.users.0"],
      "*.users.1": ["0.users.1"],
      "*.users.*.name": ["0.users.0.name", "0.users.1.name"],

      "*.users.*.contacts": ["0.users.0.contacts", "0.users.1.contacts"],
      "*.users.*.contacts.0": ["0.users.0.contacts.0", "0.users.1.contacts.0"],
      //"*.users.*.contacts.*": ["0.users.0.contacts.0", "0.users.1.contacts.0"],
      "*.users.*.contacts.*.code": [
        "0.users.0.contacts.0.code",
        "0.users.1.contacts.0.code",
      ],
      "*.users.*.contacts.*.contactPerson": [
        "0.users.1.contacts.0.contactPerson",
      ],
      "*.users.*.contacts.*.contactPerson.name": [
        "0.users.1.contacts.0.contactPerson.name",
      ],
    };
    expect(notationMap).toMatchObject(compareMap);
  });
})

describe('util:obj', (): void => {
  test('obj:namedArgs with non array', () => {
    // @ts-ignore
    expect(objUtil.namedArgs('postStatus')).toMatchObject({});
  })

  test('obj:namedArgs with array', () => {
    expect(objUtil.namedArgs(['width=200', 'height=200']))
      .toMatchObject({
        width: '200',
        height: '200',
      });
  })

  test('obj:namedArgs with array', () => {
    expect(objUtil.getValueByStringNotation({
      product: {
        name: 'abc',
      },
    }, 'product.name'))
      .toMatch('abc');
  })

  test('obj:namedArgs with flat value', () => {
    expect(objUtil.getValueByStringNotation({
      product: 'abc',
    }, 'product'))
      .toMatch('abc');
  })

  test('obj:getValueByStringNotation returns undefined for missing property', () => {
    expect(objUtil.getValueByStringNotation({
      product: { name: 'abc' },
    }, 'product.missing'))
      .toBeUndefined();
  })

  test('obj:getValueByStringNotation returns undefined for deeply missing property', () => {
    expect(objUtil.getValueByStringNotation({
      product: { name: 'abc' },
    }, 'product.missing.deep'))
      .toBeUndefined();
  })

  test('obj:getValueByStringNotation returns null when intermediate value is null', () => {
    expect(objUtil.getValueByStringNotation({
      product: null,
    }, 'product.name'))
      .toBeNull();
  })

  test('obj:getValueByStringNotation returns null for property with null value', () => {
    expect(objUtil.getValueByStringNotation({
      product: { name: null },
    }, 'product.name'))
      .toBeNull();
  })

  test('obj:getValueByStringNotation handles deeply nested null', () => {
    expect(objUtil.getValueByStringNotation({
      a: { b: null },
    }, 'a.b.c.d'))
      .toBeNull();
  })

  test('obj:getValueByStringNotation returns undefined when root object is null', () => {
    expect(objUtil.getValueByStringNotation(null, 'product.name'))
      .toBeNull();
  })

  test('obj:getValueByStringNotation returns undefined when root object is undefined', () => {
    expect(objUtil.getValueByStringNotation(undefined, 'product.name'))
      .toBeUndefined();
  })
});
