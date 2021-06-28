<template>
  <MainLayout>
    <div class="container" style="padding: 20px;">
      <a-row>
        <a-input-search
          size="large"
          placeholder="검색어 입력"
          enter-button
        ></a-input-search>
      </a-row>
      <a-row :gutter="10" type="flex">
        <a-col :span="12">
          <a-row style="margin-bottom: 10px;">
            <a-card title="월간 검색수">
              <a-row>
                <a-col :span="6">
                  <a-statistic title="PC" value="1128" />
                </a-col>
                <a-col :span="6">
                  <a-statistic title="PC" value="1128" />
                </a-col>
                <a-col :span="6">
                  <a-statistic title="PC" value="1128" />
                </a-col>
                <a-col :span="6">
                  <a-statistic title="PC" value="1128" />
                </a-col>
              </a-row>
            </a-card>
          </a-row>
          <a-row>
            <a-card title="월간 발행량">
              <a-row>
                <a-col :span="6">
                  <a-statistic title="PC" value="1128" />
                </a-col>
                <a-col :span="6">
                  <a-statistic title="PC" value="1128" />
                </a-col>
                <a-col :span="6">
                  <a-statistic title="PC" value="1128" />
                </a-col>
                <a-col :span="6">
                  <a-statistic title="PC" value="1128" />
                </a-col>
              </a-row>
            </a-card>
          </a-row>
        </a-col>
        <a-col :span="12">
          <a-card title="쇼핑&뷰 섹션 위치" style="height: 100%;">
            <a-row>
              <a-col :span="12">
                <a-row>
                  <h3>PC</h3>
                </a-row>
                <a-row>
                  <a-col>파워링크</a-col>
                  <a-col>네이버쇼핑</a-col>
                  <a-col>VIEW</a-col>
                  <a-col>지식iN</a-col>
                  <a-col>플레이스</a-col>
                </a-row>
              </a-col>
              <a-col :span="12">
                <a-row>
                  <h3>Mobile</h3>
                </a-row>
                <a-row>
                  <a-col>파워링크</a-col>
                  <a-col>네이버쇼핑</a-col>
                  <a-col>VIEW</a-col>
                  <a-col>지식iN</a-col>
                  <a-col>플레이스</a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-card>
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
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout.vue";
import LineChart from "../components/LineChart";

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
    };
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

<style lang="scss">
* {
  box-sizing: border-box;
}

.container > * {
  margin-bottom: 20px !important;
}
</style>
