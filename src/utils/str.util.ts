export function camelCaseToSentance(str: string): string {
  return str.replace(/([A-Z]+)/g, " $1").trimLeft().toLowerCase();
}

export function snakeCaseToSentance(str: string): string {
  return str.replace(/_/g, " ");
}

export function kebabCaseToSentance(str: string): string {
  return str.replace(/-/g, " ");
}

export function replaceAll(
  str: string,
  replaceWhat: string,
  replaceWith: string,
): string {
  return str.replace(new RegExp(replaceWhat, "g"), replaceWith);
}

export function trim(string: string, char: string = " "): string {
  let str = string;

  if (str.charAt(0) === char) {
    str = str.substr(1, str.length);
  }

  const len = str.length;

  if (str.charAt(len - 1) === char) {
    str = str.substr(0, len - 1);
  }

  return str.toString();
}

export function sizeToBytes(inputSize: string): number {
  const size = inputSize.toLowerCase();

  /* istanbul ignore next */
  if (size.includes('gb') || size.includes('g')) {
    return parseInt(size.replace('gb', '').replace('g', '')) * 1024 * 1024 * 1024;
  }

  /* istanbul ignore next */
  if (size.includes('mb') || size.includes('m')) {
    return parseInt(size.replace('mb', '').replace('m', '')) * 1024 * 1024;
  }

  /* istanbul ignore next */
  if (size.includes('kb') || size.includes('k')) {
    return parseInt(size.replace('kb', '').replace('k', '')) * 1024;
  }

  /* istanbul ignore next */
  if (size.includes('b')) {
    return parseInt(size.replace('b', ''));
  }

  /* istanbul ignore next */
  return parseInt(size) * 1024;
};

const hexadecimal = /^(0x|0h)?[0-9A-F]+$/i;

export function isHexadecimal(value: string) {
  return hexadecimal.test(value);
}
