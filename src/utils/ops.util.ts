export function reallyEmpty(value: any): boolean {
  const str = (value === undefined || value === null ? "" : value) + "";

  return str.length === 0;
}
