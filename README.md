# VUE-CSS-TS
Local style processing in Vue for ts-oriented development mode

[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/vue-css-ts)

## License
MIT License

## Install

```bash
npm install vue-css-ts
```
## Example
[see example](https://github.com/numsg/vue-seed)

## Usage

### Basic usage
1. import
```ts
import Vue from 'vue';

import VueTsCss from 'vue-css-ts';
Vue.use(VueTsCss);
```
2. in html，eg： error.html
```html
<div>
  <p class="page-container">404 page not found</p>
   <div class="button-green">111
      <el-collapse accordion>
      <el-collapse-item title="1111111" name="4">
          <div class="condition-content-zone">
            66666666666666666666
          </div>
        </el-collapse-item>
        </el-collapse>
   </div>
</div>
```
3. in css or scss eg: error.scss
``` css
.page-container {
  font-size: 20px;
  text-align: center;
  color: rgb(192, 204, 218);
}

.button-green {  
  background-color: green;  
}
```

Note:

* If the style file name like `error.scss`, the style is a `global` style, and if the file name is `error.module.scss`, the style is a `scoped` style

4. in ts eg: error.ts
```ts
import { Vue, Component } from 'vue-property-decorator';
import { ErrorChildComponent } from './error-component/error.biz'

import Styles from './error.module.scss';
import ErrorHtml from './error.html';

@Component({
    template: ErrorHtml,
    style: Styles,
    components: {
      'err-con': ErrorChildComponent
    }
  })
export class ErrorComponent extends Vue {

}
```

### How to modify third-party component styles scoped

1. import
```ts
import Vue from 'vue';

import VueTsCss from 'vue-css-ts';
Vue.use(VueTsCss);
```
2. in parent html
```html
<div>
  <p class="page-container">404 page not found</p>
   <div class="button-green">111
      <el-collapse accordion>
      <el-collapse-item title="1111111" name="4">
          <div class="condition-content-zone">
            66666666666666666666
          </div>
        </el-collapse-item>
        </el-collapse>
   </div>
</div>
```
in child html
``` html
<div class="el-collapse-item__wrap">
  33333
</div>
```
3. in parent scss
``` css
.page-container {
  font-size: 20px;
  text-align: center;
  color: rgb(192, 204, 218);
}

.button-green {  
  background-color: green;  
}
```
in child scss
```scss
.page-container {
  font-size: 20px;
  text-align: center;
  color: rgb(192, 204, 218);
}

.button-green {  
  background-color: green;  
}

.c____2____el-collapse-item__wrap {
  background-color: red;  
}
```
Note:

* `c____2____el-collapse-item__wrap` `c` stands for passing styles to child components, and number `2` represent the level of child components

* `c____100____el-collapse-item__wrap` `c` stands for passing styles to all child components, and number `100` represent the level of child components

4. in parent ts
``` ts
@Component({
    template: ErrorHtml,
    style: Styles,
    components: {
      'err-con': ErrorChildComponent
    }
  })
export class ErrorComponent extends Vue {

}
```
in child ts
``` ts
@Component({
  template: require('./error.biz.html'),
  components: {
    'child-biz': ErrorBizChildComponent
  }
})
export class ErrorChildComponent extends Vue {

}
```
