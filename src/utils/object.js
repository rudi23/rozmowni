import { curry, compose } from './functional';
import { filter } from './array';

export const fromEntries = (list) =>
  list.reduce((acc, [key, val]) => {
    acc[key] = val;

    return acc;
  }, {});

export const omitBy = curry((fn, obj) =>
  compose(
    fromEntries,
    filter(([key, val]) => !fn(val, key)),
    Object.entries,
  )(obj),
);
