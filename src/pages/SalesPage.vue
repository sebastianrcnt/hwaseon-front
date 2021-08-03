<template>
  <MainLayout>
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
  </MainLayout>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import MainLayout from "../layouts/MainLayout.vue";

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
  name: "SalesPage",
  components: {
    MainLayout,
  },
  data() {
    return {
      naverShoppingProductsColumns,
    };
  },
  mounted() {
    this.clearNaverShoppingProducts();
  },
  computed: {
    ...mapState("naverShoppingProductsService", {
      naverShoppingProductsLoading: (state) => state.loading,
    }),
    ...mapGetters("naverShoppingProductsService", [
      "naverShoppingProductsDataSource",
    ]),
  },
  methods: {
    handleSearchNaverShoppingProductsSearch() {
      this.$store.dispatch("naverShoppingProductsService/fetch", this.keyword2);
    },
    clearNaverShoppingProducts() {
      this.$store.dispatch("naverShoppingProductsService/clear");
    },
  },
};
</script>

<style></style>
