const isObject = (val) => {
    return val !== null && typeof val === 'object';
};
function isNumber(val) {
    return typeof val === 'number';
}
const isString = (val) => {
    return typeof val === 'string';
};
// 是否是一个有效的 key
const isIntegerKey = (key) => isString(key) &&
    key !== 'NaN' &&
    key[0] !== '-' &&
    '' + parseInt(key, 10) === key;
const isArray = Array.isArray;

export { isArray, isIntegerKey, isNumber, isObject, isString };
//# sourceMappingURL=shared.esm-bundler.js.map
