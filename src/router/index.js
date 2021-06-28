import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import CategoryPage from "../pages/CategoryPage.vue";
import TrackingPage from "../pages/TrackingPage.vue";
import BigDataSummaryPage from "../pages/BigDataSummaryPage.vue";
import BlogSEOPage from "../pages/BlogSEOPage.vue";

export const router = new VueRouter({
  routes: [
    { path: "/features/category", component: CategoryPage },
    { path: "/features/tracking", component: TrackingPage },
    { path: "/features/summary", component: BigDataSummaryPage },
    { path: "/features/blog", component: BlogSEOPage },
  ],
});
