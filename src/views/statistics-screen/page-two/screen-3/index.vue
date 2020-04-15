<template>
  <!-- eslint-disable -->
  <div class="statistics-screen-3 flex">
    <div class="statistics-screen-3__left">
      <!-- 排行榜 -->
      <div class="ranking-container statistics-frame">
        <span class="statistics-frame-title">当日新增用户排行</span>
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
          <template v-if="projects.data.length && chartsVisiable">
            <div class="charts-container flex">
              <div
                v-for="(item, index) in projects.data"
                :key="index"
                class="charts-item"
                :class="`charts-counts-${grid}`"
              >
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
                    :key="`chart-${index}`"
                    :class-name="`chart-index`"
                    width="100%"
                    :height="`${grid === 4 ? 340 * contrastRadio +'px' : 180 * contrastRadio + 'px'}`"
                    :chart-data="item.chart"
                    :title="item.chart.title"
                    :scale="contrastRadio"
                  ></project-statistics-chat>
                  <projects-pie-chart
                    v-else
                    :key="`pie-${index}`"
                    :class-name="`chart-${index}`"
                    width="100%"
                    :height="`${340 * contrastRadio}px`"
                    :chart-data="item.chart"
                    :scale="contrastRadio"
                    :title="item.chart.title"
                  ></projects-pie-chart>
                </div>
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
import JsonData from "mock/data.json";

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
    },
    activeIndex() {
      this.chartsVisiable = false;
      const chart = JSON.parse(
        JSON.stringify(JsonData.statisticsSystemsChart[this.activeIndex].data)
      );
      chart.forEach(e => {
        if (e.chartType === "pie") {
          e.chart = e.chart.data;
        }
      });

      this.projects.data = chart;

      this.grid =
        this.projects.data.length % 4 === 0 ? 4 : this.projects.data.length % 4;
      
      // 切换tab时，图表宽度保留上一次栅格的宽度
      setTimeout(() => {
        this.chartsVisiable = true;
      }, 0);
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
          title: "智慧城市类",
          show: true
        },
        {
          title: "小程序",
          show: true
        },
        {
          title: "企业网站",
          show: true
        },
        {
          title: "电商",
          show: true
        },
        {
          title: "App开发",
          show: true
        },
        {
          title: "H5场景",
          show: true
        }
      ],
      projects: {
        loading: false,
        data: []
      },
      activeIndex: 0,
      chartsVisiable: true,
      // 栅格
      grid: 1,
      tabTimer: null
    };
  },
  created() {
    this.init();
  },
  beforeDestroy() {
    this.clearTimer([this.tabTimer]);
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
        { value: 4, name: "智慧城市类" },
        { value: 4, name: "小程序" },
        { value: 4, name: "企业网站" },
        { value: 4, name: "电商" },
        { value: 4, name: "App开发" },
        { value: 2, name: "H5场景" }
      ];

      setTimeout(() => {
        this.projects.loading = false;
      }, 500);
      /* 测试数据-end */
    },
    // 获取应用数据
    getProjectsData() {
      /* 测试数据-start */
      this.projects.data = JsonData.statisticsSystemsChart[0].data;

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
  justify-content: space-between;

  &__left {
    width: 30%;
    margin-right: 15rem * $baseUnit;
  }

  &__right {
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
    position: absolute;
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
    99.5%
  );

  .charts-container {
    flex-wrap: wrap;
  }

  .charts {
    &-counts-1 {
      width: 100%;
    }

    &-counts-2 {
      width: 100%;
    }

    &-counts-3 {
      width: 100%;
    }

    &-counts-4 {
      width: 50%;
    }

    &-item {
      // width: 100%;
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
