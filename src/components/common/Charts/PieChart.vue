<template>
  <div :ref="className" :class="className" :style="{ height, width }" />
</template>

<script>
/* eslint-disable */
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "@/mixins/chart/resize";

export default {
  name: "PieChart",
  mixins: [resize],
  props: {
    // 图表数据
    chartData: {
      type: Array,
      default: () => []
    },
    // 属性配置
    propertys: {
      type: Object,
      default: () => ({
        // 文本对应属性
        text: "name",
        // 数值对应属性
        value: "value"
      })
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
        trigger: "item",
        formatter: "{b} : {c} ({d}%)",
        backgroundColor: "rgba(0,0,0,0.6)", // 通过设置rgba调节背景颜色与透明度
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow',
            shadowStyle: "rgba(0, 0, 0, 0.5)" // 通过设置rgba调节背景颜色与透明度
          }
      })
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
      // 处理数据
      let chartData = [];
      let legendData = [];
      this.chartData.map(e => {
        chartData.push({
          name: e[this.propertys.text],
          value: e[this.propertys.value]
        });

        legendData.push(e[this.propertys.text]);
      });

      // 图表配置
      this.chart.setOption({
        tooltip: this.tooltip,
        legend: {
          orient: "horizontal",
          top: 0,
          data: legendData
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "56%"],
            data: this.appendBaseColor(chartData, this.colorList)
          }
        ]
      });
    },
    appendBaseColor(dataList, colorList) {
      const temp = [];
      for (let i in dataList) {
        const tempObj = {
          ...dataList[i],
          itemStyle: {
            color: colorList[i]
          }
        };
        temp.push(tempObj);
      }
      return temp;
    }
  }
};
</script>

