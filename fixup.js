const fs = require('fs');

fs.writeFileSync('cjs/package.json', JSON.stringify({
    "type": "commonjs"
}, null, 2));

fs.writeFileSync('esm/package.json', JSON.stringify({
    "type": "module"
}, null, 2));