/**
 * 判断是否是对象
 *
 * @export
 * @param {*} obj
 * @returns {boolean}
 */
export function isObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object'
}

/**
 * 判断是否是string
 *
 * @export
 * @param {*} str
 * @returns
 */
export function isString(str: any) {
  return typeof str === 'string';
}

/**
 * 判断对象是否是空
 *
 * @export
 * @param {*} obj
 * @returns
 */
export function isEmptyObject(obj: any) {
  return Object.keys(obj).length === 0;
}

/**
 * 判断是否是function
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function isFn(fn: any) {
  return typeof fn === "function";
}

/**
 * 对样式进行处理，判断样式是否需要传递到子组件
 * 如果需要传递到子组件，则打包好样式返回对应的对象
 *
 * @param {*} styles
 * @returns {*}
 */
function handleStyles(styles: any): any {
  let objStyles: any = [];
  if (!isObject(styles) && !isEmptyObject(styles)) {
    return objStyles;
  }
  for (let p in styles) {
    if (p.match(/c____+\d+____/)) {
      let pMatch: any = p.match(/c____+\d+____/);
      let s = pMatch[0];
      let c = s.match(/\d/)[0];
      let cInt = parseInt(c);
      let childStyleName;
      let lastChildStyleName;
      if (cInt > 0) {
        let lastName = p.substr(10, p.length - 10);
        childStyleName = 'c____' + (cInt - 1) + '____' + lastName;
        lastChildStyleName = lastName;
        objStyles.push({
          c: c,
          p: p,
          styleName: styles[p],
          childStyleName: childStyleName,
          lastChildStyleName: lastChildStyleName
        });
      }
    }
  }
  return objStyles;
}


/**
 * 样式向子组件传递
 *
 * @export
 * @param {*} _this
 * @returns
 */
export function stylesToChildComponet(_this: any) {
  let parent = _this.$parent;
  let styles = _this.$options.style;
  if (!parent) {
    return;
  }
  if (isObject(parent.$options.style)) {
    let parentStyle = parent.$options.style;
    if (!parentStyle) {
      return;
    }
    let pStyleObject: any = handleStyles(parentStyle);
    if (styles === void 0) {
      styles = _this.$options.style = {};
    }
    pStyleObject.forEach((element: any) => {
      if (parseInt(element.c) > 0) {
        styles[element.childStyleName] = element.styleName;
        styles[element.lastChildStyleName] = element.styleName;
      }
    });
  }
}
