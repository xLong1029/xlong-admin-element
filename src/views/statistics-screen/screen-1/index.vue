<template>
  <!-- eslint-disable -->
  <div class="statistics-screen-1">
    <!-- 受理情况 -->
    <div class="accpet-container flex">
      <div class="map-container statistics-frame">
        <span class="statistics-frame-title">事项消息（地图）</span>
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
        <span class="statistics-frame-title">地市事项分布</span>
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
    <div class="msg-container statistics-frame">
      <span class="statistics-frame-title">事项消息（列表）</span>
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
                  <i class="operator">{{ item.operator }}</i>
                  <i class="through">用</i>
                  <i class="from-system">{{ item.fromSystem }}</i>
                  <i class="action">{{ item.action }}</i>
                  <i class="matter">{{ item.matter }}</i>
                </span>
              </div>
              <span class="msg-list-item-right msg-list-item__time">{{ item.actionTimeStr }}</span>
            </li>
          </ul>
          <empty v-else :height="`${300*contrastRadio}px`" />
        </template>
        <empty v-else :height="`${290*contrastRadio}px`" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Empty from "components/common/Empty";
import PopupMsgMap from "components/statistics-screen/Charts/PopupMsgMap";
import RankingBarChart from "components/statistics-screen/Charts/RankingBarChart";

// import Api from "api/statistics-screen";
// import SignalR from "mixins/signal-r";
import { logInfo } from "utils";

export default {
  name: "SplitScreenOne",
  components: {
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
        geoCoordMap: null
      },
      ranking: {
        loading: false,
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
      rankingTimer: null,
      msgTimer: null,
      // signalR连接
      connection: null,
      // 计数消息
      countTag: 0
    };
  },
  created() {
    this.init();
  },
  beforeDestroy() {
    this.clearTimer([this.rankingTimer, this.msgTimer]);
    this.stopConnection();
  },
  methods: {
    // 初始化
    init() {
      this.map.loading = true;
      this.ranking.loading = true;
      this.message.loading = true;

      this.getStatisticsData();
      this.getRankingData();
      // this.getMsgData();

      this.setTimer();
    },
    // 获取统计数据
    getStatisticsData() {
      // 地图地理坐标
      Api.getGeoCoordMap()
        .then(res => {
          this.map.geoCoordMap = res.custom;
          this.map.loading = false;
        })
        .catch(() => (this.map.loading = false));
    },
    // 获取受理排行数据
    getRankingData() {
      Api.getRanking()
        .then(res => {
          this.ranking.data.chartData = res.custom;
          this.ranking.loading = false;
        })
        .catch(() => (this.ranking.loading = false));
    },
    // 通过SignalR获取消息
    getMsgData() {
      Api.getMeassage({
        page: 1,
        pageSize: 3
      })
        .then(res => {
          this.message.list = res.custom.data;

          // 创建singleR连接
          this.createConnection(
            `${process.env.VUE_APP_SERVER_AUTH}/hub/SystemMsg`
          );
          // 判断是否断开重连
          this.connection.onclose(() => {
            if(this.$route.name === 'StatisticsScreen'){
              logInfo('SignalR-连接已关闭, 尝试重新连接');
              this.startConnection();
            }
            else{
              logInfo('已离开监控大屏，SignalR-连接已关闭');
            }           
          })
          this.receiveMessage();

          this.message.loading = false;
        })
        .catch(() => (this.message.loading = false));
    },
    receiveMessage() {
      // 从集线器调用客户端方法
      this.connection.on("ReceiveMatterMessage", res => {        
        logInfo("SignalR-已成功从服务端获取信息");
        // logInfo(res);
        this.countTag = 1;
        // 将消息存储至队列，用到地图上显示
        if (this.tempMsgs.length <= 10) {
          this.tempMsgs.push(res); // 从结尾添加
        }        
      });
    },
    // 减少队列消息
    reduceTempMsgs(msg){
      if(this.tempMsgs.length > 0) {
        this.tempMsgs.shift(); // 从开头删除
      }
    },
    // 设置定时器
    setTimer() {
      this.rankingTimer = setInterval(() => {
        this.getRankingData();
      }, 1 * 1000);

      this.msgTimer = setInterval(() => {
        // 30秒后若无操作则清除所有消息
        if(this.countTag > 10){
          this.map.popupMsg = {};
          this.countTag = 1;
        }
        else{
          this.countTag ++;
        }
        
        if(this.tempMsgs.length > 0) {
          this.countTag = 1;
          let data = this.tempMsgs[0];
          // 消息动画效果
          const firstItem = $(".msg-list-item").eq(0);
          firstItem.css({ width: 0 });
          firstItem.animate({ width: "100%" }, 1000);
          this.message.list.unshift(data);
          // 地图显示消息弹窗
          this.map.popupMsg = data;
        }
      }, 3* 1000)
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
.statistics-screen-1 {
  padding-right: 15rem * $baseUnit;
}

.accpet-container {
  justify-content: space-between;
}

.map-container {
  width: 100%;
  margin-bottom: 15rem * $baseUnit;
  margin-right: 10rem * $baseUnit;
  @include background-setting(
    "../../../assets/screen_images/img_01.png",
    70%,
    655rem * $baseUnit
  );

  .chart-content {
    margin-top: -90rem * $baseUnit;
    margin-left: -35rem * $baseUnit;
  }
}

.ranking-container {
  width: 100%;
  margin-bottom: 15rem * $baseUnit;
  @include background-setting(
    "../../../assets/screen_images/img_03.png",
    30%,
    655rem * $baseUnit
  );

  .statistics-frame-title {
    left: 25rem * $baseUnit;
  }
}

.msg-container {
  width: 100%;
  height: 350rem * $baseUnit;
  @include background-setting(
    "../../../assets/screen_images/imgs_bg_Tl.png",
    100%,
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
        width: 1000rem * $baseUnit;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        > i {
          font-style: normal;
        }

        .operator,
        .matter {
          color: #f3f43d;
        }

        .from-system {
          color: #61e1ff;
        }

        .through,
        .action {
          color: #fff;
        }
      }

      &__time {
        text-align: right;
        width: 170rem * $baseUnit;
        overflow: hidden;
        height: 20rem * $baseUnit;
        line-height: 21rem * $baseUnit;
        font-size: 12rem * $baseUnit;
        color: #61e1ff;
      }
    }
  }
}
</style>
