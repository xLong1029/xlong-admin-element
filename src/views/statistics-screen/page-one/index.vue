<template>
  <!-- eslint-disable -->
  <div ref="statisticsScreen" class="statistics-screen scroll-style">
    <div ref="screenContainer" class="statistics-screen-container" :style="{ height: pageH, width: pageW }">
      <screen-header title="监控大屏(建议全屏观看)" />
      <div class="statistics-screen-content flex">
        <!-- 第一屏 -->
        <div id="statisticsScreen1" class="split-screen">
          <split-screen-one :loading-background="loadingBackground" :contrast-radio="contrastRadio" />
        </div>
        <!-- 第二屏 -->
        <div id="statisticsScreen2" class="split-screen">
          <split-screen-two :loading-background="loadingBackground" :contrast-radio="contrastRadio" />
        </div>
        <!-- 第三屏 -->
        <div id="statisticsScreen3" class="split-screen">
          <split-screen-three :loading-background="loadingBackground" :contrast-radio="contrastRadio" />
        </div>
      </div>
    </div>   
  </div>
</template>

<script>

import SplitScreenOne from './screen-1';
import SplitScreenTwo from './screen-2';
import SplitScreenThree from './screen-3';
import ScreenHeader from "components/statistics-screen/Header";

import Response from "mixins/response";

export default {
  name: "StatisticsScreenPageOne",
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
      }
    };
  },
  mounted() {
    this.$_resizeHandler();
    this.$_initResizeEvent();
  },
  methods: {
    /**
     * 初始化大屏字体，用于配置响应式
     */
    $_resizeHandler() {
      this.widthHeightRatio = this.design.width / this.design.height

      let docW = document.body.clientWidth
      let docH = document.body.clientHeight

      // 制定html根字体大小
      this.contrastRadio = docH / this.design.height // 因为是长屏幕，已超出电脑尺寸，So 以高度为基准制定

      this.pageH = '100%'
      this.pageW = docH * this.widthHeightRatio + 'px'

      document.getElementsByTagName('html')[0].style.fontSize = this.contrastRadio * 100 + 'px'

      // 滚动到屏幕中间
      setTimeout(() => {
        this.$refs.statisticsScreen.scrollLeft = (this.$refs.screenContainer.offsetWidth - this.$refs.statisticsScreen.offsetWidth) / 2;
      },100);
    },
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
    padding: 55rem * $baseUnit 15rem * $baseUnit 20rem * $baseUnit 15rem * $baseUnit;

    // .split-screen{
    //   width: 33.33%;
    // }
    #statisticsScreen1{
      width: 37%;
    }

    #statisticsScreen2{
      width: 25%;
    }

    #statisticsScreen3{
      width: 38%;
    }
  }
}

// 滚动条样式
.scroll-style{
  /*整体样式*/
  &::-webkit-scrollbar {
    // display: none;
    width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
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
    background: rgba(0,0,0,0.1);
  }
  /*滚动条边角，即两个滚动条的交汇处*/
  &::-webkit-scrollbar-corner{
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
