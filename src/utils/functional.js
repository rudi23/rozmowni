export const curryN = (length, fn) =>
  function applyArgs(...args) {
    return args.length < length
      ? (...newArgs) => applyArgs(...args, ...newArgs)
      : fn(...args);
  };

export const curry = (fn) => curryN(fn.length, fn);

export const compose =
  (...fns) =>
  (input) =>
    fns.reduceRight((result, fn) => fn(result), input);
