<template>
  <div :ref="className" :class="className" :style="{ height, width }" />
</template>

<script>

import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "@/mixins/chart/resize";
import utils from "@/mixins/chart/utils";

export default {
  name: 'BarChart',
  mixins: [resize, utils],
  props: {
    // 图表数据
    chartData: {
      type: Array,
      default: () => []
    },
    // 类名
    className: {
      type: String,
      default: "chart"
    },
    // 宽度
    width: {
      type: String,
      default: "100%"
    },
    // 高度
    height: {
      type: String,
      default: "300px"
    },
    // 坐标轴数值配置
    axis: {
      type: Object,
      default: () => ({
        name: "系统名称",
        property: "name"
      })
    },
    // 条形数值配置
    series: {
      type: Array,
      default: () => [
        {
          name: "使用次数",
          property: "useCount"
        }
      ]
    },
    // 是否排序
    sort: {
      type: Boolean,
      default: false
    },
    // 图表背景
    background: {
      type: String,
      default: "transparent"
    },
    // 字体基数
    scale: {
      type: Number,
      default: 1
    },
    // 图表展示方式：条纹横向 horizontal， 条纹竖向 vertical
    direction: {
      type: String,
      default: "vertical"
    },
    // 动画 持续时间
    animationDuration: {
      type: Number,
      default: 1500
    },
    // 颜色配置
    colorList: {
      type: Array,
      default: () => [
        "#19d4ae",
        "#3dbdef",
        "#ff8fa2",
        "#ffc393",
        "#628be8",
        "#ae83f3",
        "#ff94d4",
        "#61c9da"
      ]
    },
    // 提示
    tooltip: {
      type: Object,
      default: () => ({
        trigger: "axis",
        backgroundColor: "rgba(0,0,0,0.6)", // 通过设置rgba调节背景颜色与透明度
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow',
          shadowStyle: "rgba(0, 0, 0, 0.5)" // 通过设置rgba调节背景颜色与透明度
        }
      })
    },
    // 网格
    grid: {
      type: Object,
      default: () => ({
        top: "15%",
        left: "10%",
        right: "10%",
        bottom: "5%",
        containLabel: true
      })
    },
    // 数据放大配置
    dataZoom: {
      type: Array,
      default: () => [
        {
          type: "inside"
        }
      ]
    }
  },
  watch: {
    chartData(data) {
      // 图表重绘
      this.chart.setOption({}, true);
      this.initChart();
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.chart = echarts.init(this.$refs[this.className], "macarons");
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      // 解决因为排序改变图表数据，切换图表时导致死循环的问题
      let chartData = [...this.chartData];

      // 是否排序
      if (this.sort) {
        chartData = this.sortData();
      }

      // 处理坐标轴数据
      let axisData = [];
      chartData.forEach(e => {
        axisData.push(e[this.axis.property]);
      });

      // 处理条形数据
      let seriesSet = [];
      this.series.forEach(e => {
        seriesSet.push({
          name: e.name,
          type: e.type ? e.type : "bar",
          stack: e.stack ? e.stack : "all",
          data: chartData.map(i => i[e.property]),
          // label: e.label
          //   ? e.label
          //   : {
          //       normal: {
          //         show: true,
          //         position:
          //           this.direction === "vertical" ? "insideTop" : "insideRight"
          //       }
          //     },
          animationDuration: this.animationDuration
        });
      });

      const categorySet = [
        {
          type: "category",
          data: axisData,
          axisTick: {
            alignWithLabel: true
          }
        }
      ];
      const valueSet = [
        {
          type: "value",
          axisTick: {
            show: false
          }
        }
      ];

      // 图表配置
      this.chart.setOption({
        legend: {
          orient: "horizontal",
          top: 0
        },
        backgroundColor: this.background,
        color: this.colorList,
        tooltip: this.tooltip,
        grid: this.grid,
        xAxis: this.direction === "vertical" ? categorySet : valueSet,
        yAxis: this.direction === "vertical" ? valueSet : categorySet,
        series: seriesSet
      });
    }
  }
};
</script>

