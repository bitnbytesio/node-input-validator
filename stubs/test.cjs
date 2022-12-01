const rules = {
  //product: 'requried|object',
  'product.tags': 'required|array',
  // 'product.tags.*': 'string',
  // 'product.categories.*': 'array',
  // 'product.categories.*.id': 'required|string',
  // user: 'object|requried',
  // 'user.id': 'string',
  // name: 'string'
};

function parse(rules) {
  const keys = Object.keys(rules);
  const parsed = {};
  for (const key of keys) {
    let kobj = parsed;
    let path = '';
    key.split('.').forEach((k, i) => {
      path += k;
      console.log(k)
      if (!kobj[k]) {
        kobj[k] = {
          rules: rules[path] ? rules[key].split('|') : [],
          child: {},
        };
      }
      kobj = kobj[k].child;
      path += '.';
    });
  }

  console.log(JSON.stringify(parsed, null, 2))
  return parsed;
}

function makeRules(parsedRules, rules = {}) {
  for (const key in parsedRules) {
    // const set = parsedRules[key];
    // const childKeys = Object.keys(set.child);
    // if (childKeys.length) {
    //   rules[key] = 
    // }
  }
}

makeRules(parse(rules));