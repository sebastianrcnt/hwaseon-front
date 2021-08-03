<template>
  <MainLayout>
    <a-row :gutter="16" type="flex" align="middle" style="width: 100%;">
      <a-card style="width: 100%;">
        <a-row align="middle" type="flex" style="margin-bottom: 16px;">
          <a-col span="6">마켓 선택</a-col>
          <a-col span="18">
            <a-select
              default-value="COUPANG"
              style="width: 100%"
              v-model="store"
            >
              <a-select-option value="NAVER">스토어팜</a-select-option>
              <a-select-option value="COUPANG">쿠팡</a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row align="middle" type="flex" style="margin-bottom: 16px;">
          <a-col span="6">
            상품 URL
          </a-col>
          <a-col span="18">
            <a-input style="width: 100%;" v-model="productUrl"></a-input>
          </a-col>
        </a-row>
        <a-row align="middle" type="flex" style="margin-bottom: 16px;">
          <a-col span="6">키워드 입력</a-col>
          <a-col span="12">
            <a-tooltip>
              <a-select
                mode="tags"
                style="width: 100%; height: 100%;"
                v-model="keywords"
              ></a-select>
              <template slot="title">
                1회 최대 10개까지 입력 가능합니다
              </template>
            </a-tooltip>
          </a-col>
        </a-row>
        <a-row align="middle" type="flex" justify="end">
          <a-space>
            <a-tooltip>
              <a-button>
                키워드 자동생성
              </a-button>
              <template slot="title">
                태그를 자동으로 입력합니다
              </template>
            </a-tooltip>
            <a-button
              type="primary"
              :disabled="keywords.length === 0"
              @click="handleSearchClick"
              >검색하기</a-button
            >
          </a-space>
        </a-row>
      </a-card>
    </a-row>
    <!-- Search Results -->
    <a-card title="검색 결과">
      <a-table :columns="columns" :dataSource="dataSource" :loading="loading">
        <span slot="actions" slot-scope="keyword">
          <a-button
            :key="keyword.keyword"
            @click="navigateToKeywordInsights(keyword.keyword)"
          >
            키워드 인사이트 보기</a-button
          >
          <a-button
            @click="
              store === 'NAVER'
                ? searchNaver(keyword.keyword)
                : searchCoupang(keyword.keyword)
            "
            >검색결과 보기</a-button
          >
        </span>
      </a-table>
    </a-card>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout.vue";
import {
  fetchProductRankWithinKeywordsCoupang,
  fetchProductRankWithinKeywordsNaver,
} from "../fetchers/index";

const columns = [
  { dataIndex: "keyword", key: "keyword", title: "키워드" },
  {
    // dataIndex: "rank",
    key: "rank",
    title: "순위",
    customRender(text, record) {
      return record.product.rank === -1 ? "100+" : record.product.rank;
    },
  },
  {
    key: "actions",
    title: "액션",
    scopedSlots: {
      customRender: "actions",
    },
  },
  {
    key: "adType",
    title: "광고여부",
    customRender(text, record) {
      return record.adType ? "예" : "아니오";
    },
  },
];

export default {
  name: "TrackingPage",
  components: {
    MainLayout,
  },
  data() {
    return {
      columns,
      productUrl: "",
      store: "COUPANG",
      keywords: [],
      coupangProducts: {},
      naverProducts: {},
      loading: false,
    };
  },
  mounted() {},
  methods: {
    navigateToKeywordInsights(keyword) {
      let routeUrl = this.$router.resolve({
        path: "/features/category",
        query: { keyword },
      });
      window.open(routeUrl.href, "_blank");
    },
    searchCoupang(keyword) {
      window.open(`https://www.coupang.com/np/search?q=${keyword}`, "_blank");
    },
    searchNaver(keyword) {
      window.open(
        `https://search.shopping.naver.com/search/all?query=${keyword}`,
        "_blank"
      );
    },
    async handleSearchClick() {
      this.loading = true;
      if (this.store === "COUPANG") {
        const coupangProducts = await fetchProductRankWithinKeywordsCoupang(
          this.keywords,
          this.productUrl
        );
        this.coupangProducts = coupangProducts;
      } else if (this.store === "NAVER") {
        const naverProducts = await fetchProductRankWithinKeywordsNaver(
          this.keywords,
          this.productUrl
        );
        this.naverProducts = naverProducts;
      }
      this.loading = false;
    },
  },
  computed: {
    dataSource() {
      let arr = [];
      /*
        "에센스": {
          "product": {
            "id": "170864974",
            "name": "에이플비 비폴렌 프로폴리스 앰플 세럼, 50ml, 1개"
          },
          "rank": 39
        }
      */
      if (this.store === "COUPANG") {
        for (let keyword in this.coupangProducts) {
          const product = this.coupangProducts[keyword];
          arr.push({ keyword, product, key: keyword });
        }
      } else if (this.store === "NAVER") {
        for (let keyword in this.naverProducts) {
          const product = this.naverProducts[keyword];
          arr.push({ keyword, product, key: keyword });
        }
      }

      return arr;
    },
  },
};
</script>
