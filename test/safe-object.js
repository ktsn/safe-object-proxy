import assert from 'power-assert';
import SafeObject from '../src/safe-object';

describe('SafeObject', () => {
  it('returns matcher function', () => {
    assert(typeof SafeObject({}) === 'function');
  });

  it('returns unwrapped value', () => {
    const actual = SafeObject('test')();

    assert(actual === 'test');
  });

  it('access member values', () => {
    const so = SafeObject({
      foo: 'foo',
      bar: 1,
      baz: { test: true }
    });

    assert(so.foo() === 'foo');
    assert(so.bar() === 1);
    assert(so.baz.test() === true);
  });

  it('access array items', () => {
    const so = SafeObject(['foo', 'bar']);

    assert(so[0]() === 'foo');
    assert(so[1]() === 'bar');
  });

  it('pattern matches member value', () => {
    const so = SafeObject('Exist');

    const a = so(val => val + '123');
    const b = so(
      (val) => 'Success! ' + val,
      () => 'Failed...'
    );

    assert(a === 'Exist123');
    assert(b === 'Success! Exist');
  });

  it('pattern matches null or undefined', () => {
    const a = SafeObject(undefined);
    const b = SafeObject(null);

    const c = a(
      (val) => val,
      () => 'return undefined'
    );
    const d = b(
      (val) => val,
      () => 'return null'
    );

    assert(c === 'return undefined');
    assert(d === 'return null');
  });

  it('sets value to member', () => {
    const so = SafeObject({ a: { b: 'c' } });

    so.foo = 'bar';
    so.a.b = 'd';

    assert(so.foo() === 'bar');
    assert(so.a.b() === 'd');
  });

  it('do nothing if try to set to invalid member', () => {
    const so = SafeObject({
      a: 'test',
      b: 1,
      c: true,
      d: null
    });

    so.a.foo = 'foo';
    so.b.foo = 'foo';
    so.c.foo = 'foo';
    so.d.foo = 'foo';
    so.foo.bar.baz = 'foo';

    assert(so.a.foo() === undefined);
    assert(so.b.foo() === undefined);
    assert(so.c.foo() === undefined);
    assert(so.d.foo() === undefined);
    assert(so.foo.bar.baz() === undefined);
  });
});
