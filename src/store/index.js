import Vue from "vue";
import Vuex from "vuex";
import { naverShoppingProductsService } from "./services/naverShoppingProducts";

Vue.use(Vuex);


const store = new Vuex.Store({
  modules: {
    naverShoppingProductsService,
  },
});

export { store };
