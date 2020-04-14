<template>
  <!-- eslint-disable -->
  <div class="statistics-screen-1">
    <!-- 受理情况 -->
    <div class="accpet-container flex">
      <div class="map-container statistics-frame">
        <span class="statistics-frame-title">地市事项分布</span>
        <div
          class="statistics-frame-content"
          v-loading="map.loading"
          element-loading-background="loadingBackground"
        >
          <template v-if="!map.loading">
            <div v-if="map.geoCoordMap" class="chart-content">
              <popup-msg-map
                :geo-coord-map="map.geoCoordMap"
                :popup-msg="map.popupMsg"
                :width="`${950*contrastRadio}px`"
                :height="`${760*contrastRadio}px`"
                @msg-popup="reduceTempMsgs"
              />
            </div>
            <empty v-else :height="`${600*contrastRadio}px`" />
          </template>
          <empty v-else :height="`${600*contrastRadio}px`" />
        </div>
      </div>
      <div class="ranking-container statistics-frame">
        <span class="statistics-frame-title">各地市用户使用排行</span>
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
    <!-- 消息通知 -->
    <div class="service-conatiner flex">
      <div class="msg-container statistics-frame">
        <span class="statistics-frame-title">事项消息列表</span>
        <div
          class="statistics-frame-content"
          v-loading="message.loading"
          element-loading-background="loadingBackground"
        >
          <template v-if="!message.loading">
            <ul v-if="message.list.length" class="msg-list-container">
              <li
                ref="msgItem"
                v-for="(item, index) in message.list"
                :key="'msg' + index"
                class="msg-list-item flex"
              >
                <div class="msg-list-item-left flex">
                  <span class="msg-list-item__badge">{{ message.list.length - index }}</span>
                  <span class="msg-list-item__name">
                    <i class="city">{{ item.cityName }}</i>：
                    <i class="account">{{ item.operator }}</i>
                    <i>于</i>
                    <i class="time">{{ item.actionTimeStr }}</i>
                    <i>{{ item.matter }}</i>
                    <i class="system">{{ item.appName }}</i>                    
                  </span>
                </div>
              </li>
            </ul>
            <empty v-else :height="`${300*contrastRadio}px`" />
          </template>
          <empty v-else :height="`${290*contrastRadio}px`" />
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
  </div>
</template>

<script>
/* eslint-disable */
import Empty from "components/common/Empty";
import PieChart from "components/statistics-screen/Charts/PieChart";
import PopupMsgMap from "components/statistics-screen/Charts/PopupMsgMap";
import RankingBarChart from "components/statistics-screen/Charts/RankingBarChart";
import areaJson from "mock/guangxi-area.json";
import { logInfo, timeTrans } from "utils";

const appNames = [
  "XLONG家里蹲-OA办公系统",
  "XLONG家里蹲-企业信息化系统",
  "XLONG家里蹲-CMS系统",
  "XLONG家里蹲-电商App",
  "XLONG家里蹲-数据抓取软件",
  "XLONG家里蹲-你画我猜软件"
];
const accounts = [
  "Lio.Huang",
  "xLong1029",
  "JunjiApp",
  "XieNangMai",
  "quanquan",
  "PDD",
  "Plus",
  "Jhone"
];

export default {
  name: "SplitScreenOne",
  components: {
    PieChart,
    RankingBarChart,
    PopupMsgMap,
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
      // 图表loading
      chartLoading: false,
      // 地图数据
      map: {
        loading: false,
        popupMsg: {},
        geoCoordMap: {}
      },
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
      // 消息通知
      message: {
        loading: false,
        list: []
      },
      // 存储消息队列
      tempMsgs: [],
      // 定时器
      msgTimer: null,
      // signalR连接
      // connection: null,
      // 计数消息
      countTag: 0,
      // 业务类型数据
      businessType: {
        loading: false,
        title: "业务类型",
        chartData: []
      }
    };
  },
  created() {
    this.init();
  },
  beforeDestroy() {
    this.clearTimer([this.rankingTimer, this.msgTimer]);
  },
  methods: {
    // 初始化
    init() {
      this.map.loading = true;
      this.ranking.loading = true;
      this.message.loading = true;
      this.businessType.loading = true;

      this.getMapData();
      this.getRankingData();
      this.getDefaultMsgData();
      this.getStatisticsData();

      this.setTimer();
    },
    // 获取地图数据
    getMapData() {
      /* 测试数据-start */
      for (let i = 0; i < areaJson.length; i++) {
        this.map.geoCoordMap[areaJson[i].name] = areaJson[i].coordinate;
      }
      setTimeout(() => (this.map.loading = false), 500);
      /* 测试数据-end */
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
    // 默认独取三条数据
    getDefaultMsgData() {
      /* 测试数据-start */
      for (let i = 0; i < 3; i++) {
        const city =
          areaJson[Math.round(Math.random() * (areaJson.length - 1))];
        this.message.list.push({
          operator: accounts[Math.round(Math.random() * (accounts.length - 1))],
          cityCode: city.code,
          cityName: city.name,
          latitude: city.coordinate[1],
          longitude: city.coordinate[0],
          matter: "使用",
          appName: appNames[Math.round(Math.random() * (appNames.length - 1))],
          actionTimeStr: "2020-04-14 08:00:00"
        });
      }
      setTimeout(() => (this.message.loading = false), 500);
      /* 测试数据-end */
    },
    // 获取消息
    receiveMessage() {
      /* 测试数据-start */
      const city = areaJson[Math.round(Math.random() * (areaJson.length - 1))];
      const res = {
        operator: accounts[Math.round(Math.random() * (accounts.length - 1))],
        cityCode: city.code,
        cityName: city.name,
        latitude: city.coordinate[1],
        longitude: city.coordinate[0],
        appName: appNames[Math.round(Math.random() * (appNames.length - 1))],
        operationType: 2,
        matter: "使用",
        actionTimeStr: timeTrans(new Date(), "YYYY-MM-DD HH:mm:ss", "-", ":")
      };
      /* 测试数据-end */
      this.countTag = 1;
      // 将消息存储至队列，用到地图上显示
      if (this.tempMsgs.length <= 10) {
        this.tempMsgs.push(res); // 从结尾添加
      }
    },
    // 减少队列消息
    reduceTempMsgs(msg) {
      if (this.tempMsgs.length > 0) {
        this.tempMsgs.shift(); // 从开头删除
      }
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
      this.rankingTimer = setInterval(() => {
        // 30秒后若无操作则清除所有消息
        if (this.countTag > 10) {
          this.map.popupMsg = {};
          this.countTag = 1;
        } else {
          this.countTag++;
        }

        if (this.tempMsgs.length > 0) {
          this.countTag = 1;
          let data = this.tempMsgs[0];
          // 消息动画效果
          const firstItem = $(".msg-list-item").eq(0);
          firstItem.css({ width: 0 });
          firstItem.animate({ width: "100%" }, 1000);
          this.message.list.unshift(data);
          // 地图显示消息弹窗
          this.map.popupMsg = data;

          const index = this.ranking.defaultChartData.findIndex(
            e => e.name === data.cityName
          );
          // 随机增加一个值
          this.ranking.defaultChartData[index].count++;
          this.ranking.data.chartData = [...this.ranking.defaultChartData];
        }
      }, 3 * 1000);

      // 模拟signalR每秒获取数据
      this.msgTimer = setInterval(() => {
        this.receiveMessage();
      }, 1 * 1000);
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
.statistics-screen-1 {
  padding-right: 15rem * $baseUnit;
}

.accpet-container,
.service-conatiner {
  justify-content: space-between;
}

.map-container {
  margin-bottom: 15rem * $baseUnit;
  margin-right: 10rem * $baseUnit;
  @include background-setting(
    "../../../../assets/screen_images/img_01.png",
    67%,
    655rem * $baseUnit
  );

  .chart-content {
    margin-top: -90rem * $baseUnit;
    margin-left: -35rem * $baseUnit;
  }
}

.ranking-container {
  margin-bottom: 15rem * $baseUnit;
  @include background-setting(
    "../../../../assets/screen_images/img_03.png",
    33%,
    655rem * $baseUnit
  );

  .statistics-frame-title {
    left: 25rem * $baseUnit;
  }
}

.msg-container {
  height: 350rem * $baseUnit;
  @include background-setting(
    "../../../../assets/screen_images/imgs_bg_Tl.png",
    67%,
    340rem * $baseUnit
  );
  font-size: 14rem * $baseUnit;

  .statistics-frame-content {
    padding: 55rem * $baseUnit 20rem * $baseUnit 20rem * $baseUnit;
  }

  .msg-list {
    &-container {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    &-item {
      width: 100%;
      height: 38rem * $baseUnit;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 8rem * $baseUnit;
      margin-bottom: 8rem * $baseUnit;
      color: #fff;
      border-bottom: 1px dashed #315f9a;

      &:nth-child(1) {
        .msg-list-item__badge {
          background: #f73545;
        }
      }
      &:nth-child(2) {
        .msg-list-item__badge {
          background: #f57327;
        }
      }
      &:nth-child(3) {
        .msg-list-item__badge {
          background: #15a75c;
        }
      }

      &-left {
        align-items: center;
      }

      &__badge {
        background: #21b1de;
        min-width: 20rem * $baseUnit;
        text-align: center;
        height: 20rem * $baseUnit;
        line-height: 22rem * $baseUnit;
        padding: 0 5rem * $baseUnit;
        border-radius: 20rem * $baseUnit;
        margin-right: 10rem * $baseUnit;
        color: #fff;
        font-size: 10rem * $baseUnit;
      }

      &__name {
        align-items: center;
        width: 100%;
        // width: 630rem * $baseUnit;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        > i {
          font-style: normal;
        }

        .account,
        .system {
          color: #f3f43d;
        }

        .city,
        .time {
          color: #61e1ff;
        }
      }
    }
  }
}

.business-type-container {
  margin-left: 15rem * $baseUnit;
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
