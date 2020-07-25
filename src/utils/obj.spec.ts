import { getValuesByWildCardStringNotation } from "./obj.util";

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
