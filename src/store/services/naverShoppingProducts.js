import { fetchNaverShoppingProducts } from "../../fetchers/index";

export const naverShoppingProductsService = {
  namespaced: true,
  state: () => {
    return {
      products: [],
      loading: false,
    };
  },
  mutations: {
    reset(state) {
      state.products = [];
    },
    set(state, products) {
      state.products = products;
    },
    start(state) {
      state.loading = true;
    },
    end(state) {
      state.loading = false;
    },
  },
  getters: {
    naverShoppingProductsDataSource(state) {
      return state.products.map((keywordData, index) => {
        return {
          ...keywordData,
          key: index,
        };
      });
    },
  },
  actions: {
    fetch({ commit }, keyword) {
      commit("start");
      fetchNaverShoppingProducts(keyword)
        .then((products) => {
          commit("set", products);
        })
        .finally(() => {
          commit("end");
        });
    },
    clear({ commit }) {
      commit("reset");
    },
  },
};
