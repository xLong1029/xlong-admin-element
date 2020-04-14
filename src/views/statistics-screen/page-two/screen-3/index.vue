<template>
  <!-- eslint-disable -->
  <div class="statistics-screen-3 flex">
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
        <div class="statistics-tab">
          <span
            class="statistics-tab-item"
            v-for="(item, index) in projectsTab"
            :key="index"
            :class="{ 'is-active': activeIndex === index }"
            v-html="item.title"
            @click="changeTab(index)"
          ></span>
        </div>
        <div
          class="statistics-frame-content"
          v-loading="projects.loading"
          element-loading-background="loadingBackground"
        >
          <template v-if="projects.chartData.length">
            <div v-for="(item, index) in projects.chartData" :key="index" class="charts-item">
              <h4 class="charts-item-title">{{ item.title }}</h4>
              <div class="charts-item-summary flex">
                <div
                  class="charts-item-summary__block"
                  v-for="(sub, subIndex) in item.tabBarData"
                  :key="subIndex"
                >
                  <h4>{{ sub.value }}</h4>
                  <span>{{ sub.label }}</span>
                </div>
              </div>
              <div class="charts-item-chart">
                <project-statistics-chat
                  v-if="item.chartType === 'bar'"
                  :key="`chart-${activeIndex}-${index}`"
                  :class-name="`project-statistics-chat-${activeIndex}-${index}`"
                  :height="`${400 * contrastRadio}px`"
                  :chart-data="item.chart"
                  :title="item.chart.title"
                  :scale="contrastRadio"
                ></project-statistics-chat>
                <projects-pie-chart
                  v-else
                  carousel
                  :key="`pie-${activeIndex}-${index}`"
                  :chart-data="item.chart"
                  :scale="contrastRadio"
                  :title="item.chart.title"
                  :class-name="`project-statistics-chat-${activeIndex}-${index}`"
                  :height="`${400 * contrastRadio}px`"
                ></projects-pie-chart>
              </div>
            </div>
          </template>
          <empty v-else :height="`${800*contrastRadio}px`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import RankingBarChart from "components/statistics-screen/Charts/RankingBarChart";
import ProjectsPieChart from "components/statistics-screen/Charts/ProjectsPieChart";
import ProjectStatisticsChat from "components/statistics-screen/Charts/ProjectStatisticsChat";
import PieChart from "components/statistics-screen/Charts/PieChart";
import Empty from "components/common/Empty";

import areaJson from "mock/guangxi-area.json";

export default {
  name: "SplitScreenThree",
  components: {
    PieChart,
    RankingBarChart,
    ProjectsPieChart,
    ProjectStatisticsChat,
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
      // 应用
      projectsTab: [
        {
          title: "智慧城市项目",
          show: true,
          charts: ["bar", "bar", "pie"]
        },
        {
          title: "小程序应用",
          show: true,
          charts: ["bar", "bar", "bar"]
        },
        {
          title: "企业网站",
          show: true,
          charts: ["pie", "pie"]
        },
        {
          title: "App应用",
          show: true,
          charts: ["bar", "bar"]
        },
        {
          title: "H5场景应用",
          show: true,
          charts: ["bar", "bar"]
        }
      ],
      projects: {
        loading: false,
        chartData: [],
      },
      activeIndex: 0,
      // 定时器
      requestTimer: null,
      tabTimer: null
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
      this.projects.loading = true;

      this.getRankingData();
      this.getBusinessTypeData();
      this.getProjectsData();
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
    // 获取业务数据
    getBusinessTypeData() {
      /* 测试数据-start */
      this.businessType.chartData = [
        { value: 10, name: "智慧城市项目" },
        { value: 10, name: "小程序应用" },
        { value: 20, name: "企业网站" },
        { value: 5, name: "电商项目" },
        { value: 5, name: "App应用" },
        { value: 5, name: "H5场景应用" }
      ];

      setTimeout(() => {
        this.projects.loading = false;
      }, 500);
      /* 测试数据-end */
    },
    // 获取应用数据
    getProjectsData() {
      /* 测试数据-start */


      setTimeout(() => {
        this.businessType.loading = false;
      }, 500);
      /* 测试数据-end */
    },
    // Tab切换
    changeTab(index) {
      this.activeIndex = index;
    },
    // 设置定时器
    setTimer() {
      // 请求
      this.requestTimer = setInterval(() => {
        this.getBusinessTypeData();
      }, 60 * 1000);

      // Tab
      this.tabTimer = setInterval(() => {
        this.activeIndex =
          this.activeIndex + 1 >= this.projectsTab.length
            ? 0
            : this.activeIndex + 1;
      }, 5 * 1000);
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
  justify-content:space-between;

  &__left {
    width: 30%;
    margin-right: 15rem * $baseUnit;
  }

  &__right{
    width: 70%;
  }
}

.ranking-container {
  margin-bottom: 15rem * $baseUnit;
  margin-left: -6rem * $baseUnit;
  @include background-setting(
    "../../../../assets/screen_images/img_03.png",
    103%,
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
    100%,
    340rem * $baseUnit
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

.statistics {
  &-tab {
    position:absolute;
    top: 22rem * $baseUnit;
    right: 12rem * $baseUnit;
    &-item {
      padding: 8rem * $baseUnit 20rem * $baseUnit;
      margin: 0 4rem * $baseUnit;
      color: #99dced;
      border: 2px solid #154688;
      cursor: pointer;
      position: relative;
      z-index: 2;

      &.is-active {
        color: $color-yellow;
        font-weight: bold;
        border-color: $color-yellow;
      }
    }
  }
}

.projects-container {

  @include background-setting(
    "../../../../assets/screen_images/img_01.png",
    100%,
    100%
  );

  .charts {
    &-counts-2 {
      width: 50%;
    }

    &-counts-3 {
      width: 33.33%;
    }

    &-item {
      width: 100%;
      padding: 8rem * $baseUnit 20rem * $baseUnit;

      &-title {
        color: $color-yellow;
      }
      &-summary {
        justify-content: space-between;
        &__block {
          width: 100%;
          h4 {
            font-size: 24rem * $baseUnit;
            font-weight: bold;
            color: #13ce66;
            margin: 0;
          }

          span {
            font-size: 8rem * $baseUnit;
          }
        }
      }
    }
  }
}
</style>
