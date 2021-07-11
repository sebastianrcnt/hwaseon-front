<template>
  <MainLayout>
    <a-row gutter="16" type="flex" align="middle" style="width: 100%;">
      <a-card style="width: 100%;">
        <a-row align="middle" type="flex" style="margin-bottom: 16px;">
          <a-col span="6">
            블로그 ID
          </a-col>
          <a-col span="18">
            <a-input
              style="width: 100%;"
              placeholder="ex) dotoree0103"
              v-model="blogId"
            ></a-input>
          </a-col>
        </a-row>
        <a-row align="middle" type="flex" justify="end">
          <a-space>
            <a-button @click="handleKeywordAutoGenerate"
              >키워드 자동 생성</a-button
            >
            <a-button @click="handleUpdateSearchRanks">View 순위 확인</a-button>
            <a-button type="primary" @click="handleSearchClick"
              >검색하기</a-button
            >
          </a-space>
        </a-row>
      </a-card>
    </a-row>
    <!-- Search Results -->
    <a-card title="검색 결과">
      <a-table :columns="columns" :dataSource="dataSource" :loading="loading">
        <span slot="titleWithInspectMessage" slot-scope="title, post">
          <a
            :key="post.logNo"
            :href="`https://blog.naver.com/${post.blogId}/${post.logNo}`"
            >{{ title }}</a
          >
        </span>
        <span slot="hashTags" slot-scope="post">
          <a-input
            @keydown="handleHashTagChange($event, post.logNo)"
            @keyup="handleHashTagChange($event, post.logNo)"
            :value="post.bestHashTag"
          >
          </a-input>
        </span>
        <span slot="keywordInsight" slot-scope="post">
          <a-button
            :key="post.logNo"
            @click="navigateToKeywordInsights(post.bestHashTag)"
          >
            키워드 인사이트 보기</a-button
          >
        </span>
      </a-table>
    </a-card>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout.vue";
import { getBestHashTag } from "../utils/getBestHashTag";

const columns = [
  {
    key: "titleWithInspectMessage",
    dataIndex: "titleWithInspectMessage",
    title: "제목",
    scopedSlots: {
      customRender: "titleWithInspectMessage",
    },
  },
  {
    title: "View 순위",
    customRender(text, record, index) {
      return index + 1;
    },
  },
  {
    key: "hashTags",
    title: "키워드",
    scopedSlots: {
      customRender: "hashTags",
    },
  },
  {
    key: "searchRank",
    dataIndex: "searchRank",
    title: "검색순위",
  },
  {
    key: "keywordInsight",
    title: "액션",
    scopedSlots: {
      customRender: "keywordInsight",
    },
  },
];

export default {
  name: "BlogSEOPage",
  components: {
    MainLayout,
  },
  data() {
    return {
      loading: false,
      blogId: "",
      columns,
      dataSource: [],
    };
  },
  mounted() {},
  computed: {},
  methods: {
    getBestHashTag,
    navigateToKeywordInsights(keyword) {
      let routeUrl = this.$router.resolve({
        path: "/features/category",
        query: { keyword },
      });
      window.open(routeUrl.href, "_blank");
    },
    handleSearchClick() {
      this.loading = true;
      this.$store
        .dispatch("blogService/fetch", this.blogId)
        .then(() => {
          this.setDataSource();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleHashTagChange(event, postId) {
      console.log(event.target.value, postId);
      this.$store.commit("blogService/setBestHashTag", {
        postId,
        hashTag: event.target.value,
      });
    },
    handleKeywordAutoGenerate() {
      this.handleSearchClick();
    },
    handleUpdateSearchRanks() {
      this.loading = true;
      this.$store
        .dispatch("blogService/updateSearchRanks")
        .then(() => {
          this.setDataSource();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // ...mapState("blogService", ["loading"]),
    setDataSource() {
      // todo - change to getter
      this.dataSource = this.$store.state.blogService.rawPosts;
    },
  },
};
</script>
