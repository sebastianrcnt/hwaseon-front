<template>
  <a-menu
    mode="horizontal"
    style="display: flex; justify-content: center;"
    v-model="current"
    @select="handleMenuSelect"
  >
    <a-menu-item key="/features/category">
      키워드 분석/카테고리 현황
    </a-menu-item>
    <a-menu-item key="/features/tracking">
      제품트래킹/키워드별 예상 판매량
    </a-menu-item>
    <a-menu-item key="/features/summary">
      대량키워드 요약
    </a-menu-item>
    <a-menu-item key="/features/blog">
      블로그 노출 확인
    </a-menu-item>
  </a-menu>
</template>

<script>
export default {
  data() {
    return {
      current: [],
    };
  },
  methods: {
    handleMenuSelect({ item, key, keyPath }) {
      this.$router.push(key);
    },
  },
  mounted() {
    console.log(this.$route)
    this.current = [this.$route.path]
  }
};
</script>

<style></style>
