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
                  <a-statistic title="Total" value="1128" suffix="건" />
                </a-col>
                <a-col :span="6">
                  <a-statistic
                    title="전월대비"
                    value="1128"
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
                    :value="publishCountDelta"
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
      <a-table></a-table>
    </a-card>
    <!-- Category Keywords -->
    <a-card title="카테고리별 인기검색어">
      <a-row style="margin-bottom: 16px;">
        <a-select
          default-value="all"
          style="width: 120px"
          @change="handleChange"
        >
          <a-select-option value="all">
            전체 (1분류)
          </a-select-option>
        </a-select>
        <a-select
          default-value="all"
          style="width: 120px"
          @change="handleChange"
        >
          <a-select-option value="all">
            전체 (2분류)
          </a-select-option>
        </a-select>
        <a-select
          default-value="all"
          style="width: 120px"
          @change="handleChange"
        >
          <a-select-option value="all">
            전체 (3분류)
          </a-select-option>
        </a-select>
        <a-select
          default-value="all"
          style="width: 120px"
          @change="handleChange"
        >
          <a-select-option value="all">
            전체 (4분류)
          </a-select-option>
        </a-select>
        <a-button type="primary">
          검색하기
        </a-button>
      </a-row>
      <a-row>
        <a-table :columns="columns" :data-source="dataSource"> </a-table>
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
    <a-card>
      <a-row style="margin-bottom: 16px;">
        <a-input-group compact>
          <a-input style="width: 20%" placeholder="스토어명"></a-input>
          <a-input-search
            style="width: 30%"
            placeholder="키워드"
            enter-button="검색하기"
          >
          </a-input-search>
        </a-input-group>
      </a-row>
      <a-row>
        <a-table :columns="columns" :data-source="dataSource"> </a-table>
      </a-row>
    </a-card>
    <!-- Another -->
    <a-card title="키워드별 예상 판매( NPay 기준 | 최근 7일간)">
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
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout.vue";
import LineChart from "../components/LineChart";
import {
  getPublishCount,
  getRelKeywordsStatistics,
  getSearchSectionOrder,
} from "../fetchers";
import moment from "moment";

const columns = [{ title: "Name", dataIndex: "name" }];
const dataSource = [{ key: 1, name: "Sebastian Jeong" }];

export default {
  name: "MainPage",
  components: {
    MainLayout,
    LineChart,
  },
  data() {
    return {
      current: ["1"],
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      chartType: "age",
      chartPeriod: "month",
      columns,
      dataSource,
      // search
      keyword: null,
      // relKeywordStatistics
      relKeywordStatistics: null,
      relKeywordStatisticsReady: true,
      // searchCount
      // pcSearchCount: 0,
      // mobileSearchCount: 0,
      // lastPCSearchCount: 0,
      // lastMobileSearchCount: 0,
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
    };
  },
  mounted() {
    this.fillData();
  },
  computed: {
    pcSearchCount() {
      return this.relKeywordStatistics?.data.monthlyPcQcCnt;
    },
    mobileSearchCount() {
      return this.relKeywordStatistics?.data.monthlyMobileQcCnt;
    },
    totalSearchCount() {
      return this.pcSearchCount + this.mobileSearchCount;
    },
    // searchCountDelta() {

    // },
    totalPublishCount() {
      return this.blogPublishCount + this.cafePublishCount;
    },
    totalLastPublishCount() {
      return this.lastCafePublishCount + this.lastBlogPublishCount;
    },
    publishCountDelta() {
      if (!this.totalLastPublishCount || !this.totalLastPublishCount) {
        return "N/A";
      }
      const ratio = this.totalPublishCount / this.totalLastPublishCount;
      const percent = (ratio - 1) * 100;
      return percent;
    },
  },
  methods: {
    search() {
      this.setPublishCount();
      this.setSectionOrder();
      this.setRelKeywordStatistics();
    },
    async setRelKeywordStatistics() {
      this.relKeywordStatisticsReady = false;
      const data = await getRelKeywordsStatistics(
        this.keyword,
        moment().month()
      );
      this.relKeywordStatistics = data;
      this.relKeywordStatisticsReady = true;
    },
    async setPublishCount() {
      this.publishCountReady = false;
      const last2Month = moment()
        .subtract(2, "months")
        .format("YYYY-MM-DD");
      const lastMonth = moment()
        .subtract(1, "months")
        .format("YYYY-MM-DD");
      const today = moment().format("YYYY-MM-DD");
      const { blog: blogLast, cafe: cafeLast } = await getPublishCount(
        this.keyword,
        last2Month,
        lastMonth
      );
      const { blog, cafe } = await getPublishCount(
        this.keyword,
        lastMonth,
        today
      );

      this.blogPublishCount = blog;
      this.cafePublishCount = cafe;
      this.lastBlogPublishCount = blogLast;
      this.lastCafePublishCount = cafeLast;
      this.publishCountReady = true;
    },
    async setSectionOrder() {
      this.sectionOrderReady = false;
      const { mobile, pc } = await getSearchSectionOrder(this.keyword);
      this.pcSectionOrder = pc;
      this.mobileSectionOrder = mobile;
      this.sectionOrderReady = true;
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
