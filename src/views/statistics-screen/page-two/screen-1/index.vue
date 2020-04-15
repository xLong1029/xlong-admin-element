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
              <statistics-msg-map
                :geo-coord-map="map.geoCoordMap"
                :chart-data="map.chartData"
                :popup-msg="popupMsg"
                :width="`${1000*contrastRadio}px`"
                :height="`${800*contrastRadio}px`"
                @msg-popup="reduceTempMsgs"
              />
            </div>
            <empty v-else :height="`${600*contrastRadio}px`" />
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
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Empty from "components/common/Empty";
import StatisticsMsgMap from "components/statistics-screen/Charts/StatisticsMsgMap";

import areaJson from "mock/guangxi-area.json";

export default {
  name: "SplitScreenOne",
  components: {    
    StatisticsMsgMap,
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
    // 事项消息
    message: {
      type: Object,
      default: () => ({
        loading: false,
        list: []
      })
    },
    // 地图弹窗消息
    popupMsg: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    popupMsg(data) {
      let arr = [...this.map.chartData];
      arr.forEach(e => {
        if (e.name == data.cityName) {
          e.value++;
        }
      });
      this.map.chartData = arr;
    },
  },
  data() {
    return {
      // 地图数据
      map: {
        loading: false,
        popupMsg: {},
        geoCoordMap: {},
        chartData: []
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.map.loading = true;

      this.getMapData();
    },
    // 获取地图数据
    getMapData() {
      /* 测试数据-start */
      for (let i = 0; i < areaJson.length; i++) {
        this.map.geoCoordMap[areaJson[i].name] = areaJson[i].coordinate;
        this.map.chartData.push({
          name: areaJson[i].name,
          value: Math.round(Math.random() * 300) + 10
        });
      }
      setTimeout(() => (this.map.loading = false), 500);
      /* 测试数据-end */
    },
    // 减少队列消息
    reduceTempMsgs(msg) {
      this.$emit("msg-popup");
    },
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../styles/statistics-screen.scss";
.statistics-screen-1 {
}

.accpet-container,
.service-conatiner {
  justify-content: space-between;
}

.map-container {
  margin-bottom: 15rem * $baseUnit;
  @include background-setting(
    "../../../../assets/screen_images/img_01.png",
    100%,
    655rem * $baseUnit
  );

  .chart-content {
    margin-top: -110rem * $baseUnit;
  }
}

.msg-container {
  height: 350rem * $baseUnit;
  @include background-setting(
    "../../../../assets/screen_images/imgs_bg_Tl.png",
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

</style>
