import moment from "moment";
import {
  fetchNaverSearchAutocompleteKeywords,
  fetchNaverShoppingProductCount,
  fetchProductRankWithinKeywordsCoupang,
  fetchPublishCount,
  fetchRelativeRatio,
  fetchRelKeywordStatistics,
  fetchSearchSectionOrder,
} from "../../fetchers";
import { last2Month, lastMonth, today } from "../../utils/time";

export const keywordStatisticsService = {
  namespaced: true,
  state: () => {
    return {
      loading: false,
      // relkeyword
      relKeywordStatistics: { keywords: [] },
      // autocomplete
      naverSearchAutocompleteKeywords: [],
      naverShoppingAutocompleteKeywords: [],
      // publish count
      lastBlogPublishCount: 0,
      lastCafePublishCount: 0,
      blogPublishCount: 0,
      cafePublishCount: 0,
      // relative ratio
      totalSearchCountRelativeRatio: 0,
      // section order
      pcSectionOrder: [],
      mobileSectionOrder: [],
    };
  },
  mutations: {
    reset(state) {
      state.products = [];
    },
    set(state, { key, value }) {
      state[key] = value;
    },
    start(state) {
      state.loading = true;
    },
    end(state) {
      state.loading = false;
    },
  },
  getters: {
    pcSearchCount(state) {
      return state.relKeywordStatistics?.data?.monthlyPcQcCnt;
    },
    mobileSearchCount(state) {
      return state.relKeywordStatistics?.data?.monthlyMobileQcCnt;
    },
    totalSearchCount(state, getters) {
      return getters.pcSearchCount + getters.mobileSearchCount || 0;
    },
    // publishCounts
    totalPublishCount(state) {
      return state.blogPublishCount + state.cafePublishCount || 0;
    },
    totalLastPublishCount(state) {
      return state.lastCafePublishCount + state.lastBlogPublishCount || 0;
    },
    publishCountDeltaRatio(state, getters) {
      return getters.totalPublishCount / getters.totalLastPublishCount;
    },
    publishCountDeltaInPercentage(state, getters) {
      if (!getters.totalLastPublishCount || !getters.totalLastPublishCount) {
        return 0;
      }
      const percent = (getters.publishCountDeltaRatio - 1) * 100;
      return percent;
    },
    searchCountDeltaInPercentage(state) {
      return state.totalSearchCountRelativeRatio === 0
        ? 0
        : (state.totalSearchCountRelativeRatio - 1) * 100;
    },
    
  },
  actions: {
    async search({ dispatch, commit }, keyword) {
      commit("start");
      await dispatch("fetchRelKeywordStatistics", keyword);
      await dispatch("fetchTotalSearchCountRelativeRatio", keyword);
      await dispatch("fetchPublishCount", keyword);
      await dispatch("fetchAutocompleteKeywords", keyword);
      await dispatch("fetchSectionOrder", keyword);
      commit("end");
    },
    async fetchRelKeywordStatistics({ commit }, keyword) {
      const data = await fetchRelKeywordStatistics(keyword, moment().month());
      commit("set", { key: "relKeywordStatistics", value: data });
    },
    fetchTotalSearchCountRelativeRatio({ commit }, keyword) {
      fetchRelativeRatio(keyword, lastMonth(), today())
        .then(({ ratio }) => {
          const data = ratio[0].data;
          const todayRatio = data[data.length - 1].ratio;
          const lastMonthRatio = data[0].ratio;
          const diff = todayRatio / lastMonthRatio;
          commit("set", { key: "totalSearchCountRelativeRatio", value: diff });
        })
        .finally(() => {});
    },
    async fetchAndSetNaverShoppingProductCount({commit, state}, targetKeyword) {
      let newKeywords = state.relKeywordStatistics.keywords.map(async keyword => {
        if (keyword.relKeyword === targetKeyword.relKeyword) {
          let productCount = 0;
          try {
            productCount = await fetchNaverShoppingProductCount(keyword.relKeyword)
          } catch (error) {
            console.log(error)
          }
          return {...keyword, productCount}
        } else {
          return keyword
        }
      })

      newKeywords = await Promise.all(newKeywords)
      commit("set", {key: 'relKeywordStatistics', value: {...state.relKeywordStatistics, keywords:newKeywords}})
    },
    async fetchPublishCount({ commit }, keyword) {
      const { blog: blogLast, cafe: cafeLast } = await fetchPublishCount(
        keyword,
        last2Month(),
        lastMonth()
      );

      const { blog, cafe } = await fetchPublishCount(
        keyword,
        lastMonth(),
        today()
      );

      commit("set", { key: "blogPublishCount", value: blog });
      commit("set", { key: "cafePublishCount", value: cafe });
      commit("set", { key: "lastBlogPublishCount", value: blogLast });
      commit("set", { key: "lastCafePublishCount", value: cafeLast });
    },
    async fetchAutocompleteKeywords({ commit }, keyword) {
      const naverSearchAutocompleteKeywords = await fetchNaverSearchAutocompleteKeywords(
        keyword
      );
      const naverShoppingAutocompleteKeywords = await fetchNaverSearchAutocompleteKeywords(
        keyword
      );
      commit(
        "set",
        "naverSearchAutocompleteKeywords",
        naverSearchAutocompleteKeywords
      );
      commit(
        "set",
        "naverShoppingAutocompleteKeywords",
        naverShoppingAutocompleteKeywords
      );
    },
    async fetchSectionOrder({ commit }, keyword) {
      const { mobile, pc } = await fetchSearchSectionOrder(keyword);
      commit("set", { key: "pcSectionOrder", value: pc });
      commit("set", { key: "mobileSectionOrder", value: mobile });
    },
  },
};
