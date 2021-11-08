<template>
  <MainLayout>
    <a-row>
      <a-input-search
        size="large"
        placeholder="검색어 입력"
        enter-button
        @search="handleSearch"
        v-model="keyword"
      ></a-input-search>
    </a-row>
    <a-spin :spinning="loading">
      <a-row :gutter="10" type="flex">
        <a-col :span="12">
          <a-row style="margin-bottom: 10px">
            <a-card title="월간 검색수">
              <a-row>
                <a-col :span="6">
                  <a-statistic title="PC" :value="pcSearchCount" suffix="건" />
                </a-col>
                <a-col :span="6">
                  <a-statistic
                    title="Mobile"
                    :value="mobileSearchCount"
                    suffix="건"
                  />
                </a-col>
                <a-col :span="6">
                  <a-statistic
                    title="Total"
                    :value="totalSearchCount"
                    suffix="건"
                  />
                </a-col>
                <a-col :span="6">
                  <a-statistic
                    title="전월대비"
                    :value="searchCountDeltaInPercentage"
                    :prefix="searchCountDeltaInPercentage > 0 ? '+' : ''"
                    suffix="%"
                    :precision="2"
                  />
                </a-col>
              </a-row>
            </a-card>
          </a-row>
          <a-row>
            <a-card title="월간 발행량">
              <a-row>
                <a-col :span="6">
                  <a-statistic
                    title="블로그"
                    :value="blogPublishCount"
                    suffix="건"
                  />
                </a-col>
                <a-col :span="6">
                  <a-statistic
                    title="카페"
                    :value="cafePublishCount"
                    suffix="건"
                  />
                </a-col>
                <a-col :span="6">
                  <a-statistic
                    title="Total"
                    :value="totalPublishCount"
                    suffix="건"
                  />
                </a-col>
                <a-col :span="6">
                  <a-statistic
                    title="전월대비"
                    :value="publishCountDeltaInPercentage"
                    :prefix="publishCountDeltaInPercentage > 0 ? '+' : ''"
                    :precision="2"
                    suffix="%"
                  />
                </a-col>
              </a-row>
            </a-card>
          </a-row>
        </a-col>
        <a-col :span="12">
          <a-card
            title="쇼핑&뷰 섹션 위치"
            style="min-height: 340px; height: 100%"
          >
            <a-row>
              <a-col :span="12">
                <a-row>
                  <h3>PC</h3>
                </a-row>
                <a-row>
                  <a-col
                    v-for="(section, index) in pcSectionOrder"
                    :key="index"
                    >{{ section }}</a-col
                  >
                </a-row>
              </a-col>
              <a-col :span="12">
                <a-row>
                  <h3>Mobile</h3>
                </a-row>
                <a-row>
                  <a-col
                    v-for="(section, index) in mobileSectionOrder"
                    :key="index"
                    >{{ section }}</a-col
                  >
                </a-row>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </a-spin>
    <a-card title="그래프">
      <a-row mode="flex">
        <a-col span="6">
          <a-radio-group v-model="chartType" @change="onChartTypeChange">
            <a-radio-button value="time"> 시간별 </a-radio-button>
            <a-radio-button value="age"> 연령별 </a-radio-button>
            <a-radio-button value="sex"> 성별 </a-radio-button>
          </a-radio-group>
        </a-col>
        <a-col span="6">
          <a-radio-group v-model="chartPeriod" @change="onChartPeriodChange">
            <a-radio-button value="date"> 1개월 </a-radio-button>
            <a-radio-button value="week"> 1년 </a-radio-button>
            <a-radio-button value="month"> 3년 </a-radio-button>
          </a-radio-group>
        </a-col>
      </a-row>
      <a-row>
        <line-chart
          :chart-data="chartData"
          :options="chartOptions"
          :height="150"
          >some line-chart</line-chart
        >
      </a-row>
    </a-card>
    <!-- Search Results -->
    <a-card title="검색 결과">
      <a-table
        :columns="searchResultColumns"
        :data-source="getRelKeywordStatisticsDataSource()"
        :loading="loading"
      >
        <span slot="insightsLink" slot-scope="keywordObj">
          <a
            target="_blank"
            :href="`/#/features/category?keyword=${keywordObj.keyword}`"
          >
            <a-button>
              인사이트 보기
            </a-button>
          </a>
        </span>
        <span slot="source" slot-scope="source">
          <a-tag v-if="source.nsearchrel"> 연검 </a-tag>
          <a-tag v-if="source.nsearchautocompl" color="#2DB400"> N자 </a-tag>
          <a-tag v-if="source.nshoppingautocompl" color="#87d068"> N쇼 </a-tag>
        </span>
      </a-table>
    </a-card>
    <!-- Category Keywords -->
    <a-card title="카테고리별 인기검색어">
      <a-row style="margin-bottom: 16px">
        <a-select
          class="category-select"
          default-value="unset"
          @change="handleCategoryChange(0, $event)"
          :value="selectedCategoriesByLevel[0]"
        >
          <a-select-option value="unset"> 전체 (1분류) </a-select-option>
          <a-select-option
            v-for="(option, index) in categoryOptionsByLevel[0]"
            :key="index"
            :value="option.cid"
          >
            {{ option.name }}
          </a-select-option>
        </a-select>
        <a-select
          class="category-select"
          default-value="unset"
          @change="handleCategoryChange(1, $event)"
          :value="selectedCategoriesByLevel[1]"
        >
          <a-select-option value="unset"> 전체 (2분류) </a-select-option>
          <a-select-option
            v-for="(option, index) in categoryOptionsByLevel[1]"
            :key="index"
            :value="option.cid"
          >
            {{ option.name }}
          </a-select-option>
        </a-select>
        <a-select
          class="category-select"
          default-value="unset"
          @change="handleCategoryChange(2, $event)"
          :value="selectedCategoriesByLevel[2]"
        >
          <a-select-option value="unset"> 전체 (3분류) </a-select-option>
          <a-select-option
            v-for="(option, index) in categoryOptionsByLevel[2]"
            :key="index"
            :value="option.cid"
          >
            {{ option.name }}
          </a-select-option>
        </a-select>
        <a-select
          class="category-select"
          default-value="unset"
          @change="handleCategoryChange(3, $event)"
          :value="selectedCategoriesByLevel[3]"
        >
          <a-select-option value="unset"> 전체 (4분류) </a-select-option>
          <a-select-option
            v-for="(option, index) in categoryOptionsByLevel[3]"
            :key="index"
            :value="option.cid"
          >
            {{ option.name }}
          </a-select-option>
        </a-select>
        <a-button
          type="primary"
          @click="handleCategoryShoppingTrendingKeywordsSearchClick"
        >
          검색하기
        </a-button>
      </a-row>
      <a-row>
        <a-table
          :columns="categoryShoppingTrendingKeywordsColumns"
          :data-source="categoryShoppingTrendingKeywords"
        >
          <span slot="keywordRankDelta" slot-scope="keyword">
            <a-tag v-if="keyword.rankDelta >= 0" color="green">{{
              keyword.rankDelta
            }}</a-tag>
            <a-tag v-if="keyword.rankDelta < 0" color="red">{{
              keyword.rankDelta
            }}</a-tag>
          </span>
        </a-table>
      </a-row>
    </a-card>
    <a-card title="N쇼핑 판매량(NPay 기준 | 최근 7일간)">
      <a-row style="margin-bottom: 16px;">
        <a-input-group compact>
          <a-input-search
            style="width: 30%"
            placeholder="키워드 (ex) 탈모샴푸"
            enter-button="검색하기"
            v-model="keyword2"
            @search="handleSearchNaverShoppingProductsSearch"
          >
          </a-input-search>
        </a-input-group>
      </a-row>
      <a-row>
        <a-table
          :columns="naverShoppingProductsColumns"
          :data-source="naverShoppingProductsDataSource"
          :loading="naverShoppingProductsLoading"
        >
          <span slot="productName" slot-scope="product">
            <a target="_blank" :href="product.url">{{ product.productName }}</a>
          </span>
        </a-table>
      </a-row>
    </a-card>
    <!-- RESULT -->
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout.vue";
import LineChart from "../components/LineChart";
import {
  fetchCategoryShoppingTrendingKeywords,
  fetchNaverCategory,
  fetchNaverShoppingKeywordCategory,
  fetchKeywordGraphStatistics,
} from "../fetchers";
import { mapGetters, mapState } from "vuex";
import {
  last2Month,
  last3Years,
  lastMonth,
  lastYear,
  today,
} from "../utils/time";
import moment from "moment";
import _ from "underscore";

// Columns
// Search Result
const RelKeywordSources = {
  nsearchrel: "네이버메인_연관검색어",
  nsearchautocompl: "네이버메인_자동완성",
  nshoppingautocompl: "네이버쇼핑_자동완성 ",
};

const searchResultColumns = [
  { key: "keyword", dataIndex: "keyword", title: "키워드" },
  {
    key: "source",
    dataIndex: "source",
    title: "소스",
    scopedSlots: { customRender: "source" },
    filters: [
      { text: "연검", value: "nsearchrel" },
      { text: "N자", value: "nsearchautocompl" },
      { text: "N쇼", value: "nshoppingautocompl" },
    ],
    filterMultiple: true,
    onFilter: (value, record) => {
      return record.source[value];
    },
  },
  // {
  //   key: "monthlyMobileQcCnt",
  //   dataIndex: "monthlyMobileQcCnt",
  //   title: "MO 검색량",
  //   sorter: (a, b) => b.monthlyMobileQcCnt - a.monthlyMobileQcCnt,
  //   sortDirections: ["ascend", "descend"],
  // },
  // {
  //   key: "monthlyPcQcCnt",
  //   dataIndex: "monthlyPcQcCnt",
  //   title: "PC 검색량",
  //   sorter: (a, b) => b.monthlyPcQcCnt - a.monthlyPcQcCnt,
  //   sortDirections: ["ascend", "descend"],
  // },
  // {
  //   title: "Total",
  //   customRender(text, record) {
  //     return record.monthlyPcQcCnt + record.monthlyMobileQcCnt;
  //   },
  //   sorter: (a, b) => b.monthlyPcQcCnt - a.monthlyPcQcCnt,
  //   sortDirections: ["ascend", "descend"],
  // },
  // {
  //   key: "monthlyAveMobileClkCnt",
  //   dataIndex: "monthlyAveMobileClkCnt",
  //   title: "MO 광고클릭",
  //   sorter: (a, b) => b.monthlyAveMobileClkCnt - a.monthlyAveMobileClkCnt,
  //   sortDirections: ["ascend", "descend"],
  //   customRender(text, record) {
  //     return `${text} (${record.monthlyAveMobileCtr})`;
  //   },
  // },
  // {
  //   key: "monthlyAvePcClkCnt",
  //   dataIndex: "monthlyAvePcClkCnt",
  //   title: "PC 광고클릭",
  //   sorter: (a, b) => b.monthlyAvePcClkCnt - a.monthlyAvePcClkCnt,
  //   sortDirections: ["ascend", "descend"],
  //   customRender(text, record) {
  //     return `${text} (${record.monthlyAvePcCtr})`;
  //   },
  // },
  {
    key: "insightsLink",
    title: "인사이트 링크",
    scopedSlots: {
      customRender: "insightsLink",
    },
  },
];

const removeSpace = (str) => str.replace(/ /g, "");

const categoryShoppingTrendingKeywordsColumns = [
  { key: "rank", dataIndex: "rank", title: "순위", width: "20%" },
  { key: "keyword", dataIndex: "keyword", title: "키워드" },
  {
    // key: "rankDelta",
    // dataIndex: "rankDelta",
    title: "순위변동(지난달 대비)",
    width: "20%",
    scopedSlots: { customRender: "keywordRankDelta" },
  },
];

const naverShoppingProductsColumns = [
  { key: "totalRank", dataIndex: "totalRank", title: "순위" },
  {
    key: "isAd",
    dataIndex: "isAd",
    title: "광고여부",
    customRender(text) {
      return text ? "예" : "아니오";
    },
  },
  {
    key: "productName",
    // dataIndex: "productName",
    title: "상품명",
    width: "30%",
    scopedSlots: { customRender: "productName" },
  },
  { key: "mallName", dataIndex: "mallName", title: "스토어명" },
  { key: "price", dataIndex: "price", title: "가격" },
  { key: "deliveryPrice", dataIndex: "deliveryPrice", title: "배달비" },
  { key: "salescounts", dataIndex: "salescounts", title: "판매량" },
];

export default {
  name: "MainPage",
  components: {
    MainLayout,
    LineChart,
  },
  data() {
    return {
      // Chart
      naverShoppingProductsColumns,
      chartData: null,
      chartOptions: {
        type: "bar",
        responsive: true,
        maintainAspectRatio: false,
      },
      chartType: "time",
      chartPeriod: "month",
      // search
      keyword: "",
      // categories
      categoryOptionsByLevel: [[], [], [], []],
      selectedCategoriesByLevel: ["unset", "unset", "unset", "unset"],
      // category shopping trend
      categoryShoppingTrendingKeywordsColumns,
      categoryShoppingTrendingKeywords: [],
      isCategoryShoppingTrendingKeywordsReady: true,
      // columns
      searchResultColumns,
      keywordGraphStatistics: null,
    };
  },
  async mounted() {
    this.fillData();
    // get all categories
    const topCategories = await fetchNaverCategory(0);
    this.$set(this.categoryOptionsByLevel, 0, topCategories.childList);
    if (this.$route.query["keyword"]) {
      this.keyword = this.$route.query["keyword"];
      this.handleSearch();
    }
  },
  computed: {
    // category
    selectedCategoryId() {
      for (
        let level = 0;
        level < this.selectedCategoriesByLevel.length;
        level++
      ) {
        let cid = this.selectedCategoriesByLevel[level];
        if (cid === "unset") {
          return this.selectedCategoriesByLevel[level - 1];
        }
      }
      return -1;
    },

    // data sources
    ...mapState("keywordStatisticsService", [
      "loading",
      "relKeywordStatistics",
      "naverSearchAutocompleteKeywords",
      "naverSearchRelatedKeywords",
      "naverShoppingAutocompleteKeywords",
      "lastBlogPublishCount",
      "lastCafePublishCount",
      "pcSectionOrder",
      "mobileSectionOrder",
      "blogPublishCount",
      "cafePublishCount",
    ]),
    ...mapGetters("keywordStatisticsService", [
      "pcSearchCount",
      "mobileSearchCount",
      "totalSearchCount",
      "totalPublishCount",
      "totalLastPublishCount",
      "publishCountDeltaRatio",
      "publishCountDeltaInPercentage",
      "searchCountDeltaInPercentage",
    ]),
    ...mapState("naverShoppingProductsService", {
      naverShoppingProductsLoading: (state) => state.loading,
    }),
    ...mapGetters("naverShoppingProductsService", [
      "naverShoppingProductsDataSource",
    ]),
  },
  methods: {
    getRelKeywordStatisticsDataSource() {
      if (this.relKeywordStatistics.keywords?.length === 0) {
        return [];
      } else {
        const injectSourceProperty = (source) => (keyword) => {
          return {
            keyword,
            source,
          };
        };
        /**  nsearchrel: "네이버메인_연관검색어",
  nsearchautocompl: "네이버메인_자동완성",
  nshoppingautocompl: "네이버쇼핑_자동완성 ", */
        const nsearchrelkeywords = this.naverSearchRelatedKeywords.map(
          removeSpace
        );
        const nsearchautocomplkeywords = this.naverSearchAutocompleteKeywords.map(
          removeSpace
        );
        const nshoppingautocomplkeywords = this.naverShoppingAutocompleteKeywords.map(
          removeSpace
        );
        const nsearchrelkeywordsset = new Set(nsearchrelkeywords);
        const nsearchautocomplkeywordsset = new Set(nsearchautocomplkeywords);
        const nshoppingautocomplkeywordsset = new Set(
          nshoppingautocomplkeywords
        );
        let keywords = _.union(
          nsearchrelkeywords,
          nsearchautocomplkeywords,
          nshoppingautocomplkeywords
        ); // string []
        const constructKeywordObject = (
          keyword,
          from_nsearchrel,
          from_nsearchautocompl,
          from_nshoppingautocompl
        ) => {
          return {
            keyword,
            source: {
              nsearchrel: from_nsearchrel,
              nsearchautocompl: from_nsearchautocompl,
              nshoppingautocompl: from_nshoppingautocompl,
            },
          };
        };

        const keywordObjects = keywords.map((keyword) => {
          const keywordObject = constructKeywordObject(
            keyword,
            nsearchrelkeywordsset.has(keyword),
            nsearchautocomplkeywordsset.has(keyword),
            nshoppingautocomplkeywordsset.has(keyword)
          );

          return keywordObject;
        });

        if (keywordObjects.length > 0)
          console.log({
            keywordObjects,
            nsearchrelkeywords,
            nsearchautocomplkeywords,
            nshoppingautocomplkeywords,
          });

        keywordObjects.sort((x, y) => {
          let xsourcecount = 0;
          let ysourcecount = 0;
          for (let sourceKey in x.source) {
            if (x.source[sourceKey]) {
              xsourcecount++;
            }
          }

          for (let sourceKey in y.source) {
            if (y.source[sourceKey]) {
              ysourcecount++;
            }
          }

          return ysourcecount - xsourcecount;
        });

        return keywordObjects;
        // return [];
      }
    },
    handleSearchNaverShoppingProductsSearch() {
      this.$store.dispatch("naverShoppingProductsService/fetch", this.keyword2);
    },
    computeGraphData() {
      let x, y;
      switch (this.chartType) {
        case "time":
          x = this.keywordGraphStatistics["clickTrend"].map(
            (val) => val.period
          );
          y = this.keywordGraphStatistics["clickTrend"]
            .map((val) => val.value)
            .map((x) => x * this.totalSearchCount);
          break;
        case "age":
          x = this.keywordGraphStatistics["ageRate"].map((val) => val.label);
          y = this.keywordGraphStatistics["ageRate"].map((val) => val.ratio);
          break;
        case "sex":
          x = this.keywordGraphStatistics["genderRate"].map((val) => val.label);
          y = this.keywordGraphStatistics["genderRate"].map((val) => val.ratio);
          break;
        default:
          throw new Error("invalid chart type" + this.chartType);
      }

      return {
        labels: x,
        datasets: [
          {
            label: this.keyword,
            fill: false,
            xAxisId: "period",
            yAxisId: "value",
            data: y,
          },
        ],
      };
    },
    handleSearch() {
      this.$store.dispatch("keywordStatisticsService/search", this.keyword);
      this.$store.dispatch("naverShoppingProductsService/fetch", this.keyword);
      fetchNaverShoppingKeywordCategory(this.keyword)
        .then(async (categories) => {
          const promises = [];
          for (let i = 0; i < categories.length; i++) {
            promises.push(this.handleCategoryChange(i, categories[i]));
          }

          await Promise.all(promises);
          this.handleCategoryShoppingTrendingKeywordsSearchClick();
        })
        .then(async () => {
          await this.setKeywordGraphStatistics();
          this.fillData(this.computeGraphData());
        });
    },
    async setKeywordGraphStatistics() {
      if (this.selectedCategoriesByLevel[0] === "unset") {
        throw new Error("Categories Not Set!!");
      } else {
        console.log(this.chartPeriod);

        let startDate = null;
        switch (this.chartPeriod) {
          case "date":
            startDate = lastMonth();
            break;
          case "week":
            startDate = lastYear();
            break;
          case "month":
            startDate = last3Years();
            break;
        }

        const endDate = today();

        console.log(startDate);
        const statistics = await fetchKeywordGraphStatistics(
          this.keyword,
          this.selectedCategoriesByLevel[0],
          startDate,
          endDate,
          this.chartPeriod
        );

        console.log(statistics);
        this.keywordGraphStatistics = statistics;
      }
    },
    async setCategoryShoppingTrendingKeywords() {
      this.isCategoryShoppingTrendingKeywordsReady = false;
      if (this.selectedCategoryId) {
        const keywords = await fetchCategoryShoppingTrendingKeywords(
          this.selectedCategoryId,
          lastMonth(),
          today()
        );
        const lastKeywords = await fetchCategoryShoppingTrendingKeywords(
          this.selectedCategoryId,
          last2Month(),
          lastMonth()
        );

        this.categoryShoppingTrendingKeywords = keywords.map((keywordRow) => {
          const found = lastKeywords.find(
            (k) => k.keyword === keywordRow.keyword
          );
          const lastRank = found?.rank;
          return {
            ...keywordRow,
            rankDelta: found ? keywordRow.rank - lastRank : null,
          };
        });
      } else {
        console.error("shit");
      }
      this.isCategoryShoppingTrendingKeywordsReady = true;
    },
    clearLevelAndBeyond(level) {
      for (let i = level; i < 4; i++) {
        // todo - 4 is magic number;
        this.$set(this.categoryOptionsByLevel, i, []);
        this.$set(this.selectedCategoriesByLevel, i, "unset");
      }
    },
    // Handlers
    async handleCategoryChange(level, categoryId) {
      console.log({ level, categoryId });
      if (categoryId === "unset") {
        this.clearLevelAndBeyond(level + 1);
      } else {
        this.clearLevelAndBeyond(level + 1);
        let nextLevelOptions = (await fetchNaverCategory(categoryId)).childList;
        this.$set(this.categoryOptionsByLevel, level + 1, nextLevelOptions);
        this.$set(this.selectedCategoriesByLevel, level, categoryId);
      }
    },
    async handleCategoryShoppingTrendingKeywordsSearchClick() {
      this.setCategoryShoppingTrendingKeywords();
    },
    handleRelKeywordProductCountCheckClick(keyword) {
      this.$store.dispatch(
        "keywordStatisticsService/fetchAndSetNaverShoppingProductCount",
        keyword
      );
    },

    onChartTypeChange(event) {
      const chartType = event.target.value;
      this.chartType = chartType;
      this.fillData(this.computeGraphData());
    },
    async onChartPeriodChange(event) {
      const chartPeriod = event.target.value;
      this.chartPeriod = chartPeriod;
      await this.setKeywordGraphStatistics();
      this.fillData(this.computeGraphData());
    },
    fillData(data) {
      this.chartData = data;
    },
  },
};
</script>
<style scoped>
.category-select {
  min-width: 150px;
}
</style>
