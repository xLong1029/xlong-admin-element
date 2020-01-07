<template>
  <div :ref="className" :class="className" :style="{ height, width }" />
</template>

<script>
/* eslint-disable */
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "@/mixins/chart/resize";

export default {
  name: "LineChart",
  mixins: [resize],
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
          type: "line" // 默认为直线，可选为：'line' | 'shadow'
        }
      })
    },
    // 网格
    grid: {
      type: Object,
      default: () => ({
        top: "15%",
        left: "10%",
        right: "12%",
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
      // 处理坐标轴数据
      let axisData = [];
      this.chartData.forEach(e => {
        axisData.push(e[this.axis.property]);
      });

      // 处理条形数据
      let seriesSet = [];
      this.series.forEach(e => {
        seriesSet.push({
          name: e.name,
          type: e.type ? e.type : "line",
          smooth: e.smooth ? e.smooth : false,
          data: this.chartData.map(i => i[e.property]),
          animationDuration: this.animationDuration
        });
      });

      // 图表配置
      this.chart.setOption({
        tooltip: this.tooltip,
        legend: {
          orient: "horizontal",
          top: 0
        },
        grid: this.grid,
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: axisData
        },
        yAxis: {
          type: "value"
        },
        series: seriesSet
      });
    }
  }
};
</script>

