<template>
  <MainLayout>
    <a-row gutter="16" type="flex" align="middle" style="width: 100%;">
      <a-card style="width: 100%;">
        <a-row align="middle" type="flex" style="margin-bottom: 16px;">
          <a-col span="6">
            키워드 입력
          </a-col>
          <a-col span="18">
            <a-input
              style="width: 100%;"
              placeholder="ex) 탈모샴푸 (엔터시, 누적)"
            ></a-input>
          </a-col>
        </a-row>
        <a-row align="middle" type="flex" style="margin-bottom: 16px;">
          <a-col span="6">키워드 대량 입력</a-col>
          <a-col span="18">
            <a-tooltip>
              <a-select
                mode="tags"
                style="width: 100%; height: 100%;"
              ></a-select>
              <template slot="title">
                1회 최대 10개까지 입력 가능합니다
              </template>
            </a-tooltip>
          </a-col>
        </a-row>
        <a-row align="middle" type="flex" justify="end">
          <a-space>
            <a-button type="primary">검색하기</a-button>
          </a-space>
        </a-row>
      </a-card>
    </a-row>
    <!-- Search Results -->
    <a-card title="검색 결과">
      <a-table></a-table>
    </a-card>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout.vue";

export default {
  name: "BigDataSummaryPage",
  components: {
    MainLayout,
  },
  data() {
    return {};
  },
  mounted() {
    this.fillData();
  },
  methods: {
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