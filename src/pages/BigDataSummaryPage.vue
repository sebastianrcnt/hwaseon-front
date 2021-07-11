<template>
  <MainLayout>
    <a-row gutter="16" type="flex" align="middle" style="width: 100%;">
      <a-card style="width: 100%;">
        <a-row align="middle" type="flex" style="margin-bottom: 16px;">
          <a-col span="6">키워드 대량 입력</a-col>
          <a-col span="18">
            <a-tooltip>
              <a-select
                mode="tags"
                style="width: 100%; height: 100%;"
                v-model="keywords"
              ></a-select>
              <template slot="title">
                1회 최대 100개까지 입력 가능합니다
              </template>
            </a-tooltip>
          </a-col>
        </a-row>
        <a-row align="middle" type="flex" style="margin-bottom: 16px;">
          <a-col span="6">csv 파일 업로드</a-col>
          <a-col span="18">
            <a-tooltip>
              <a-upload
                file="csvFile"
                @change="handleFileChange"
                :before-upload="beforeUpload"
              >
                <a-button>
                  클릭하여 업로드
                </a-button>
              </a-upload>
              <template slot="title">
                csv 파일로 만들어 주세요
              </template>
            </a-tooltip>
          </a-col>
        </a-row>
        <a-row align="middle" type="flex" justify="end">
          <a-space>
            <a-button type="primary" @click="handleSearchClick"
              >검색하기</a-button
            >
          </a-space>
        </a-row>
      </a-card>
    </a-row>
    <!-- Search Results -->
    <a-card title="검색 결과">
      <a-table :columns="columns" :dataSource="keywordData" :loading="loading">
        <span slot="actions" slot-scope="keyword">
          <a-button
            :key="keyword.relKeyword"
            @click="navigateToKeywordInsights(keyword.relKeyword)"
          >
            자세히 보기</a-button
          >
        </span>
      </a-table>
    </a-card>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout.vue";
import { fetchRelKeywordStatistics } from "../fetchers/index";
import moment from "moment";

const columns = [
  {
    key: "relKeyword",
    dataIndex: "relKeyword",
    title: "키워드",
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
  {
    key: "actions",
    title: "액션",
    scopedSlots: {
      customRender: "actions",
    },
  },
];

export default {
  name: "BigDataSummaryPage",
  components: {
    MainLayout,
  },
  data() {
    return {
      loading: false,
      columns,
      keywords: [],
      keywordData: [],
      file: null,
    };
  },
  mounted() {},
  methods: {
    async handleSearchClick() {
      let month = moment().month();
      this.loading = true;
      let promises = this.keywords.map(async (keyword) => {
        const { data } = await fetchRelKeywordStatistics(keyword, month);
        return data;
      });

      let data = await Promise.all(promises);
      this.loading = false;
      this.keywordData = data;
    },
    navigateToKeywordInsights(keyword) {
      let routeUrl = this.$router.resolve({
        path: "/features/category",
        query: { keyword },
      });
      window.open(routeUrl.href, "_blank");
    },
    handleFileChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload(file) {
      this.file = file;
      let vueThis = this;
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function() {
        const keywords = reader.result.split("\n").slice(0, 100);
        vueThis.keywords = keywords;
        console.log("result:", keywords);
      };
      return false;
    },
  },
};
</script>
