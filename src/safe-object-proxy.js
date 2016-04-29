function noop() {}

function get(target, key) {
  const obj = target();
  if (obj !== null && typeof obj === 'object') {
    return SafeObject(obj[key]);
  } else {
    return SafeObject();
  }
}

function set(target, key, val) {
  const obj = target();
  if (obj !== null && typeof obj === 'object') {
    obj[key] = val;
  }
  return true;
}

export default function SafeObject(obj) {
  function match(some, none = noop) {
    return obj != null ? some(obj) : none();
  }
  return new Proxy((some, none) => {
    if (!some && !none) return obj;
    return match(some, none);
  }, { get, set });
}
