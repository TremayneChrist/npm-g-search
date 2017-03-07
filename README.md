# g-search
Searches for installed global modules

```
$ npm i g-search
```

## gSearch(query)

**query** `String|RegExp` (optional)

Query used for searching globally installed node modules. If left blank, all globally installed modules will be returned.

```js
const gSearch = require('g-search')

gSearch('bower').then(modules => console.log(modules))
// [{ name: 'bower', version: '1.8.0' }, { name: 'bower-art-resolver', version: '2.0.8' }]
```
