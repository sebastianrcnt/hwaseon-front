<template>
  <MainLayout>
    <a-row>
      <a-input-search
        size="large"
        placeholder="검색어 입력"
        enter-button
        @search="search"
        v-model="keyword"
      ></a-input-search>
    </a-row>
    <a-row :gutter="10" type="flex">
      <a-col :span="12">
        <a-row style="margin-bottom: 10px;">
          <a-spin :spinning="!relKeywordStatisticsReady">
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
                    suffix="%"
                    :precision="2"
                  />
                </a-col>
              </a-row>
            </a-card>
          </a-spin>
        </a-row>
        <a-row>
          <a-spin :spinning="!publishCountReady">
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
                    :precision="2"
                    suffix="%"
                  />
                </a-col>
              </a-row>
            </a-card>
          </a-spin>
        </a-row>
      </a-col>
      <a-col :span="12">
        <a-spin :spinning="!sectionOrderReady">
          <a-card
            title="쇼핑&뷰 섹션 위치"
            style="min-height: 340px; height: 100%;"
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
        </a-spin>
      </a-col>
    </a-row>
    <a-card title="그래프">
      <a-row mode="flex">
        <a-col span="6">
          <a-radio-group v-model="chartType" @change="onChartTypeChange">
            <a-radio-button value="age">
              연령별
            </a-radio-button>
            <a-radio-button value="time">
              시간별
            </a-radio-button>
          </a-radio-group>
        </a-col>
        <a-col span="6">
          <a-radio-group v-model="chartPeriod" @change="onChartPeriodChange">
            <a-radio-button value="month">
              1개월
            </a-radio-button>
            <a-radio-button value="year">
              1년
            </a-radio-button>
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
      <a-spin
        :spinning="!(relKeywordStatisticsReady && autocompleteKeywordsReady)"
      >
        <a-table
          :columns="searchResultColumns"
          :data-source="relKeywordStatisticsDataSource"
        >
          <span slot="compIdx" slot-scope="compIdx">
            <a-tag
              :color="
                compIdx === '높음'
                  ? 'red'
                  : compIdx === '중간'
                  ? 'orange'
                  : compIdx === '낮음'
                  ? 'green'
                  : ''
              "
              >{{ compIdx }}</a-tag
            >
          </span>
          <span slot="source" slot-scope="source">
            <a-tag v-if="source.relkeyword">
              연검
            </a-tag>
            <a-tag v-if="source.nsearch" color="#2DB400">
              N자
            </a-tag>
            <a-tag v-if="source.nshopping" color="#87d068">
              N쇼
            </a-tag>
          </span>
        </a-table>
      </a-spin>
    </a-card>
    <!-- Category Keywords -->
    <a-card title="카테고리별 인기검색어">
      <a-row style="margin-bottom: 16px;">
        <a-select
          class="category-select"
          default-value="unset"
          @change="handleCategoryChange(0, $event)"
          :value="selectedCategoriesByLevel[0]"
        >
          <a-select-option value="unset">
            전체 (1분류)
          </a-select-option>
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
          <a-select-option value="unset">
            전체 (2분류)
          </a-select-option>
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
          <a-select-option value="unset">
            전체 (3분류)
          </a-select-option>
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
          <a-select-option value="unset">
            전체 (4분류)
          </a-select-option>
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
        </a-table>
      </a-row>
    </a-card>
    <a-card title="해당 키워드 N쇼핑 판매량(NPay 기준 | 최근 7일간)">
      <a-row style="margin-bottom: 16px;">
        <a-input-group compact>
          <a-input-search
            style="width: 30%"
            placeholder="키워드 (ex) 탈모샴푸"
            enter-button="검색하기"
          >
          </a-input-search>
        </a-input-group>
      </a-row>
      <a-row>
        <a-table :columns="columns" :data-source="dataSource"> </a-table>
      </a-row>
    </a-card>
    <!-- RESULT -->
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout.vue";
import LineChart from "../components/LineChart";
import {
  getCategoryShoppingTrendingKeywords,
  getNaverCategory,
  getNaverSearchAutocompleteKeywords,
  getNaverShoppingAutocompleteKeywords,
  getPublishCount,
  getRelativeRatio,
  getRelKeywordsStatistics,
  getSearchSectionOrder,
} from "../fetchers";
import moment from "moment";
import { lastMonth, last2Month, today } from "@/utils/time";

// Columns
// Search Result
const searchResultColumns = [
  {
    key: "relKeyword",
    dataIndex: "relKeyword",
    title: "키워드",
  },
  {
    key: "source",
    dataIndex: "source",
    title: "소스",
    scopedSlots: { customRender: "source" },
    filters: [
      { text: "연검", value: "relkeyword" },
      { text: "N자", value: "nsearch" },
      { text: "N쇼", value: "nshopping" },
    ],
    filterMultiple: true,
    onFilter: (value, record) => {
      return record.source[value];
    },
  },
  {
    key: "monthlyMobileQcCnt",
    dataIndex: "monthlyMobileQcCnt",
    title: "MO 검색량",
    sorter: (a, b) => b.monthlyMobileQcCnt - a.monthlyMobileQcCnt,
    sortDirections: ["ascend", "descend"],
  },
  {
    key: "monthlyPcQcCnt",
    dataIndex: "monthlyPcQcCnt",
    title: "PC 검색량",
    sorter: (a, b) => b.monthlyPcQcCnt - a.monthlyPcQcCnt,
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Total",
    customRender(text, record, index) {
      return record.monthlyPcQcCnt + record.monthlyMobileQcCnt;
    },
    sorter: (a, b) => b.monthlyPcQcCnt - a.monthlyPcQcCnt,
    sortDirections: ["ascend", "descend"],
  },
  {
    key: "monthlyAveMobileClkCnt",
    dataIndex: "monthlyAveMobileClkCnt",
    title: "MO 광고클릭",
    sorter: (a, b) => b.monthlyAveMobileClkCnt - a.monthlyAveMobileClkCnt,
    sortDirections: ["ascend", "descend"],
    customRender(text, record, index) {
      return `${text} (${record.monthlyAveMobileCtr})`;
    },
  },
  {
    key: "monthlyAvePcClkCnt",
    dataIndex: "monthlyAvePcClkCnt",
    title: "PC 광고클릭",
    sorter: (a, b) => b.monthlyAvePcClkCnt - a.monthlyAvePcClkCnt,
    sortDirections: ["ascend", "descend"],
    customRender(text, record, index) {
      return `${text} (${record.monthlyAvePcCtr})`;
    },
  },
  {
    key: "compIdx",
    dataIndex: "compIdx",
    title: "경쟁률",
    scopedSlots: {
      customRender: "compIdx",
    },
    sorter: (a, b) => {
      const map = { 높음: 3, 중간: 2, 낮음: 1 };
      const aCompIdx = map[a.compIdx] || 0;
      const bCompIdx = map[b.compIdx] || 0;
      return aCompIdx - bCompIdx;
    },
    sortDirections: ["ascend", "descend"],
  },
];

const categoryShoppingTrendingKeywordsColumns = [
  { key: "rank", dataIndex: "rank", title: "순위", width: "20%" },
  { key: "keyword", dataIndex: "keyword", title: "키워드" },
  {
    key: "rankDelta",
    dataIndex: "rankDelta",
    title: "순위변동(지난달 대비)",
    width: "20%",
  },
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
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      chartType: "age",
      chartPeriod: "month",
      // search
      keyword: null,
      // relKeywordStatistics
      relKeywordStatistics: null,
      searchResultColumns,
      relKeywordStatisticsReady: true,
      // autocomplete
      naverSearchAutocompleteKeywords: [],
      naverShoppingAutocompleteKeywords: [],
      autocompleteKeywordsReady: true,
      // publishCount
      lastBlogPublishCount: 0,
      lastCafePublishCount: 0,
      blogPublishCount: 0,
      cafePublishCount: 0,
      publishCountReady: true,
      // section order
      pcSectionOrder: [],
      mobileSectionOrder: [],
      sectionOrderReady: true,
      // relative ratio
      totalSearchCountRelativeRatio: 0,
      totalSearchCountRelativeRatioReady: true,
      // categories
      categoryOptionsByLevel: [[], [], [], []],
      selectedCategoriesByLevel: ["unset", "unset", "unset", "unset"],
      // category shopping trend
      categoryShoppingTrendingKeywordsColumns,
      categoryShoppingTrendingKeywords: [],
      isCategoryShoppingTrendingKeywordsReady: true,
    };
  },
  async mounted() {
    this.fillData();
    // get all categories
    const topCategories = await getNaverCategory(0);
    this.$set(this.categoryOptionsByLevel, 0, topCategories.childList);
  },
  computed: {
    // searchCounts
    pcSearchCount() {
      return this.relKeywordStatistics?.data.monthlyPcQcCnt;
    },
    mobileSearchCount() {
      return this.relKeywordStatistics?.data.monthlyMobileQcCnt;
    },
    totalSearchCount() {
      return this.pcSearchCount + this.mobileSearchCount || 0;
    },
    // publishCounts
    totalPublishCount() {
      return this.blogPublishCount + this.cafePublishCount || 0;
    },
    totalLastPublishCount() {
      return this.lastCafePublishCount + this.lastBlogPublishCount || 0;
    },
    publishCountDeltaRatio() {
      return this.totalPublishCount / this.totalLastPublishCount;
    },
    publishCountDeltaInPercentage() {
      if (!this.totalLastPublishCount || !this.totalLastPublishCount) {
        return 0;
      }
      const percent = (this.publishCountDeltaRatio - 1) * 100;
      return percent;
    },
    searchCountDeltaInPercentage() {
      return this.totalSearchCountRelativeRatio === 0
        ? 0
        : (this.totalSearchCountRelativeRatio - 1) * 100;
    },
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
    relKeywordStatisticsDataSource() {
      return this.relKeywordStatistics?.keywords.map((keywordData, index) => {
        // populate sources
        const relkeyword = true;
        const nsearch = this.naverSearchAutocompleteKeywords.includes(
          keywordData.relKeyword
        );
        const nshopping = this.naverShoppingAutocompleteKeywords.includes(
          keywordData.relKeyword
        );
        return {
          key: index,
          ...keywordData,
          source: { relkeyword, nsearch, nshopping },
        };
      });
    },
  },
  methods: {
    search() {
      this.setPublishCount();
      this.setSectionOrder();
      this.setRelKeywordStatistics();
      this.setTotalSearchCountRelativeRatio();
      this.setNaverSearchAutocompleteKeywords();
      this.setNaverShoppingAutocompleteKeywords();
    },
    // Setters
    async setRelKeywordStatistics() {
      this.relKeywordStatisticsReady = false;
      const data = await getRelKeywordsStatistics(
        this.keyword,
        moment().month()
      );
      this.relKeywordStatistics = data;
      this.relKeywordStatisticsReady = true;
    },
    async setTotalSearchCountRelativeRatio() {
      this.totalSearchCountRelativeRatioReady = false;
      const { ratio } = await getRelativeRatio(
        this.keyword,
        lastMonth(),
        today()
      );

      const data = ratio[0].data;
      const todayRatio = data[data.length - 1].ratio;
      const lastMonthRatio = data[0].ratio;
      const diff = todayRatio / lastMonthRatio;
      this.totalSearchCountRelativeRatio = diff;
      this.totalSearchCountRelativeRatioReady = true;
    },
    async setPublishCount() {
      this.publishCountReady = false;

      const { blog: blogLast, cafe: cafeLast } = await getPublishCount(
        this.keyword,
        last2Month(),
        lastMonth()
      );
      const { blog, cafe } = await getPublishCount(
        this.keyword,
        lastMonth(),
        today()
      );

      this.blogPublishCount = blog;
      this.cafePublishCount = cafe;
      this.lastBlogPublishCount = blogLast;
      this.lastCafePublishCount = cafeLast;
      this.publishCountReady = true;
    },
    async setNaverSearchAutocompleteKeywords() {
      const keywords = await getNaverSearchAutocompleteKeywords(this.keyword);
      this.naverSearchAutocompleteKeywords = keywords;
    },
    async setNaverShoppingAutocompleteKeywords() {
      const keywords = await getNaverShoppingAutocompleteKeywords(this.keyword);
      this.naverShoppingAutocompleteKeywords = keywords;
    },
    async setSectionOrder() {
      this.sectionOrderReady = false;
      const { mobile, pc } = await getSearchSectionOrder(this.keyword);
      this.pcSectionOrder = pc;
      this.mobileSectionOrder = mobile;
      this.sectionOrderReady = true;
    },
    async setCategoryShoppingTrendingKeywords() {
      this.isCategoryShoppingTrendingKeywordsReady = false;
      if (this.selectedCategoryId) {
        const keywords = await getCategoryShoppingTrendingKeywords(
          this.selectedCategoryId,
          lastMonth(),
          today()
        );
        const lastKeywords = await getCategoryShoppingTrendingKeywords(
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
            rankDelta: found ? keywordRow.rank - lastRank : "-",
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
        let nextLevelOptions = (await getNaverCategory(categoryId)).childList;
        this.$set(this.categoryOptionsByLevel, level + 1, nextLevelOptions);
        this.$set(this.selectedCategoriesByLevel, level, categoryId);
      }
    },
    async handleCategoryShoppingTrendingKeywordsSearchClick() {
      this.setCategoryShoppingTrendingKeywords();
    },
    onChartTypeChange(event) {
      this.chartType = event.target.value;
    },
    onChartPeriodChange(event) {
      this.chartPeriod = event.target.value;
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    fillData() {
      this.chartData = {
        labels: [1, 2, 3, 4, 5],
        datasets: [
          {
            label: "Data One",
            fill: false,
            tension: 0.1,
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
            ],
          },
        ],
      };
    },
  },
};
</script>
<style scoped>
.category-select {
  min-width: 150px;
}
</style>
