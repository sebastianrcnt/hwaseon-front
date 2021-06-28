import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import Antd from "ant-design-vue";
import "es6-promise/auto";
import "ant-design-vue/dist/antd.less";


import { store } from "./store";

Vue.use(Antd);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
