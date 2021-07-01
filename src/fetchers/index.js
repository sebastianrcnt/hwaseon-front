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