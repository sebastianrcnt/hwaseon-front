<template>
  <MainLayout>
    <div class="container" style="padding: 20px;">
      <a-row :gutter="16" type="flex" align="middle" style="width: 100%;">
        <a-card style="width: 100%;">
          <a-row align="middle" type="flex" style="margin-bottom: 16px;">
            <a-col span="6">마켓 선택</a-col>
            <a-col span="18">
              <a-select default-value="1" style="width: 100%">
                <a-select-option value="1">스토어팜</a-select-option>
                <a-select-option value="2">쿠팡</a-select-option>
              </a-select>
            </a-col>
          </a-row>
          <a-row align="middle" type="flex" style="margin-bottom: 16px;">
            <a-col span="6">
              상품 URL
            </a-col>
            <a-col span="18">
              <a-input style="width: 100%;"></a-input>
            </a-col>
          </a-row>
          <a-row align="middle" type="flex" style="margin-bottom: 16px;">
            <a-col span="6">키워드 입력</a-col>
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
              <a-tooltip>
                <a-button>
                  키워드 자동생성
                </a-button>
                <template slot="title">
                  태그를 자동으로 입력합니다
                </template>
              </a-tooltip>
              <a-button type="primary">검색하기</a-button>
            </a-space>
          </a-row>
        </a-card>
      </a-row>
      <!-- Search Results -->
      <a-card title="검색 결과">
        <a-table></a-table>
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
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout.vue";

export default {
  name: "TrackingPage",
  components: {
    MainLayout,
  },
  data() {
    return {
      current: ["1"],
    };
  },
  mounted() {},
  methods: {},
};
</script>
