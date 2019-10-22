import c from './c-elem'
import { stylesToChildComponet } from './helper'
import localStorage from './local-storage'

let VueCssTs: any = function VueCssTs() {
  return {
    beforeCreate: function beforeCreate() {
      let _this: any = this;
      stylesToChildComponet(_this);
      let styles = _this.$options.style;
      /*
      * 拓展css-module 换肤实现
      */
      const theme = localStorage.get('system-theme');
      if (Array.isArray(_this.$options.themes) && _this.$options.themes.length > 0
        && theme && theme !== '') {
        const result = _this.$options.themes.filter((t: any) => t.name === theme);
        if (Array.isArray(result) && result.length > 0) {
          styles = result[0].style;
        }
      }
      _this.original$createElement = _this.original$createElement || _this.$createElement;
      _this.original_c = _this.original_c || _this._c;
      _this.$createElement = c.bind(_this, {
        createElement: _this.original$createElement,
        context: _this,
        styles: styles
      });
      _this._c = c.bind(_this, {
        createElement: _this.original_c,
        context: _this,
        styles: styles
      });
    },
    /*
      *  1. 释放第三方插件中的bind及对象
    */
    destroyed() {
      let _this: any = this;
      _this._c = null;
      _this.original_c = null;
      _this.$parent = null;
      _this.original$createElement = null;
      _this.$createElement = null;
      _this.$options = null;
    }
  };
};

VueCssTs.install = function (_Vue: any) {
  _Vue.mixin(VueCssTs());
};

export default VueCssTs;
