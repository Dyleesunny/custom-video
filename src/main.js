// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'iview/dist/styles/iview.css'; //引入iview样式
// import "@/public/theme/iview-theme.less"; //引入主题修改
import "@/style/common.less"; //常用样式类


import Col from "iview/src/components/grid/col.vue";
import Row from "iview/src/components/grid/row.vue";
import { Progress, Slider, Icon } from "iview";

Vue.config.productionTip = false;

Vue.component("Progress", Progress);
Vue.component("Slider", Slider);
Vue.component("Icon", Icon);
Vue.component("Row", Row);
Vue.component("Col", Col);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

