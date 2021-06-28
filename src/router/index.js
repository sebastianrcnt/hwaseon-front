import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import CategoryPage from "../pages/CategoryPage.vue";

export const router = new VueRouter({
  routes: [
    { path: "/features/category", component: CategoryPage },
    { path: "/features/tracking", component: CategoryPage },
    { path: "/features/summary", component: CategoryPage },
    { path: "/features/blog", component: CategoryPage },
  ],
});
