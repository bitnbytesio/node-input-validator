import { isObject } from './obj.util.js';

export function reallyEmpty(value: any): boolean {
  const str = (value === undefined || value === null ? "" : value) + "";

  return str.length === 0;
}

export function mergeDeep(target: any, ...sources: any): void {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

export function fillMissingSpots(target: any, key: string | Array<string>) {
  // convert key to an array or clone is already an array
  const segments = Array.isArray(key) ? [...key] : key.split('.');
  // pull the first key from array
  const segment = segments.shift();

  if (segment === '*') {
    if (!Array.isArray(target)) {
      target = [];
    }

    if (segments.length) {
      if (!target.length) {
        const targetVal: NodeJS.Dict<any> = {};
        targetVal[segments[0]] = null;
        target.push(targetVal);
        console.log('create new target', target);
      }
      target.forEach((childTarget: any) => {
        fillMissingSpots(childTarget, segments);
      });
    }
  } else if (typeof target === 'object') {
    if (segments.length) {
      if (segment && !target[segment]) {
        target[segment] = segments[0] === '*' ? [] : {};
      }
      if (target && segment && target[segment]) {
        fillMissingSpots(target[segment], segments);
      }
    }
  }
}