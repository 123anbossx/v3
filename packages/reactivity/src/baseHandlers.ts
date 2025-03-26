import { reactive,readonly } from "./reactive"
import { isObject,isArray,isIntegerKey } from "@vue/shared"
const get = createGetter()
const shallowGet =  createGetter(false, true)
const readonlyGet = createGetter(true)
const shallowReadonlyGet =  createGetter(true, true)
const set =  createSetter()
const shallowSet =  createSetter(true)
function createGetter(isReadonly = false, shallow = false) {
   return function get(target, key, receiver) {
      const res = Reflect.get(target,key,receiver)
      if(!isReadonly){
        // 如果不是只读的，收集依赖
         console.log('收集依赖')
      }
      if(shallow){
        return res
      }
      // 这是一个懒代理，当用户使用这个对象的时候，才去做代理，而不是一开始就代理 （vue2 一上来就跑递归做代理）
      if(isObject(res)){
        return isReadonly ? readonly(res) : reactive(res)
      }
      return res
   }
}
function createSetter(shallow = false) {
   return function set(target, key, value, receiver) {
       let oldValue = target[key]
       if(!shallow){
        //  value = isObject(value)? reactive(value) : value
        //  oldValue = isObject(oldValue)? reactive(oldValue) : oldValue
       }else{

       }
      const result = Reflect.set(target,key,value,receiver)
      console.log('触发更新')
      return result
   }
}
export const mutableHandlers={
    get,
    set
}
export const readonlyHandlers={
   get: readonlyGet,
   set(target, key, value, receiver) {
       console.warn(`key:${key} set 失败，因为 target 是 readonly 类型`,target)
       return true
   }
}
export const shallowReactiveHandlers={
    get: shallowGet,
    set: shallowSet
}
export const shallowReadonlyHandlers={
    get: shallowReadonlyGet,
    set(target, key, value, receiver) {
        console.warn(`key:${key} set 失败，因为 target 是 readonly 类型`,target)
        return true
    }
}