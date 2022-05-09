
<template>
  <div class="server-use-list">
    <template v-if="list.length">
      <div v-for="(item, index) in list" :key="'server-use' + index" class="server-use-list-item flex">
        <div class="server-use-list-item__title">IP：{{ item.hostIP }}</div>
        <template v-if="activeTab === 'CPU'">
          <server-statistics-card
            title="CPU占用"
            :content="(item.cpuUsedRatio*100).toFixed(2)"
            :content-color="(item.cpuUsedRatio*100).toFixed(2) > 80 ? fontRed: fontGreen"
            unit="%"
          />
          <server-statistics-card
            title="内存使用"
            :content="(item.ramUsedRatio*100).toFixed(2)"
            :content-color="(item.ramUsedRatio*100).toFixed(2)> 80 ? fontRed: fontGreen"
            unit="%"
          />
          <server-statistics-card
            title="磁盘使用"
            :content="(item.diskUsedRatio*100).toFixed(2)"
            :content-color="(item.diskUsedRatio*100).toFixed(2) > 80 ? fontRed: fontGreen"
            unit="%"
          />
        </template>
        <template v-if="activeTab === 'RAM'">
          <server-statistics-card
            title="内存使用"
            :content="(item.ramUsedRatio*100).toFixed(2)"
            :content-color="(item.ramUsedRatio*100).toFixed(2)> 80 ? fontRed: fontGreen"
            unit="%"
          />
          <server-statistics-card
            title="磁盘使用"
            :content="(item.diskUsedRatio*100).toFixed(2)"
            :content-color="(item.diskUsedRatio*100).toFixed(2) > 80 ? fontRed: fontGreen"
            unit="%"
          />
          <server-statistics-card
            title="CPU占用"
            :content="(item.cpuUsedRatio*100).toFixed(2)"
            :content-color="(item.cpuUsedRatio*100).toFixed(2) > 80 ? fontRed: fontGreen"
            unit="%"
          />
        </template>
        <template v-if="activeTab === 'DISK'">
          <server-statistics-card
            title="磁盘使用"
            :content="(item.diskUsedRatio*100).toFixed(2)"
            :content-color="(item.diskUsedRatio*100).toFixed(2) > 80 ? fontRed: fontGreen"
            unit="%"
          />
          <server-statistics-card
            title="CPU占用"
            :content="(item.cpuUsedRatio*100).toFixed(2)"
            :content-color="(item.cpuUsedRatio*100).toFixed(2) > 80 ? fontRed: fontGreen"
            unit="%"
          />
          <server-statistics-card
            title="内存使用"
            :content="(item.ramUsedRatio*100).toFixed(2)"
            :content-color="(item.ramUsedRatio*100).toFixed(2)> 80 ? fontRed: fontGreen"
            unit="%"
          />
        </template>
      </div>
    </template>
    <empty v-else height="100%" />
  </div>
</template>

<script>

import ServerStatisticsCard from "./ServerStatisticsCard";
import Empty from "@/components/common/Empty";

export default {
  name: "ServerUseList",
  components: { ServerStatisticsCard, Empty },
  props: {
    // 列表数据
    list: {
      type: Array,
      default: () => [
        {
          hostIP: "10.1.2.197",
          hostName: "网上办事大厅web服务器1",
          cpuUsedRatio: 0,
          ramUsedRatio: 0,
          diskUsedRatio: 0
        }
      ]
    },
    // 当前激活
    activeTab: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // 字体颜色
      fontRed: "#f10407",
      fontGreen: "#26dd61"
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/statistics-screen.scss";
.server-use {
  &-list {
    height: 100%;
    overflow: hidden;
    padding: 0 20rem * $baseUnit;
    color: #fff;

    &-item {
      overflow: hidden;
      padding-bottom: 15rem * $baseUnit;
      margin-top: 15rem * $baseUnit;
      background-size: 100% 1px;
      line-height: 50rem * $baseUnit;
      background-repeat:no-repeat;
      background-image: url('../../../assets/screen_images/img_fenge02.png');
      background-position:  center bottom;

      &:last-child {
        background: none;
      }

      &__title {
        color: #f3f43d;
        font-size: 20rem * $baseUnit;
        padding: 5rem * $baseUnit;
        text-align: center;
      }

      &__content {
        justify-content: space-between;
        position: relative;

        &-right {
          // align-items: center;
          position: absolute;
          right: -40rem * $baseUnit;
          top: -20rem * $baseUnit;

          .chart-content {
            width: 300rem * $baseUnit;
            height: 300rem * $baseUnit;
          }
        }
      }
    }
  }
}
</style>
