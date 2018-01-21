/***********
 * 数据类型
 * @type {obj}
 */
import getType from 'lib/util/getType';
import getNode from 'lib/dom/isNode';

export const isNumber = (obj) => getType(obj) === "number";
export const isString = (obj) => getType(obj) === "string";
export const isArray = (obj) => getType(obj) === "array";
export const isObject = (obj) => getType(obj) === "object";
export const isBoolean = (obj) => getType(obj) === "boolean";
export const isFunction = (obj) => getType(obj) === "function";
export const isNull = (obj) => getType(obj) === "null";
export const isUndefined = (obj) => getType(obj) === "undefined";
export const isNode = (node) => getNode(node);
export const isElement = (element) => isNode(element) && element.nodeType === 1;

