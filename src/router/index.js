import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import MainPage from "../pages/MainPage.vue"

export const router = new VueRouter({
  routes: [
    {path: '/', component: MainPage }
  ]
})