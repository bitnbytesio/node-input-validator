import { ValidationRuleContract } from "../contracts";

const lengths: NodeJS.Dict<number> = {
  md5: 32,
  md4: 32,
  sha1: 40,
  sha256: 64,
  sha384: 96,
  sha512: 128,
  ripemd128: 32,
  ripemd160: 40,
  tiger128: 32,
  tiger160: 40,
  tiger192: 48,
  crc32: 8,
  crc32b: 8,
};

export function hash(args: Array<any>): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Invalid number of arguments.');
  }

  const [algo] = args;

  const len = lengths[algo];

  if (!len) {
    throw new Error(`Algo ${algo} not supported.`);
  }

  return {
    name: "hash",
    handler: (value: any) => {
      const hash = new RegExp(`^[a-fA-F0-9]{${len}}$`);
      return hash.test(value);
    },
  };
}
