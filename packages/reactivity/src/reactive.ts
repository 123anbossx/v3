import {mutableHandlers,readonlyHandlers,shallowReactiveHandlers,shallowReadonlyHandlers} from "./baseHandlers"
import {isObject} from "@vue/shared"
// 记录当前被代理的对象
export const reactiveMap = new WeakMap()
export const readonlyMap = new WeakMap()
export const shallowReactiveMap = new WeakMap()
export const shallowReadonlyMap = new WeakMap()
// 实现代理的核心
function createReactiveObject(target, isReadonly = false,basehanders,proxyMap){
  // 是不是对象
  if(!isObject(target)){
      console.warn(`target ${target} 必须是一个对象`)
      return target
  }
  if(proxyMap.get(target)){
      return target
  }
  // 处理代理以及收集依赖
  const proxy = new Proxy(target,basehanders)
   proxyMap.set(target,proxy)
   return proxy
}

export function reactive(target){
  return createReactiveObject(target,false,mutableHandlers,reactiveMap)
}
export function readonly(target){
    return createReactiveObject(target,true,readonlyHandlers,readonlyMap)
}
export function shallowReactive(target){
    return createReactiveObject(target,false,shallowReactiveHandlers,shallowReactiveMap)
}
export function shallowReadonly(target){
    return createReactiveObject(target,true,shallowReadonlyHandlers,shallowReadonlyMap)
}