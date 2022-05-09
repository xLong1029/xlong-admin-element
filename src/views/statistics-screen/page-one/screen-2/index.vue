<template>
  <!-- eslint-disable -->
  <div id="bgStars" class="statistics-screen-2">
    <!-- 大楼 -->
    <div class="building-container">
      <!-- 数量统计 -->
      <div class="count-container">
        <!-- 开发应用数量 -->
        <div class="systems">
          <div class="count-card-wrapper left">
            <div class="count-card-container">
              <div class="count-card-content" :style="{ color: '#ff3333' }">{{ systemsCount.count }}</div>
              <div class="count-card-title">{{ systemsCount.name }}</div>
            </div>
          </div>
        </div>
        <!-- 服务企业数量 -->
        <div class="company">
          <div class="count-card-wrapper left">
            <div class="count-card-container">
              <div class="count-card-content" :style="{ color: '#2cf768' }">{{ companyCount.count }}</div>
              <div class="count-card-title">{{ companyCount.name }}</div>
            </div>
          </div>
        </div>
        <!-- 监控服务器数量 -->
        <div class="server">
          <div class="count-card-wrapper right">
            <div class="count-card-container">
              <div class="count-card-content" :style="{ color: '#fed539' }">{{ serverCount.count }}</div>
              <div class="count-card-title">{{ serverCount.name }}</div>
            </div>
          </div>
        </div>
        <!-- 服务用户数量 -->
        <div class="user">
          <div class="count-card-wrapper right">
            <div class="count-card-container">
              <div class="count-card-content" :style="{ color: '#00fee9' }">{{ userCount.count }}</div>
              <div class="count-card-title">{{ userCount.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 企业数量统计 -->
    <div class="company-container statistics-frame">
      <span class="statistics-frame-title">服务企业数量</span>
      <div
        class="statistics-frame-content"
        v-loading="companyNum.loading"
        element-loading-background="loadingBackground"
      >
        <template v-if="!companyNum.loading">
          <div class="chart-content">
            <thermometer-bar-chart
              v-if="companyNum.chartData.length"
              class-name="monthChart"
              :chart-data="companyNum.chartData"
              :axis="companyNum.axis"
              :series="companyNum.series"
              :sort="true"
              :height="`${270*contrastRadio}px`"
            />
            <empty v-else :height="`${250*contrastRadio}px`" />
          </div>
        </template>
        <empty v-else :height="`${250*contrastRadio}px`" />
      </div>
    </div>
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
  </div>
</template>

<script>

import ThermometerBarChart from "components/statistics-screen/Charts/ThermometerBarChart";
import areaJson from "assets/json/guangxi-area.json";

export default {
  name: "SplitScreenTwo",
  components: {
    ThermometerBarChart
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
      // 开发应用总数统计
      systemsCount: {
        name: "开发应用总数",
        count: 55
      },
      // 企业总数统计
      companyCount: {
        name: "服务企业数量",
        count: 0
      },
      // 服务器总数统计
      serverCount: {
        name: "监控服务器数量",
        count: 0
      },
      // 服务用户总数统计
      userCount: {
        name: "服务用户数量",
        count: 0
      },
      // 企业数量柱状图
      companyNum: {
        loading: false,
        series: [
          {
            name: "企业数量",
            property: "count"
          }
        ],
        axis: {
          property: "name"
        },
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
      this.companyNum.loading = true;

      this.getStatisticsData();
      this.setTimer();
    },
    // 获取统计数据
    getStatisticsData() {
      /* 测试数据-start */
      this.systemsCount.count = 55;
      this.companyCount.count = 3004;
      this.serverCount.count = 9;
      this.userCount.count = 60293;

      this.companyNum.chartData = areaJson.map(e => {
        return {
          name: e.name,
          count: Math.round(Math.random() * 10)
        }
      });
      
      setTimeout(() => {
        this.companyNum.loading = false;
      }, 500);
      /* 测试数据-end */
    },
    // 设置定时器
    setTimer() {
      this.requestTimer = setInterval(() => {
        this.getStatisticsData();
      }, 10 * 1000);
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
@import "../../../../styles/start.scss";

.statistics-screen-2 {
  overflow: hidden;
  background: url("../../../../assets/screen_images/img_background_1.png") center center
    no-repeat;
  background-size: 60%;
  background-position: 50% 28%;
}

.building-container {
  width: 100%;
  height: 655rem * $baseUnit;
  margin-bottom: 15rem * $baseUnit;
}

.count {
  &-container {
    width: 100%;

    .systems,
    .company,
    .server,
    .user {
      position: absolute;
    }

    .systems {
      top: 350rem * $baseUnit;
      left: 50rem * $baseUnit;
    }

    .company {
      top: 110rem * $baseUnit;
      left: 100rem * $baseUnit;
    }

    .server {
      top: 280rem * $baseUnit;
      right: 30rem * $baseUnit;
    }

    .user {
      top: 50rem * $baseUnit;
      right: 110rem * $baseUnit;
    }
  }

  &-card {
    &-wrapper {
      position: relative;

      &.left {
        @include background-setting(
          "../../../../assets/screen_images/img_zongshu.png",
          232rem * $baseUnit,
          189rem * $baseUnit
        );

        .count-card-container {
          left: 15rem * $baseUnit;
        }
      }

      &.right {
        @include background-setting(
          "../../../../assets/screen_images/img_shuliang.png",
          232rem * $baseUnit,
          189rem * $baseUnit
        );
        .count-card-container {
          right: 15rem * $baseUnit;
        }
      }
    }
    &-container {
      position: absolute;
      width: 185rem * $baseUnit;
      height: 78rem * $baseUnit;
      text-align: center;
      top: 0;
    }

    &-title {
      color: #2fc2c3;
      padding: 5rem * $baseUnit;
      padding: 5rem * $baseUnit;
      font-size: 14rem * $baseUnit;
    }
    &-content {
      font-size: 24rem * $baseUnit;
      font-weight: bold;
      padding: 10rem * $baseUnit;
    }
  }
}

.company-container {
  z-index: 99;

  @include background-setting(
    "../../../../assets/screen_images/img_04.png",
    100%,
    340rem * $baseUnit
  );
}
</style>
