<template>
  <!-- eslint-disable -->
  <div class="statistics-screen-3 system-situation-layout flex">
    <div class="system-situation-layout-left">
      <div class="system-situation-layout-left__top flex">
        <!-- 数据库类型 -->
        <div class="pie-chart-container">
          <div class="databse-container statistics-frame">
            <span class="statistics-frame-title">{{ databaseType.title }}</span>
            <div
              class="statistics-frame-content"
              v-loading="databaseType.loading"
              element-loading-background="loadingBackground"
            >
              <template v-if="!databaseType.loading && databaseType.chartData.length">
                <div class="chart-content">
                  <pole-chart
                    class-name="databaseType"
                    :title="databaseType.title"
                    :chart-data="databaseType.chartData"
                    :carousel="true"
                    :width="`${480*contrastRadio}px`"
                    :height="`${220*contrastRadio}px`"
                  />
                </div>
                <statistics-progress title="国产率" :rate="databaseType.isSafePersent" class="mt-10" />
              </template>
              <empty v-else :height="`${280*contrastRadio}px`" />
            </div>
          </div>
        </div>
        <!-- 运行环境 -->
        <div class="pie-chart-container">
          <div class="statistics-frame">
            <span class="statistics-frame-title">{{ runtime.title }}</span>
            <div
              class="statistics-frame-content"
              v-loading="runtime.loading"
              element-loading-background="loadingBackground"
            >
              <template v-if="!runtime.loading && runtime.chartData.length">
                <div class="chart-content">
                  <pole-chart
                    class-name="runtime"
                    :chart-data="runtime.chartData"
                    :carousel="true"
                    :width="`${480*contrastRadio}px`"
                    :height="`${220*contrastRadio}px`"
                    :scale="contrastRadio"
                  />
                </div>
                <statistics-progress title="国产率" :rate="runtime.isSafePersent" class="mt-10" />
              </template>
              <empty v-else :height="`${280*contrastRadio}px`" />
            </div>
          </div>
        </div>
        <!-- 业务类型 -->
        <div class="pie-chart-container">
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
                    :width="`${480*contrastRadio}px`"
                    :height="`${260*contrastRadio}px`"
                    :scale="contrastRadio"
                  />
                </div>
              </template>
              <empty v-else :height="`${280*contrastRadio}px`" />
            </div>
          </div>
        </div>
        <!-- 服务类型 -->
        <div class="pie-chart-container">
          <div class="statistics-frame">
            <span class="statistics-frame-title">{{ serviceType.title }}</span>
            <div
              class="statistics-frame-content"
              v-loading="serviceType.loading"
              element-loading-background="loadingBackground"
            >
              <template v-if="!serviceType.loading && serviceType.chartData.length">
                <div class="chart-content">
                  <pie-chart
                    class-name="serviceType"
                    :chart-data="serviceType.chartData"
                    :carousel="true"
                    :width="`${480*contrastRadio}px`"
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
      <div class="system-situation-layout-left__bottom">
        <!-- 服务器使用情况 -->
        <div class="server-use-container statistics-frame">
          <span class="statistics-frame-title">服务器使用情况</span>
          <div class="statistics-tab">
            <span
              v-for="(item, index) in serverUse.tabs"
              :key="'statistics-tab' + index"
              class="statistics-tab-item"
              :class="{ 'is-active': serverUse.activeTab === item }"
            >{{ item }}</span>
          </div>
          <div
            class="statistics-frame-content"
            v-loading="serverUse.loading"
            element-loading-background="loadingBackground"
          >
            <template v-if="!serverUse.loading">
              <server-use-list
                v-if="serverUse.activeTab === 'CPU'"
                :list="serverUse.data.cpuOrder"
                :active-tab="serverUse.activeTab"
              />
              <server-use-list
                v-if="serverUse.activeTab === 'RAM'"
                :list="serverUse.data.ramOrder"
                :active-tab="serverUse.activeTab"
              />
              <server-use-list
                v-if="serverUse.activeTab === 'DISK'"
                :list="serverUse.data.diskOrder"
                :active-tab="serverUse.activeTab"
              />
            </template>
            <empty v-else height="100%" />
          </div>
        </div>
      </div>
    </div>
    <div class="system-situation-layout-right">
      <!-- 应用使用情况 -->
      <div class="system-use-container statistics-frame">
        <span class="statistics-frame-title">应用使用情况</span>
        <div
          class="statistics-frame-content"
          v-loading="SystemDev.month.loading || SystemDev.quarter.loading"
          element-loading-background="loadingBackground"
        >
          <!-- 季度统计 -->
          <div class="system-use-quarter">
            <div class="system-use-quarter__title flex">
              <span class="name">季度统计</span>
              <span>
                <i class="yellow">{{ SystemDev.quarter.pager.total }}</i>个应用
              </span>
            </div>
            <div class="system-use-quarter__content">
              <template v-if="!SystemDev.quarter.loading">
                <gradual-bar-chart
                  v-if="SystemDev.quarter.data.chartData.length"
                  class-name="quarterChart"
                  :chart-data="SystemDev.quarter.data.chartData"
                  :axis="SystemDev.quarter.data.axis"
                  :series="SystemDev.quarter.data.series"
                  :sort="true"
                  :height="`${78 * contrastRadio * SystemDev.quarter.data.chartData.length}px`"
                />
                <empty v-else height="100%" />
              </template>
              <empty v-else height="100%" />
            </div>
          </div>
          <!-- 月度统计 -->
          <div class="system-use-month">
            <div class="system-use-month__title flex">
              <span class="name">月度统计</span>
              <span>
                <i class="yellow">{{ SystemDev.month.pager.total }}</i>个应用
              </span>
            </div>
            <div class="system-use-month__content">
              <template v-if="!SystemDev.month.loading">
                <gradual-bar-chart
                  v-if="SystemDev.month.data.chartData.length"
                  class-name="monthChart"
                  :chart-data="SystemDev.month.data.chartData"
                  :axis="SystemDev.month.data.axis"
                  :series="SystemDev.month.data.series"
                  :sort="true"
                  :height="`${78 * contrastRadio * SystemDev.month.data.chartData.length}px`"
                />
                <empty v-else height="100%" />
              </template>
              <empty v-else height="100%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import StatisticsProgress from "components/statistics-screen/StatisticsProgress";
import PieChart from "components/statistics-screen/Charts/PieChart";
import PoleChart from "components/statistics-screen/Charts/PoleChart";
import GradualBarChart from "components/statistics-screen/Charts/GradualBarChart";
import Empty from "components/common/Empty";

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
    StatisticsProgress,
    PieChart,
    PoleChart,
    GradualBarChart,
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
    }
  },
  data() {
    return {
      // 运行环境数据
      runtime: {
        loading: false,
        title: "运行环境",
        isSafePersent: 0,
        chartData: []
      },
      // 数据库类型数据
      databaseType: {
        loading: false,
        title: "数据库类型",
        isSafePersent: 0,
        chartData: []
      },
      // 业务类型数据
      businessType: {
        loading: false,
        title: "业务类型",
        chartData: []
      },
      // 服务类型数据
      serviceType: {
        loading: false,
        title: "服务类型",
        chartData: []
      },
      // 服务器使用情况
      serverUse: {
        loading: false,
        activeTab: "CPU",
        tabs: ["CPU", "RAM", "DISK"],
        data: {
          cpuOrder: [],
          ramOrder: [],
          diskOrder: []
        }
      },
      // 系统使用情况
      SystemDev: {
        // 月度
        month: {
          loading: false,
          data: {
            series: [
              {
                name: "使用次数",
                property: "useCount"
              }
            ],
            axis: {
              name: "系统名称",
              property: "appName"
            },
            chartData: []
          },
          pager: {
            pageNo: 1,
            pageSize: 10,
            total: 0
          }
        },
        // 季度
        quarter: {
          loading: false,
          data: {
            series: [
              {
                name: "使用次数",
                property: "useCount"
              }
            ],
            axis: {
              name: "系统名称",
              property: "appName"
            },
            chartData: []
          },
          pager: {
            pageNo: 1,
            pageSize: 6,
            total: 0
          }
        }
      },
      // 定时器
      requestTimer: null,
      tabTimer: null,
      SystemDevTimer: null
    };
  },
  created() {
    this.init();
  },
  beforeDestroy() {
    this.clearTimer([this.requestTimer, this.tabTimer, this.SystemDevTimer]);
  },
  methods: {
    // 初始化
    init() {
      this.runtime.loading = true;
      this.databaseType.loading = true;
      this.businessType.loading = true;
      this.serviceType.loading = true;
      this.serverUse.loading = true;
      this.SystemDev.month.loading = true;
      this.SystemDev.quarter.loading = true;

      this.getStatisticsData();
      this.getSystemDevData();
      this.setTimer();
    },
    // 获取统计数据
    getStatisticsData() {
      /* 测试数据-start */
      // 运行环境
      this.runtime.chartData = [
        { value: 30, name: "Windows" },
        { value: 5, name: "Linux" },
        { value: 5, name: "iOS" },
        { value: 15, name: "Android" }
      ];

      // 数据库类型
      this.databaseType.chartData = [
        { value: 5, name: "达梦数据库" },
        { value: 15, name: "Oracal" },
        { value: 30, name: "SqlServer" }
      ];
      this.databaseType.isSafePersent = 9;

      // 业务类型
      this.businessType.chartData = [
        { value: 10, name: "智慧城市项目" },
        { value: 10, name: "小程序应用" },
        { value: 20, name: "企业网站" },
        { value: 5, name: "电商项目" },
        { value: 5, name: "App应用" },
        { value: 5, name: "H5场景应用" }
      ];

      // 服务类型
      this.serviceType.chartData = [
        { value: 60293, name: "个人服务" },
        { value: 3004, name: "企业服务" },
        { value: 20241, name: "其他业务服务" }
      ];

      // 服务器使用情况
      this.serverUse.data = {
        cpuOrder: [
          {
            hostIP: "10.1.2.123",
            hostName: "测试应用1",
            cpuUsedRatio: 0.0044,
            ramUsedRatio: 0.7464,
            diskUsedRatio: 0.2596
          },
          {
            hostIP: "10.1.2.225",
            hostName: "测试应用2",
            cpuUsedRatio: 0.0007,
            ramUsedRatio: 0.9449,
            diskUsedRatio: 0.7136
          },
          {
            hostIP: "10.1.2.215",
            hostName: "测试应用3",
            cpuUsedRatio: 0.0004,
            ramUsedRatio: 0.2797,
            diskUsedRatio: 0.7122
          }
        ],
        ramOrder: [
          {
            hostIP: "10.1.2.218",
            hostName: "测试应用4",
            cpuUsedRatio: 0.0001,
            ramUsedRatio: 0.9727,
            diskUsedRatio: 0.4262
          },
          {
            hostIP: "10.1.2.212",
            hostName: "测试应用5",
            cpuUsedRatio: 0.0007,
            ramUsedRatio: 0.9449,
            diskUsedRatio: 0.7136
          },
          {
            hostIP: "10.1.2.134",
            hostName: "测试应用6",
            cpuUsedRatio: 0.0,
            ramUsedRatio: 0.9108,
            diskUsedRatio: 0.4133
          }
        ],
        diskOrder: [
          {
            hostIP: "10.1.2.165",
            hostName: "测试应用7",
            cpuUsedRatio: 0.0,
            ramUsedRatio: 0.5846,
            diskUsedRatio: 0.8579
          },
          {
            hostIP: "10.1.2.208",
            hostName: "测试应用8",
            cpuUsedRatio: 0.0003,
            ramUsedRatio: 0.699,
            diskUsedRatio: 0.854
          },
          {
            hostIP: "10.1.2.156",
            hostName: "测试应用9",
            cpuUsedRatio: 0.0001,
            ramUsedRatio: 0.8313,
            diskUsedRatio: 0.7305
          }
        ]
      };

      setTimeout(() => {
        this.runtime.loading = false;
        this.databaseType.loading = false;
        this.businessType.loading = false;
        this.serviceType.loading = false;
        this.serverUse.loading = false;
      }, 500);
      /* 测试数据-end */
    },
    // 定时获取应用使用情况
    getSystemDevData() {
      /* 测试数据-start */
      this.SystemDev.month.data.chartData = [];
      this.SystemDev.quarter.data.chartData = [];

      for (let i = 0; i < 6; i++) {
        this.SystemDev.month.data.chartData.push({
          appName: appNames[i],
          useCount: Math.round(Math.random() * 50)
        });
        this.SystemDev.month.pager.total = this.SystemDev.month.pager.pageSize;

        this.SystemDev.quarter.data.chartData.push({
          appName: appNames[i],
          useCount: Math.round(Math.random() * 50)
        });
        this.SystemDev.quarter.pager.total = this.SystemDev.quarter.pager.pageSize;
      }

      // Api.getSystemDevData({
      //   page: this.SystemDev.month.pager.pageNo,
      //   pageSize: this.SystemDev.month.pager.pageSize,
      //   byMonth: true
      // })
      //   .then(res => {
      //     this.SystemDev.month.data.chartData = res.custom.data;
      //     this.SystemDev.month.pager.total = res.custom.totalCount;
      //     this.SystemDev.month.loading = false;
      //     this.SystemDev.month.pager.pageNo++;
      //     if(this.SystemDev.month.pager.pageNo > res.custom.pageCount){
      //       this.SystemDev.month.pager.pageNo = 1;
      //     }
      //   })
      //   .catch(err => (this.SystemDev.month.loading = false));
      // 季度
      // Api.getSystemDevData({
      //   page: this.SystemDev.quarter.pager.pageNo,
      //   pageSize: this.SystemDev.quarter.pager.pageSize,
      //   byMonth: false
      // })
      //   .then(res => {
      //     this.SystemDev.quarter.data.chartData = res.custom.data;
      //     this.SystemDev.quarter.pager.total = res.custom.totalCount;
      //     this.SystemDev.quarter.loading = false;
      //     this.SystemDev.quarter.pager.pageNo++;
      //     if(this.SystemDev.quarter.pager.pageNo > res.custom.pageCount){
      //       this.SystemDev.quarter.pager.pageNo = 1;
      //     }
      //   })
      //   .catch(err => (this.SystemDev.quarter.loading = false));

      setTimeout(() => {
        this.SystemDev.month.loading = false;
        this.SystemDev.quarter.loading = false;
      }, 500);
      /* 测试数据-end */
    },
    // 设置定时器
    setTimer() {
      // 请求
      this.requestTimer = setInterval(() => {
        this.getStatisticsData();
      }, 60 * 1000);

      // 服务器使用情况TAB切换
      let serverUseTabIndex = 0;
      this.tabTimer = setInterval(() => {
        serverUseTabIndex++;
        if (serverUseTabIndex >= this.serverUse.tabs.length) {
          serverUseTabIndex = 0;
        }
        this.serverUse.activeTab = this.serverUse.tabs[serverUseTabIndex];
      }, 5 * 1000);

      // 应用使用情况分页
      this.SystemDevTimer = setInterval(() => {
        this.getSystemDevData();
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
}

.system-situation-layout {
  justify-content: space-between;

  &-left {
    margin-right: 10rem * $baseUnit;

    &__top {
      // height: 400rem * $baseUnit;
      width: 815rem * $baseUnit;
      flex-wrap: wrap;
    }
  }

  &-right {
    width: 100%;
    padding-bottom: 5rem * $baseUnit;
  }
}

.pie-chart-container {
  margin-right: 15rem * $baseUnit;
  margin-bottom: 12rem * $baseUnit;
  color: #99dced;

  @include background-setting(
    "../../../../assets/screen_images/img_02.png",
    400rem * $baseUnit,
    322rem * $baseUnit
  );

  .statistics-frame-content {
    padding-left: 20rem * $baseUnit;
    padding-right: 20rem * $baseUnit;
    // padding-top: 25rem * $baseUnit;
  }

  .chart-content {
    margin-left: -105rem * $baseUnit;
  }

  &:nth-child(2n) {
    margin-right: 0;
  }
}

.server-use-container {
  @include background-setting(
    "../../../../assets/screen_images/img_04.png",
    100%,
    340rem * $baseUnit
  );

  .statistics-tab {
    top: 25rem * $baseUnit;
  }

  .statistics-frame-content {
    padding-top: 60rem * $baseUnit;
  }
}

.system-use {
  &-container {
    position: relative;

    @include background-setting(
      "../../../../assets/screen_images/img_03.png",
      100%,
      100%
    );

    .statistics-frame-title {
      top: 25rem * $baseUnit;
      left: 25rem * $baseUnit;
    }

    .statistics-frame-content {
      padding: 60rem * $baseUnit 25rem * $baseUnit 15rem * $baseUnit 25rem *
        $baseUnit;
    }
  }

  &-quarter,
  &-month {
    height: 455rem * $baseUnit;

    &__title {
      @include background-setting(
        "../../../../assets/screen_images/img_shiyong_2.png",
        100%,
        50rem * $baseUnit
      );
      line-height: 50rem * $baseUnit;
      padding: 0 15rem * $baseUnit;
      justify-content: space-between;

      .name {
        color: #45fbf7;
      }

      .yellow {
        color: $color-yellow;
        font-style: normal;
        margin-right: 5rem * $baseUnit;
        font-weight: bold;
      }
    }

    &__content {
      height: 340rem * $baseUnit;
      margin-top: 15rem * $baseUnit;
    }
  }

  &-month {
    margin-top: 15rem * $baseUnit;
  }
}

.statistics {
  &-tab {
    position: absolute;
    top: 32rem * $baseUnit;
    right: 20rem * $baseUnit;
    &-item {
      padding: 10rem * $baseUnit;
      // background: #092e60;
      @include background-setting(
        "../../../../assets/screen_images/img_shiyong.png",
        100%,
        100%
      );
      margin: 0 4rem * $baseUnit;
      color: #99dced;
      &.is-active {
        color: $color-yellow;
        font-weight: bold;
        background-color: #154688;
        // border-
      }
    }
  }
}
</style>
