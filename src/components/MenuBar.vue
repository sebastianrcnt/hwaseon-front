<template>
  <a-menu
    mode="horizontal"
    :defaultSelectedKeys="[1]"
    v-model="current"
    style="display: flex; justify-content: center;"
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
      current: "1",
    };
  },

  methods: {
    handleMenuSelect({ item, key, keyPath }) {
      console.log({ item, key, keyPath });
      this.$router.push(key);
    },
  },
};
</script>

<style></style>
