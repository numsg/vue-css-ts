import c from './c-elem'
import { stylesToChildComponet } from './helper'

let VueCssTs: any = function VueCssTs() {
  return {
    beforeCreate: function beforeCreate() {
      let _this: any = this;
      stylesToChildComponet(_this);
      let styles = _this.$options.style;
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
    }
  };
};

VueCssTs.install = function (_Vue: any) {
  _Vue.mixin(VueCssTs());
};

export default VueCssTs;
