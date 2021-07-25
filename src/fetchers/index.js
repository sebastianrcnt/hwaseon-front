import axios from "axios";
export const ApiClient = axios.create({
  // baseURL: process.env.API_URL,
  baseURL: "http://ec2-52-79-235-31.ap-northeast-2.compute.amazonaws.com:5000",
});

const extractData = (res) => res.data;

export const fetchPublishCount = (keyword, startDate, endDate) =>
  ApiClient.get("api/v1/keyword-services/publish-count", {
    params: {
      keyword,
      startDate,
      endDate,
    },
  }).then(extractData);

export const fetchSearchSectionOrder = (keyword) =>
  ApiClient.get("api/v1/keyword-services/search-section-order", {
    params: { keyword },
  }).then(extractData);

export const fetchRelKeywordStatistics = (keyword, month) =>
  ApiClient.get("api/v1/keyword-services/relkeyword-search-statistics", {
    params: { keyword, month },
  }).then(extractData);

export const fetchRelativeRatio = (keywords, startDate, endDate) =>
  ApiClient.get("api/v1/keyword-services/relative", {
    params: { keywords, startDate, endDate },
  }).then(extractData);

export const fetchNaverCategory = (categoryId) =>
  ApiClient.get("api/v1/proxy-services/get-search-category", {
    params: { categoryId },
  }).then(extractData);

export const fetchNaverSearchAutocompleteKeywords = (keyword) =>
  ApiClient.get("api/v1/keyword-services/naver-search-autocomplete", {
    params: { keyword },
  }).then(extractData);

export const fetchNaverShoppingAutocompleteKeywords = (keyword) =>
  ApiClient.get("api/v1/keyword-services/naver-shopping-autocomplete", {
    params: { keyword },
  }).then(extractData);

export const fetchCategoryShoppingTrendingKeywords = (
  categoryId,
  startDate,
  endDate
) =>
  ApiClient.get(
    "api/v1/proxy-services/get-category-shopping-trending-keywords",
    {
      params: { categoryId, startDate, endDate },
    }
  ).then(extractData);

export const fetchNaverShoppingProducts = (keyword) =>
  ApiClient.get("api/v1/keyword-services/get-naver-shopping-products", {
    params: { keyword },
  }).then(extractData);

// Blog
export const fetchBlogPosts = (blogId) =>
  ApiClient.get("api/v1/blog-services/get-blog-posts", {
    params: { blogId },
  }).then(extractData);

export const fetchHashTags = (blogId, postId) =>
  ApiClient.get("api/v1/keyword-services/get-blog-post-hashtags", {
    params: { blogId, postId },
  }).then(extractData);

export const fetchBlogPostSearchRank = (keyword, postId) =>
  ApiClient.get(
    "api/v1/keyword-services/get-blog-post-naver-main-search-rank",
    { params: { keyword, postId } }
  ).then(extractData);

export const fetchProductRankWithinKeywordsCoupang = (keywords, productUrl) =>
  ApiClient.post(
    "/api/v1/product-services/get-product-rank-within-keywords/coupang",
    {
      keywords,
      productUrl,
    }
  ).then(extractData);

export const fetchProductRankWithinKeywordsNaver = (keywords, productUrl) =>
  ApiClient.post(
    "/api/v1/product-services/get-product-rank-within-keywords/naver",
    {
      keywords,
      productUrl,
    }
  ).then(extractData);

export const fetchNaverSearchRelatedKeywords = (keyword) =>
  ApiClient.get("/api/v1/keyword-services/naver-search-related", {
    params: { keyword },
  }).then(extractData);

export const fetchNaverShoppingProductCount = (keyword) =>
  ApiClient.get("/api/v1/keyword-services/naver-shopping-product-count", {
    params: { keyword },
  }).then(extractData);

export const fetchNaverShoppingKeywordCategory = (keyword) =>
  ApiClient.get(
    "/api/v1/category-services/get-naver-shopping-keyword-category",
    { params: { keyword } }
  ).then(extractData);
