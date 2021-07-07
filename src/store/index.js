import Vue from "vue";
import Vuex from "vuex";
import { keywordStatisticsService } from "./services/keywordStatistics";
import { naverShoppingProductsService } from "./services/naverShoppingProducts";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    naverShoppingProductsService,
    keywordStatisticsService
  },
});

export { store };
