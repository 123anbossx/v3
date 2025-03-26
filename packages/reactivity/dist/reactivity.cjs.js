'use strict';

const isObject = (val) => {
    return val !== null && typeof val === 'object';
};

const get = createGetter();
const shallowGet = createGetter(false, true);
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);
const set = createSetter();
const shallowSet = createSetter(true);
function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) {
        const res = Reflect.get(target, key, receiver);
        if (!isReadonly) {
            // 如果不是只读的，收集依赖
            console.log('收集依赖');
        }
        if (shallow) {
            return res;
        }
        // 这是一个懒代理，当用户使用这个对象的时候，才去做代理，而不是一开始就代理 （vue2 一上来就跑递归做代理）
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res);
        }
        return res;
    };
}
function createSetter(shallow = false) {
    return function set(target, key, value, receiver) {
        target[key];
        const result = Reflect.set(target, key, value, receiver);
        console.log('触发更新');
        return result;
    };
}
const mutableHandlers = {
    get,
    set
};
const readonlyHandlers = {
    get: readonlyGet,
    set(target, key, value, receiver) {
        console.warn(`key:${key} set 失败，因为 target 是 readonly 类型`, target);
        return true;
    }
};
const shallowReactiveHandlers = {
    get: shallowGet,
    set: shallowSet
};
const shallowReadonlyHandlers = {
    get: shallowReadonlyGet,
    set(target, key, value, receiver) {
        console.warn(`key:${key} set 失败，因为 target 是 readonly 类型`, target);
        return true;
    }
};

// 记录当前被代理的对象
const reactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
const shallowReactiveMap = new WeakMap();
const shallowReadonlyMap = new WeakMap();
// 实现代理的核心
function createReactiveObject(target, isReadonly = false, basehanders, proxyMap) {
    // 是不是对象
    if (!isObject(target)) {
        console.warn(`target ${target} 必须是一个对象`);
        return target;
    }
    if (proxyMap.get(target)) {
        return target;
    }
    // 处理代理以及收集依赖
    const proxy = new Proxy(target, basehanders);
    proxyMap.set(target, proxy);
    return proxy;
}
function reactive(target) {
    return createReactiveObject(target, false, mutableHandlers, reactiveMap);
}
function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyMap);
}
function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers, shallowReactiveMap);
}
function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyMap);
}

exports.reactive = reactive;
exports.readonly = readonly;
exports.shallowReactive = shallowReactive;
exports.shallowReadonly = shallowReadonly;
//# sourceMappingURL=reactivity.cjs.js.map
