import * as config from '../config';

export function getKeyValue(key: string) {
  return (obj: any) => obj[key];
}

export function namedArgs(params: Array<string>) {
  const obj = {};
  if (!Array.isArray(params)) {
    return obj;
  }

  params.forEach((i) => {
    const [k, v] = i.split("=");
    if (v && v.length) {
      // @ts-ignore
      obj[k.trim()] = v.trim() || null;
    }
  });

  return obj;
}

export function getValueByStringNotation(
  object: any,
  notation: string,
): string {
  const notationArr: Array<string> = notation.split(".");

  let value: any;

  notationArr.map((item) => {
    if (value === undefined) {
      value = object[item];
    } else {
      value = value[item];
    }
    return value;
  });

  return value;
}

export function isIterable(object: any) {
  return object != null &&
    (typeof object === "object" || Array.isArray(object));
}

interface NotationLoopOptions {
  prefix?: Array<any>;
  iterations?: number;
  matchKeys?: Array<string>;
  seperator?: string;
}

export function getValuesByWildCardStringNotation(
  iterable: any,
  rules: any = {},
  options: NotationLoopOptions = {},
) {
  const currentConfig = config.get();

  const { prefix, iterations, seperator } = Object.assign(
    { prefix: [], iterations: currentConfig.wildcardIterations, seperator: currentConfig.wildcardSeperator },
    options,
  );

  const notationsVals: any = {};
  const notationMap: any = {};

  let iterationsCount = 1;

  const parse = (data: any, prefix: Array<any>) => {
    iterationsCount++;

    if (iterationsCount > iterations) {
      // eslint-disable-next-line no-console
      throw new Error(`Max(${iterations}) repetation was reached.`);
    }

    Object.keys(data).forEach((key: any, index: number) => {
      const v = data[key];

      const notationKey = `${[...prefix, key].join(seperator)}`;
      const notationMapKey = notationKey.replace(/\.[0-9+]\./g, ".*.").replace(
        /^[0-9+]\./g,
        "*.",
      );
      notationMap[notationMapKey] = notationMap[notationMapKey] || [];
      notationMap[notationMapKey].push(notationKey);

      if (isIterable(v)) {
        parse(v, [...prefix, key]);
        notationsVals[notationKey] = v;
      } else {
        notationsVals[notationKey] = v;
      }
    });
  };

  parse(iterable, [...prefix]);

  return { notationsVals, notationMap };
}

// export function fillMissingSpots(target: any, key: string | Array<string>, value: any, overwrite: boolean = true) {
//   const segments: Array<string> = Array.isArray(key) ? [...key] : key.split('.');
//   const segment: any = segments.shift();

//   if (segment === '*') {
//     if (!Array.isArray(target)) {
//       target = [];
//     }

//     if (segments.length) {
//       Object.keys(target).forEach((targetKey) => {
//         // console.log(segments, target[targetKey]);
//         fillMissingSpots(target[targetKey], segments, value, overwrite);
//       });
//     } else if (overwrite) {
//       Object.keys(target).forEach((targetKey) => {
//         target[targetKey] = value;
//       });
//     }
//   } else if (typeof target === 'object') {
//     if (segments.length) {
//       if (!target[segment]) {
//         target[segment] = [];
//       }
//       fillMissingSpots(target[segment], segments, value, overwrite)
//     } else if (target[segment]) {
//       target[segment] = target[segment];
//     } else if (overwrite || !target[segment]) {
//       target[segment] = value;
//     }
//   } else {
//     target = [];
//     if (segments.length) {
//       fillMissingSpots(target[segment], segments, value, overwrite)
//     } else if (overwrite) {
//       target[segment] = value;
//     }
//   }

//   return target;
// }

 export function isObject(item:any) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}