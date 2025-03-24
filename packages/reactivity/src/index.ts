import { isNumber } from "@vue/shared"
export function reactive(target: object) {
    return new Proxy(target, {})
  }
 console.log(isNumber(1)) 
