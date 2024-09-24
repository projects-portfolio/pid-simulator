/*
* Miscellaneous helper functions for the PID controller
*/

// handles output limits for our PID
export function bound(value: any, lower: number, upper: number) {
  if (lower !== null && value < lower) {
    return lower;
  } else if (upper !== null && value > upper) {
    return upper;
  }
  return value;
}