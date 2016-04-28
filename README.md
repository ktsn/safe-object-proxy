# safe-object

[![npm version](https://badge.fury.io/js/safe-object-proxy.svg)](https://badge.fury.io/js/safe-object-proxy)
[![Build Status](https://travis-ci.org/ktsn/safe-object-proxy.svg?branch=master)](https://travis-ci.org/ktsn/safe-object-proxy)

Safe property access for JavaScript objects using Proxy Object.

## Requirement

[Proxy Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
(Latest Chrome and Firefox support it!)

## Example

```js
import SafeObject from 'safe-object-proxy';

const so = SafeObject({
  foo: 'hello',
  bar: {
    baz: true
  },
  test: [0, 1, 2]
});

so.foo(); // 'hello'
so.bar.baz(); // true
so.test[1](); // 1
so.throws.no.error.property.not.exists(); // undefined

so.bar.baz = false; // You can update properties
so.bar.bar.bar = 'Not updated'; // Do nothing if you try to update the property not exists

// pattern match whether the property is exist or not
so.foo(
  (val) => val + ' world';
  () => 'Nothing'
); // 'hello world'

so.foofoo(
  (val) => 'This is never called',
  () => 'Nothing'
); // 'Nothing'
```

## Use Case

It will be useful to use for untrusted data like the response data of an Ajax request.

```js
fetch('/api/somthing')
  .then(res => res.json)
  .then(json => SafeObject(json))
  .then(data => {
    console.log(data.user.media.uploadedImages[0]());
  });
```

## License

MIT
