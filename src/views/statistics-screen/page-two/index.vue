<template>
  <!-- eslint-disable -->
  <div ref="statisticsScreen" class="statistics-screen scroll-style">
    <div
      ref="screenContainer"
      class="statistics-screen-container"
      :style="{ height: pageH, width: pageW }"
    >
      <screen-header title="监控大屏(建议全屏观看)" />
      <div class="statistics-screen-content flex">
        <!-- 第一屏 -->
        <div id="statisticsScreen1" class="split-screen">
          <split-screen-one
            :loading-background="loadingBackground"
            :contrast-radio="contrastRadio"
            :popup-msg="popupMsg"
            :message="message"
            @msg-popup="reduceTempMsgs"
          />
        </div>
        <!-- 第二屏 -->
        <div id="statisticsScreen2" class="split-screen">
          <split-screen-two
            :loading-background="loadingBackground"
            :contrast-radio="contrastRadio"
          />
        </div>
        <!-- 第三屏 -->
        <div id="statisticsScreen3" class="split-screen">
          <split-screen-three
            :loading-background="loadingBackground"
            :contrast-radio="contrastRadio"
            :popup-msg="popupMsg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import SplitScreenOne from "./screen-1";
import SplitScreenTwo from "./screen-2";
import SplitScreenThree from "./screen-3";
import ScreenHeader from "components/statistics-screen/Header";

import areaJson from "mock/guangxi-area.json";

import { timeTrans } from "utils";

import Response from "mixins/response";

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
  name: "StatisticsScreenPageTwo",
  components: {
    SplitScreenOne,
    SplitScreenTwo,
    SplitScreenThree,
    ScreenHeader
  },
  mixins: [Response],
  data() {
    return {
      // 加载背景
      loadingBackground: "rgba(0, 0, 0, 0.3)",
      // 设计稿高宽
      design: {
        width: 3500,
        height: 1080
      },
      // 消息通知
      message: {
        loading: false,
        list: []
      },
      // 地图弹窗消息
      popupMsg: {},
      // 存储消息队列
      tempMsgs: [],
      // 定时器
      popupMsgTimer: null,
      msgTimer: null,
      // signalR连接
      connection: null,
      // 计数消息
      countTag: 0
    };
  },
  mounted() {
    this.$_resizeHandler();
    this.$_initResizeEvent();
  },
  created() {
    this.init();
  },
  beforeDestroy() {
    this.clearTimer([this.popupMsgTimer, this.msgTimer]);
  },
  methods: {
    /**
     * 初始化大屏字体，用于配置响应式
     */
    $_resizeHandler() {
      this.widthHeightRatio = this.design.width / this.design.height;

      let docW = document.body.clientWidth;
      let docH = document.body.clientHeight;

      // 制定html根字体大小
      this.contrastRadio = docH / this.design.height; // 因为是长屏幕，已超出电脑尺寸，So 以高度为基准制定

      this.pageH = "100%";
      this.pageW = docH * this.widthHeightRatio + "px";

      document.getElementsByTagName("html")[0].style.fontSize =
        this.contrastRadio * 100 + "px";

      // 滚动到屏幕中间
      setTimeout(() => {
        this.$refs.statisticsScreen.scrollLeft =
          (this.$refs.screenContainer.offsetWidth -
            this.$refs.statisticsScreen.offsetWidth) /
          2;
      }, 100);
    },
    // 初始化
    init() {
      this.getDefaultMsgData();
      this.setTimer();
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
        console.log(res);
        this.tempMsgs.push(res); // 从结尾添加
      }
    },
    // 减少队列消息
    reduceTempMsgs(msg) {
      console.log(this.tempMsgs, this.msg);
      if (this.tempMsgs.length > 0) {
        this.tempMsgs.shift(); // 从开头删除
      }
    },
    // 设置定时器
    setTimer() {
      this.popupMsgTimer = setInterval(() => {
        // 30秒后若无操作则清除所有消息
        if (this.countTag > 10) {
          this.popupMsg = {};
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
          this.popupMsg = data;
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
<style lang="scss">
@import "../../../styles/statistics-screen.scss";
.statistics-screen {
  color: $color-light-blue;
  background: #000a25;
  height: 100vh;
  overflow-y: hidden;
  overflow-x: auto;

  &-container {
    width: 100%;
    @include background-setting(
      "../../../assets/screen_images/img_bg.png",
      100%,
      100%
    );
  }

  &-content {
    min-height: 100vh;
    // padding-top: 50rem * $baseUnit;
    justify-content: space-between;
    padding: 55rem * $baseUnit 15rem * $baseUnit 20rem * $baseUnit 15rem *
      $baseUnit;

    // .split-screen{
    //   width: 33.33%;
    // }
    #statisticsScreen1 {
      width: 30%;
    }

    #statisticsScreen2 {
      width: 30%;
    }

    #statisticsScreen3 {
      width: 40%;
    }
  }
}

// 滚动条样式
.scroll-style {
  /*整体样式*/
  &::-webkit-scrollbar {
    // display: none;
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px;
    background: rgba(0, 0, 0, 1);
  }
  /*滚动条滑块*/
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    -webkit-box-shadow: none;
    background: #7acaff;
  }
  /*滚动条轨道*/
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: none;
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
  /*滚动条边角，即两个滚动条的交汇处*/
  &::-webkit-scrollbar-corner {
    background: none;
  }
}

// 统计框架样式
.statistics-frame {
  position: relative;
  // background: #000a22;
  // border: $border-blue;

  &-title {
    font-size: 18rem * $baseUnit;
    // font-weight: bold;
    color: #fff;
    position: absolute;
    top: 20rem * $baseUnit;
    left: 15rem * $baseUnit;
  }

  &-content {
    position: relative;
    padding-top: 50rem * $baseUnit;
    height: 100%;
  }
}
</style>
