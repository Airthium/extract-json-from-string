# Forked from [extract-json-from-string](https://www.npmjs.com/package/extract-json-from-string)

# extract-json-from-string

Extract JSON/javascript objects from strings

## Installation

`npm install --save extract-json-from-string`

## Summary

Extract random JSON and javascript objects from a longer string, e.g. "Expected { foo: 'bar' } to equal { foo: 'baz' }" (I'm looking at you jasmine 1.3). Also works with arrays.

## Usage

Just pass the string into the one exported function and get a list of objects and arrays contained therein returned to you. If the string contains no valid objects or arrays (**_valid_** objects or arrays), you'll get an empty array back.

### Node

```js
const extract = require('extract-json-from-string')

let objects = extract('Expected { foo: "bar" } to equal { foo: "baz" }')
// [
//   { foo: 'bar' },
//   { foo: 'baz' }
// ]
```

### Browser

```js
let objects = window.extractJson(
  'Expected { foo: "bar" } to equal { foo: "baz" }'
)
// [
//   { foo: 'bar' },
//   { foo: 'baz' }
// ]
```

## N.B.

For the time being, I've written a very naive implementation. There are lots of ways to break this (like stringified JSON or escaped quotes within the value of a property). Please report any issues, and I'll do my best to fix them and make it _less_ naive.

## Contributing

Please see [the contribution guidelines](CONTRIBUTING.md).
