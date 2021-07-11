<template>
  <MainLayout>
    <a-row :gutter="16" type="flex" align="middle" style="width: 100%;">
      <a-card style="width: 100%;">
        <a-row align="middle" type="flex" style="margin-bottom: 16px;">
          <a-col span="6">마켓 선택</a-col>
          <a-col span="18">
            <a-select default-value="COUPANG" style="width: 100%">
              <a-select-option value="NAVER">스토어팜</a-select-option>
              <a-select-option value="COUPANG">쿠팡</a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row align="middle" type="flex" style="margin-bottom: 16px;">
          <a-col span="6">
            상품 URL
          </a-col>
          <a-col span="18">
            <a-input style="width: 100%;" v-model="productUrl"></a-input>
          </a-col>
        </a-row>
        <a-row align="middle" type="flex" style="margin-bottom: 16px;">
          <a-col span="6">
            상품 ID(자동추출)
          </a-col>
          <a-col span="18">
            <template v-if="isValidUrl">
              <a-tag color="green">
                파싱성공
              </a-tag>
              <a-tag>
                {{ productId }}
              </a-tag>
            </template>
            <template v-else>
              <a-tag color="red">
                파싱실패
              </a-tag>
            </template>
          </a-col>
        </a-row>
        <a-row align="middle" type="flex" style="margin-bottom: 16px;">
          <a-col span="6">키워드 입력</a-col>
          <a-col span="18">
            <a-tooltip>
              <a-select
                mode="tags"
                style="width: 100%; height: 100%;"
                v-model="keywords"
              ></a-select>
              <template slot="title">
                1회 최대 10개까지 입력 가능합니다
              </template>
            </a-tooltip>
          </a-col>
        </a-row>
        <a-row align="middle" type="flex" justify="end">
          <a-space>
            <a-tooltip>
              <a-button>
                키워드 자동생성
              </a-button>
              <template slot="title">
                태그를 자동으로 입력합니다
              </template>
            </a-tooltip>
            <a-button
              type="primary"
              :disabled="!isValidUrl || keywords.length === 0"
              @click="handleSearchClick"
              >검색하기</a-button
            >
          </a-space>
        </a-row>
      </a-card>
    </a-row>
    <!-- Search Results -->
    <a-card title="검색 결과">
      <a-table :columns="columns" :dataSource="dataSource"></a-table>
    </a-card>
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
        <a-table> </a-table>
      </a-row>
    </a-card>
    <a-card title="키워드별 예상 판매 (NPay 기준 | 최근 7일간)">
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
        <a-table> </a-table>
      </a-row>
    </a-card>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout.vue";
import { parseCoupangItemId } from "../utils/url";
import { fetchProductRankWithinKeywordsCoupang } from "../fetchers/index";

const columns = [
  { dataIndex: "keyword", key: "keyword", title: "키워드" },
  {
    dataIndex: "rank",
    key: "rank",
    title: "순위",
    customRender(text, record) {
      return text === -1 ? "100+" : text;
    },
  },
];

export default {
  name: "TrackingPage",
  components: {
    MainLayout,
  },
  data() {
    return {
      columns,
      current: ["1"],
      // productUrl: "",
      productUrl:
        "https://www.coupang.com/vp/products/170864974?itemId=488771624&vendorItemId=4235099705&sourceType=srp_product_ads&clickEventId=da71efc4-7f34-4aeb-bfd0-e6b17a5e358c&korePlacement=15&koreSubPlacement=5&q=수분에센스&itemsCount=36&searchId=7f144ea42e9f4cb083e3209b900910af&rank=4&isAddedCart=",
      store: "COUPANG",
      // keywords: [],
      keywords: [
        "수분에센스",
        "에센스추천",
        "촉촉한에센스",
        "피부붉은기",
        "얼굴붉은기",
      ],
      productRanks: {},
    };
  },
  mounted() {},
  methods: {
    async handleSearchClick() {
      const productRanks = await fetchProductRankWithinKeywordsCoupang(
        this.keywords,
        this.productId
      );
      this.productRanks = productRanks;
    },
  },
  computed: {
    dataSource() {
      let arr = [];
      for (let keyword in this.productRanks) {
        arr.push({ keyword, rank: this.productRanks[keyword] });
      }
      return arr;
    },
    productId() {
      switch (this.store) {
        case "COUPANG":
          return parseCoupangItemId(this.productUrl);
        case "NAVER":
          return 1;
        default:
          return 1;
      }
    },
    isValidUrl() {
      switch (this.store) {
        case "COUPANG":
          return this.productId !== -1;
        case "NAVER":
          return false;
        default:
          return false;
      }
    },
  },
};
</script>
