<template>
  <!-- eslint-disable -->
  <div id="bgStars" class="statistics-screen-2">
    <!-- 大楼 -->
    <div class="building-container">
      <div class="income-container">
        <div class="income-title">2020年总收益</div>
        <div class="income-content">123456,89<span class="unit">元</span></div>
      </div>
      <!-- 数量统计 -->
      <div class="count-container flex">
        <!-- 开发应用数量 -->
        <div class="count-card-wrapper systems">
          <div class="count-card-container">
            <div class="count-card-content">{{ systemsCount.count }}</div>
            <div class="count-card-title">{{ systemsCount.name }}</div>
          </div>
        </div>
        <!-- 服务企业数量 -->
        <div class="count-card-wrapper company">
          <div class="count-card-container">
            <div class="count-card-content">{{ companyCount.count }}</div>
            <div class="count-card-title">{{ companyCount.name }}</div>
          </div>
        </div>
        <!-- 服务用户数量 -->
        <div class="count-card-wrapper user">
          <div class="count-card-container">
            <div class="count-card-content">{{ userCount.count }}</div>
            <div class="count-card-title">{{ userCount.name }}</div>
          </div>
        </div>
        <!-- 监控服务器数量 -->
        <div class="count-card-wrapper server">
          <div class="count-card-container">
            <div class="count-card-content">{{ serverCount.count }}</div>
            <div class="count-card-title">{{ serverCount.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 企业数量统计 -->
    <div class="company-container statistics-frame">
      <span class="statistics-frame-title">各地市数据统计</span>
      <div
        class="statistics-frame-content"
        v-loading="areaStatistics.loading"
        element-loading-background="loadingBackground"
      >
        <template v-if="!areaStatistics.loading">
          <div class="chart-content">
            <region-multiple-chart
              v-if="areaStatistics.chartData.length"
              class-name="monthChart"
              :chart-data="areaStatistics.chartData"
              :axis="areaStatistics.axis"
              :series="areaStatistics.series"
              :sort="true"
              width="100%"
              :height="`${300*contrastRadio}px`"
            />
            <empty v-else :height="`${280*contrastRadio}px`" />
          </div>
        </template>
        <empty v-else :height="`${280*contrastRadio}px`" />
      </div>
    </div>
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
  </div>
</template>

<script>
/* eslint-disable */
import RegionMultipleChart from "@/components/statistics-screen/Charts/RegionMultipleChart";
import areaJson from "mock/guangxi-area.json";

export default {
  name: "SplitScreenTwo",
  components: {
    RegionMultipleChart
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
      // 区域数据统计
      areaStatistics: {
        loading: false,
        series: [
          {
            name: "服务企业",
            property: "company",
            type: "bar"
          },
          {
            name: "服务用户",
            property: "user",
            type: "bar"
          },
          {
            name: "开发应用",
            property: "systems",
            type: "line"
          },
          {
            name: "监控服务器",
            property: "servicer",
            type: "line"
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
      this.areaStatistics.loading = true;

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

      this.areaStatistics.chartData = areaJson.map(e => {
        return {
          name: e.name,
          servicer: Math.round(Math.random() * 3) + 3,
          company: Math.round(Math.random() * 20) + 15,
          user: Math.round(Math.random() * 15) + 30,
          systems: Math.round(Math.random() * 20) + 20
        };
      });

      setTimeout(() => {
        this.areaStatistics.loading = false;
      }, 500);
      /* 测试数据-end */
    },
    // 设置定时器
    setTimer() {
      this.requestTimer = setInterval(() => {
        this.getStatisticsData();
      }, 30 * 1000);
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
  padding: 0 15rem * $baseUnit;
  overflow: hidden;
  background: url("../../../../assets/screen_images/img_background_2.jpg") center
    center no-repeat;
  background-size: 100%;
  background-position: 50% 12%;
}

.building-container {
  width: 100%;
  height: 655rem * $baseUnit;
  margin-bottom: 15rem * $baseUnit;
}

.income {
  &-container {
    width: 40%;
    font-weight: bold;
    text-align: center;
    margin: 0 auto;
    padding-top: 150rem * $baseUnit;
  }

  &-title {
    font-size: 24rem * $baseUnit;
    color: #fff;
  }

  &-content {
    font-size: 60rem * $baseUnit;
    color: #ec2c68;
    background-image: -webkit-linear-gradient(-180deg, #ec2c68, #ffa42e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    .unit{
      font-size:24rem * $baseUnit;
    }
  }
  
}

.count {
  &-container {
    width: 90%;
    margin: 0 auto;
    padding-top: 40rem * $baseUnit;
  }

  &-card {
    &-wrapper {
      width: 100%;
      position: relative;
      height: 80rem * $baseUnit;
      padding-left: 80rem * $baseUnit;

      &.systems {
        background: url("../../../../assets/screen_images/icon-systems.png")
          no-repeat;
      }

      &.company {
        background: url("../../../../assets/screen_images/icon-company.png")
          no-repeat;
      }

      &.server {
        background: url("../../../../assets/screen_images/icon-server.png")
          no-repeat;
      }

      &.user {
        background: url("../../../../assets/screen_images/icon-user.png")
          no-repeat;
      }
    }
    &-container {
      position: absolute;
      top: 0;
    }

    &-title {
      color: #fff;
      font-size: 14rem * $baseUnit;
    }
    &-content {
      color: #ec2c68;
      font-size: 26rem * $baseUnit;
      font-weight: bold;
      padding: 10rem * $baseUnit 0;
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

  .statistics-frame-content {
    padding-top: 20rem * $baseUnit;
  }
}
</style>
