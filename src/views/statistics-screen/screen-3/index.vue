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
        <!-- 应用类型 -->
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
          v-loading="systemUse.month.loading || systemUse.quarter.loading"
          element-loading-background="loadingBackground"
        >
          <!-- 季度统计 -->
          <div class="system-use-quarter">
            <div class="system-use-quarter__title flex">
              <span class="name">季度统计</span>
              <span><i class="yellow">{{ systemUse.quarter.pager.total }}</i>个系统</span>
            </div>
            <div class="system-use-quarter__content">
              <template v-if="!systemUse.quarter.loading">
                  <gradual-bar-chart
                    v-if="systemUse.quarter.data.chartData.length"
                    class-name="quarterChart"
                    :chart-data="systemUse.quarter.data.chartData"
                    :axis="systemUse.quarter.data.axis"
                    :series="systemUse.quarter.data.series"
                    :sort="true"
                    :height="`${78 * contrastRadio * systemUse.quarter.data.chartData.length}px`"
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
              <span><i class="yellow">{{ systemUse.month.pager.total }}</i>个系统</span>
            </div>
            <div class="system-use-month__content">
              <template v-if="!systemUse.month.loading">
                  <gradual-bar-chart
                    v-if="systemUse.month.data.chartData.length"
                    class-name="monthChart"
                    :chart-data="systemUse.month.data.chartData"
                    :axis="systemUse.month.data.axis"
                    :series="systemUse.month.data.series"
                    :sort="true"
                    :height="`${78 * contrastRadio * systemUse.month.data.chartData.length}px`"
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
/* eslint-disable */
import StatisticsProgress from "components/statistics-screen/StatisticsProgress";
import PieChart from "components/statistics-screen/Charts/PieChart";
import PoleChart from "components/statistics-screen/Charts/PoleChart";
import GradualBarChart from "components/statistics-screen/Charts/GradualBarChart";
import Empty from "components/common/Empty";

// import Api from "api/statistics-screen";

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
      // 应用类型数据
      serviceType: {
        loading: false,
        title: "应用类型",
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
      systemUse: {
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
            chartData: [],
          },
          pager: {
            pageNo:1,
            pageSize: 6,
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
            pageNo:1,
            pageSize: 6,
            total: 0
          }
        }
      },
      // 定时器
      requestTimer: null,
      tabTimer: null,
      systemUseTimer: null
    };
  },
  created() {
    this.init();
  },
  beforeDestroy() {
    this.clearTimer([this.requestTimer, this.tabTimer, this.systemUseTimer]);
  },
  methods: {
    // 初始化
    init() {
      this.runtime.loading = true;
      this.databaseType.loading = true;
      this.businessType.loading = true;
      this.serviceType.loading = true;
      this.serverUse.loading = true;
      this.systemUse.month.loading = true;
      this.systemUse.quarter.loading = true;

      // this.getStatisticsData();
      // this.getSystemUseData();
      this.setTimer();
    },
    // 获取统计数据
    getStatisticsData() {
      // 运行环境
      Api.getRuntimeData()
        .then(res => {
          this.runtime.chartData = res.custom.data.map(e => ({
            name: e.key,
            value: e.value
          }));
          this.runtime.isSafePersent = res.custom.isSafePersent;
          this.runtime.loading = false;
        })
        .catch(err => (this.runtime.loading = false));

      // 服务器类型
      Api.getDatabaseTypeData()
        .then(res => {
          this.databaseType.chartData = res.custom.data.map(e => ({
            name: e.key,
            value: e.value
          }));
          this.databaseType.isSafePersent = res.custom.isSafePersent;
          this.databaseType.loading = false;
        })
        .catch(err => (this.databaseType.loading = false));

      // 业务类型
      Api.getBusinessTypeData()
        .then(res => {
          this.businessType.chartData = res.custom.map(e => ({
            name: e.text,
            value: e.value
          }));
          this.businessType.isSafePersent = res.custom.isSafePersent;
          this.businessType.loading = false;
        })
        .catch(err => (this.businessType.loading = false));

      // 应用类型
      Api.getServiceTypeData()
        .then(res => {
          this.serviceType.chartData = res.custom.map(e => ({
            name: e.text,
            value: e.value
          }));
          this.serviceType.isSafePersent = res.custom.isSafePersent;
          this.serviceType.loading = false;
        })
        .catch(err => (this.serviceType.loading = false));

      // 服务器使用情况
      Api.getServerUseData()
        .then(res => {
          this.serverUse.data = res.custom;
          this.serverUse.loading = false;
        })
        .catch(err => (this.serverUse.loading = false));
    },
    // 定时获取应用使用情况
    getSystemUseData() {
      // 月度
      Api.getSystemUseData({
        page: this.systemUse.month.pager.pageNo,
        pageSize: this.systemUse.month.pager.pageSize,
        byMonth: true
      })
        .then(res => {
          this.systemUse.month.data.chartData = res.custom.data;
          this.systemUse.month.pager.total = res.custom.totalCount;
          this.systemUse.month.loading = false;

          this.systemUse.month.pager.pageNo++;
          if(this.systemUse.month.pager.pageNo > res.custom.pageCount){
            this.systemUse.month.pager.pageNo = 1;
          }
        })
        .catch(err => (this.systemUse.month.loading = false));

      // 季度
      Api.getSystemUseData({
        page: this.systemUse.quarter.pager.pageNo,
        pageSize: this.systemUse.quarter.pager.pageSize,
        byMonth: false
      })
        .then(res => {
          this.systemUse.quarter.data.chartData = res.custom.data;
          this.systemUse.quarter.pager.total = res.custom.totalCount;
          this.systemUse.quarter.loading = false;

          this.systemUse.quarter.pager.pageNo++;
          if(this.systemUse.quarter.pager.pageNo > res.custom.pageCount){
            this.systemUse.quarter.pager.pageNo = 1;
          }
        })
        .catch(err => (this.systemUse.quarter.loading = false));
    },
    // 设置定时器
    setTimer(){
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
      this.systemUseTimer = setInterval(() => {
        this.getSystemUseData();
      }, 5 * 1000);
    },
    // 清除定时器
    clearTimer(timers){
      timers.forEach(e => clearInterval(e));
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/statistics-screen.scss";

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
    "../../../assets/screen_images/img_02.png",
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
    "../../../assets/screen_images/img_04.png",
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

.system-use{
  &-container {
    position: relative;

    @include background-setting("../../../assets/screen_images/img_03.png", 100%, 100%);

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
  &-month{
    height: 455rem * $baseUnit;

    &__title{
      @include background-setting(
        "../../../assets/screen_images/img_shiyong_2.png",
        100%,
        50rem *$baseUnit
      );
      line-height: 50rem *$baseUnit;
      padding: 0 15rem *$baseUnit;
      justify-content:space-between;

      .name{
        color: #45fbf7;
      }

      .yellow{
        color: $color-yellow;
        font-style: normal;
        margin-right: 5rem *$baseUnit;
        font-weight: bold;
      }
    }

    &__content{
      height: 340rem *$baseUnit;
      margin-top: 15rem *$baseUnit;
    }
  }

  &-month{
    margin-top: 15rem *$baseUnit;
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
        "../../../assets/screen_images/img_shiyong.png",
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
