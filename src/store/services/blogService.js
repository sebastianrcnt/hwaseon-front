import Vue from "vue";
import {
  fetchBlogPosts,
  fetchBlogPostSearchRank,
  fetchHashTags,
} from "../../fetchers";
import { getBestHashTag } from "../../utils/getBestHashTag";

export const blogService = {
  namespaced: true,
  state: () => {
    return {
      loading: false,
      rawPosts: [],
    };
  },
  mutations: {
    setRawPosts(state, rawPosts) {
      state.rawPosts = rawPosts;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setBestHashTag(state, { postId, hashTag }) {
      const found = state.rawPosts.find((p) => p.logNo === postId);
      found.bestHashTag = hashTag;
    },
  },
  getters: {},
  actions: {
    async fetch({ commit }, blogId) {
      commit("setLoading", true);
      let rawPosts = await fetchBlogPosts(blogId);

      // set hashtags
      let hashTagPromises = rawPosts.map(async (rawPost, index) => {
        const { blogId, logNo: postId } = rawPost;
        const hashTags = await fetchHashTags(blogId, postId);
        const bestHashTag = getBestHashTag(hashTags, rawPost.titleWithInspectMessage);

        return {
          ...rawPost,
          hashTags,
          bestHashTag,
          key: index,
        };
      });
      rawPosts = await Promise.all(hashTagPromises);

      // set search rank
      let searchRankPromises = rawPosts.map(async (rawPost) => {
        const { logNo: postId, bestHashTag } = rawPost;
        const searchRank = await fetchBlogPostSearchRank(bestHashTag, postId);
        return {
          ...rawPost,
          searchRank,
        };
      });

      rawPosts = await Promise.all(searchRankPromises);
      commit("setRawPosts", rawPosts);
      commit("setLoading", false);
    },
    async updateSearchRanks({ state, commit }) {
      commit("setLoading", true);
      const searchRankPromises = state.rawPosts.map(async (rawPost) => {
        const { logNo: postId, bestHashTag } = rawPost;
        const searchRank = await fetchBlogPostSearchRank(bestHashTag, postId);
        return {
          ...rawPost,
          searchRank,
        };
      });

      const rawPosts = await Promise.all(searchRankPromises);
      commit("setRawPosts", rawPosts);
      commit("setLoading", false);
    },
  },
};
