# Nano It
Tiny test library.

## Usage
```bash
$ node it.js file-to-test.js second-file-to-test.js ....
```

## Example test
```javascript
it('1 + 1 = 2', () => {
  assert(1 + 1 === 2)
})

it('1 + 1 = 2 with mock', () => {
  mock('./add', () => 2)
  const add = require('./add')

  assert(add(1, 1) === 2)
})
```
