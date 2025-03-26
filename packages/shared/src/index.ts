export const isObject = (val: unknown): val is Record<any, any> => {
    return val !== null && typeof val === 'object'
  }
export function isNumber(val: number):boolean {
    return typeof val === 'number'
}
export const isString = (val:unknown):boolean => {
    return typeof val === 'string'
}
// 是否是一个有效的 key
export const isIntegerKey = (key) =>
  isString(key) &&
  key !== 'NaN' &&
  key[0] !== '-' &&
  '' + parseInt(key, 10) === key
export const isArray = Array.isArray