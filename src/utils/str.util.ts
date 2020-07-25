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
