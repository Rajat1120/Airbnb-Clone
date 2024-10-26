export function areAllKeysTruthy(obj) {
  if (obj) {
    return Object.values(obj).every((value) => Boolean(value));
  }
}
