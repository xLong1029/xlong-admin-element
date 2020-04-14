<template>
  <!-- eslint-disable -->
  <div class="statistics-screen-3">
    <div class="statistics-screen-3__left">
      <!-- 排行榜 -->
      <div class="ranking-container statistics-frame">
        <span class="statistics-frame-title">服务用户排行</span>
        <div
          class="statistics-frame-content"
          v-loading="ranking.loading"
          element-loading-background="loadingBackground"
        >
          <template v-if="!ranking.loading">
            <div class="chart-content">
              <ranking-bar-chart
                v-if="ranking.data.chartData.length"
                class-name="rankingChart"
                :chart-data="ranking.data.chartData"
                :axis="ranking.data.axis"
                :series="ranking.data.series"
                :sort="true"
                :height="`${620*contrastRadio}px`"
              />
              <empty v-else :height="`${620*contrastRadio}px`" />
            </div>
          </template>
          <empty v-else :height="`${600*contrastRadio}px`" />
        </div>
      </div>
      <!-- 业务类型 -->
      <div class="business-type-container">
        <div class="statistics-frame">
          <span class="statistics-frame-title">{{ businessType.title }}</span>
          <div
            class="statistics-frame-content"
            v-loading="businessType.loading"
            element-loading-background="loadingBackground"
          >
            <template v-if="!businessType.loading && businessType.chartData.length">
              <div class="chart-content">
                <pie-chart
                  class-name="businessType"
                  :chart-data="businessType.chartData"
                  :carousel="true"
                  :width="`${500*contrastRadio}px`"
                  :height="`${260*contrastRadio}px`"
                  :scale="contrastRadio"
                />
              </div>
            </template>
            <empty v-else :height="`${280*contrastRadio}px`" />
          </div>
        </div>
      </div>
    </div>
    <div class="statistics-screen-3__right">
      <div class="projects-container statistics-frame">
        <span class="statistics-frame-title">各业务应用情况</span>
        <div
          class="statistics-frame-content"
          v-loading="ranking.loading"
          element-loading-background="loadingBackground"
        >
          <template v-if="!ranking.loading">
            <div class="chart-content">
              <ranking-bar-chart
                v-if="ranking.data.chartData.length"
                class-name="rankingChart"
                :chart-data="ranking.data.chartData"
                :axis="ranking.data.axis"
                :series="ranking.data.series"
                :sort="true"
                :height="`${620*contrastRadio}px`"
              />
              <empty v-else :height="`${620*contrastRadio}px`" />
            </div>
          </template>
          <empty v-else :height="`${600*contrastRadio}px`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import RankingBarChart from "components/statistics-screen/Charts/RankingBarChart";
import PieChart from "components/statistics-screen/Charts/PieChart";
import Empty from "components/common/Empty";

import areaJson from "mock/guangxi-area.json";

const appNames = [
  "XLONG家里蹲-OA办公系统",
  "XLONG家里蹲-企业信息化系统",
  "XLONG家里蹲-CMS系统",
  "XLONG家里蹲-电商App",
  "XLONG家里蹲-数据抓取软件",
  "XLONG家里蹲-你画我猜软件"
];

export default {
  name: "SplitScreenThree",
  components: {
    PieChart,
    RankingBarChart,
    Empty
  },
  props: {
    // loading背景
    loadingBackground: {
      type: String,
      default: "loadingBackground"
    },
    // 响应式比率
    contrastRadio: {
      type: Number,
      default: 1
    },
    // 地图弹窗消息
    popupMsg: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    popupMsg(data) {
      let arr = [...this.ranking.data.chartData];
      arr.forEach(e => {
        if (e.name == data.cityName) {
          e.count++;
        }
      });
      this.ranking.data.chartData = arr;
    }
  },
  data() {
    return {
      ranking: {
        loading: false,
        defaultChartData: [],
        data: {
          series: [
            {
              name: "受理数",
              property: "count"
            }
          ],
          axis: {
            name: "地区",
            property: "name"
          },
          chartData: []
        }
      },
      // 业务类型数据
      businessType: {
        loading: false,
        title: "业务类型",
        chartData: []
      },
      // 定时器
      requestTimer: null
    };
  },
  created() {
    this.init();
  },
  beforeDestroy() {
    this.clearTimer([this.requestTimer]);
  },
  methods: {
    // 初始化
    init() {
      this.ranking.loading = true;
      this.businessType.loading = true;

      this.getRankingData();
      this.getStatisticsData();
      this.setTimer();
    },
    // 获取受理排行数据
    getRankingData() {
      /* 测试数据-start */
      this.ranking.defaultChartData = areaJson.map(e => {
        return {
          name: e.name,
          count: Math.round(Math.random() * 20)
        };
      });
      this.ranking.data.chartData = [...this.ranking.defaultChartData];
      setTimeout(() => (this.ranking.loading = false), 500);
      /* 测试数据-end */
    },
    // 获取统计数据
    getStatisticsData() {
      /* 测试数据-start */
      // 业务类型
      this.businessType.chartData = [
        { value: 10, name: "智慧城市项目" },
        { value: 10, name: "小程序应用" },
        { value: 20, name: "企业网站" },
        { value: 5, name: "电商项目" },
        { value: 5, name: "App应用" },
        { value: 5, name: "H5场景应用" }
      ];

      setTimeout(() => {
        this.businessType.loading = false;
      }, 500);
      /* 测试数据-end */
    },
    // 设置定时器
    setTimer() {
      // 请求
      this.requestTimer = setInterval(() => {
        this.getStatisticsData();
      }, 60 * 1000);
    },
    // 清除定时器
    clearTimer(timers) {
      timers.forEach(e => clearInterval(e));
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../styles/statistics-screen.scss";

.statistics-screen-3 {
  padding-left: 15rem * $baseUnit;

  &__left{
    margin-right: 15rem * $baseUnit;
  }
}

.ranking-container {
  margin-bottom: 15rem * $baseUnit;
  margin-left: -6rem * $baseUnit;
  @include background-setting(
    "../../../../assets/screen_images/img_03.png",
    33%,
    655rem * $baseUnit
  );

  .statistics-frame-title {
    left: 25rem * $baseUnit;
  }
}

.business-type-container {
  color: #99dced;

  @include background-setting(
    "../../../../assets/screen_images/img_02.png",
    32%,
    335rem * $baseUnit
  );

  .statistics-frame-content {
    padding-left: 10rem * $baseUnit;
    padding-right: 10rem * $baseUnit;
  }

  .chart-content {
    margin-left: -115rem * $baseUnit;
  }

  &:nth-child(2n) {
    margin-right: 0;
  }
}
</style>
