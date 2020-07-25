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
  options: NotationLoopOptions = {},
) {
  const { prefix, iterations, seperator } = Object.assign(
    { prefix: [], iterations: 10000, seperator: "." },
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
