import { isObject, isString, isEmptyObject } from './helper'

/**
 * 劫持 VUE createElement 方法，注入样式绑定逻辑
 *
 * @export
 * @param {*} _this
 * @returns {*}
 */
export default function c(_this: any): any {
  let args = Array.prototype.slice.call(arguments, 1);
  let fn = _this.createElement;
  let context = _this.context === void 0 ? {} : _this.context;
  let styles = _this.styles === void 0 ? context.$style || {} : _this.styles;
  if (isString(styles)) {
    styles = context[styles] || {};
  }
  if (isEmptyObject(styles)) {
    return fn.apply(null, args);
  }
  const classData: any = args[1];
  if (!isObject(args[1])) {
    return fn.apply(null, args);
  }
  classData['staticClass'] = classData['staticClass'] ? classData['staticClass'] : '';
  classData['class'] = classData['class'] ? classData['class'] : '';
  classData['attrs'] = classData['attrs'] ? classData['attrs'] : '';
  let staticClasss = classData['staticClass'] || classData.attrs['staticClass'] || '';

  let classs = [];
  classs = handleObjectClass(classData['class']);

  handleAllClassData(staticClasss, classs, classData, styles);
  return fn.apply(null, args);
}

/**
 *  处理动态绑定class
 *
 * @param {*} objectClass
 * @returns {*}
 */
function handleObjectClass(objectClass: any): any {
  let classes = [];
  if (isString(objectClass) || Array.isArray(objectClass)) {
    classes = Array.isArray(objectClass) ? objectClass : [objectClass]
  } else if (isObject(objectClass)) {
    for (let o in objectClass) {
      if (objectClass[o]) {
        classes.push(o);
      }
    }
    // classes.push('el-menu--horizontal');
  } else {
    classes = [];
  }
  return classes;
}

/**
 *  处理整体样式
 *
 * @param {*} staticClasss
 * @param {*} classs
 * @param {*} classData
 * @param {*} styles
 */
function handleAllClassData(staticClasss: any, classs: any, classData: any, styles: any) {
  if (staticClasss.length || classs.length) {
    let classArray = Array.isArray(staticClasss) ? staticClasss : [staticClasss];
    classArray = classArray.concat(classs);
    classData.staticClass = '';
    for (let i in classArray) {
      if (classArray[i] === void 0)
        continue;
      let classOne = classArray[i].split(/\s+/g);
      classOne.forEach((className: any) => {
        if (styles[className.trim()]) {
          classData.staticClass += " " + styles[className.trim()];
        } else {
          classData.staticClass += " " + className;
        }
      })
    }
    classData.class = '';
  }
}
