export const isObject = (val: unknown): val is Record<any, any> => {
    return val !== null && typeof val === 'object'
  }
export function isNumber(val: number):boolean {
    return typeof val === 'number'
  }