<template>
  <HomeLayout>
    <h1 class="home-logo">HWASEON</h1>
    <div class="search-input-container">
      <a-input-search
        type="text"
        class="search-input"
        placeholder="검색어를 입력하세요"
        size="large"
        enter-button
      ></a-input-search>
    </div>
    <ul class="features">
      <a-space size="large">
        <router-link class="feature" to="/features/category">
          키워드 분석/카테고리 현황
        </router-link>
        <router-link class="feature" to="/features/tracking">
          제품트래킹/키워드별 예상 판매량
        </router-link>
        <router-link class="feature" to="/features/summary">
          대량키워드 요약
        </router-link>
        <router-link class="feature" to="/features/blog">
          블로그 노출 확인
        </router-link>
      </a-space>
    </ul>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../layouts/HomeLayout.vue";

export default {
  name: "HomePage",
  components: {
    HomeLayout,
  },
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style lang="scss">
.home-logo {
  text-align: center;
  font-size: 80px;
  font-weight: bold;
  color: #ff6633;
  text-transform: uppercase;
  opacity: 1;
  cursor: pointer;
  margin-bottom: 50px;
}

.search-input-container {
  width: 100vw;
  max-width: 600px;
  margin-bottom: 30px;
}

.search-input {
  input,
  span {
    border-radius: 0;
  }
  input {
    text-align: center !important;
  }
  transform: scale(1.2);
  ::placeholder {
    text-align: center;
  }
}

.features {
  .feature {
    color: #999;
    font-size: 1rem;
  }
}
</style>
