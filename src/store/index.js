import Vue from "vue";
import Vuex from "vuex";
import { keywordStatisticsService } from "./services/keywordStatistics";
import { naverShoppingProductsService } from "./services/naverShoppingProducts";
import { blogService } from "./services/blogService"

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    naverShoppingProductsService,
    keywordStatisticsService,
    blogService 
  },
});

export { store };
