export function map(target, callback) {
  return Object.entries(target).map(([key, val], i) => callback(val, key, i));
}
