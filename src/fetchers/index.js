import axios from "axios";
export const ApiClient = axios.create({
  // baseURL: process.env.API_URL,
  baseURL: "http://localhost:5000/",
});

const extractData = (res) => res.data;

export const getPublishCount = (keyword, startDate, endDate) =>
  ApiClient.get("api/v1/keyword-services/publish-count", {
    params: {
      keyword,
      startDate,
      endDate,
    },
  }).then(extractData);

export const getSearchSectionOrder = (keyword) =>
  ApiClient.get("api/v1/keyword-services/search-section-order", {
    params: { keyword },
  }).then(extractData);

export const getRelKeywordsStatistics = (keyword, month) =>
  ApiClient.get("api/v1/keyword-services/relkeyword-search-statistics", {
    params: { keyword, month },
  }).then(extractData);

export const getRelativeRatio = (keywords, startDate, endDate) =>
  ApiClient.get("api/v1/keyword-services/relative", {
    params: { keywords, startDate, endDate },
  }).then(extractData);

export const getNaverCategory = (categoryId) =>
  ApiClient.get("api/v1/proxy-services/get-search-category", {
    params: { categoryId },
  }).then(extractData);

export const getNaverSearchAutocompleteKeywords = (keyword) =>
  ApiClient.get("api/v1/keyword-services/naver-search-autocomplete", {
    params: { keyword },
  }).then(extractData);

export const getNaverShoppingAutocompleteKeywords = (keyword) =>
  ApiClient.get("api/v1/keyword-services/naver-shopping-autocomplete", {
    params: { keyword },
  }).then(extractData);

export const getCategoryShoppingTrendingKeywords = (
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
