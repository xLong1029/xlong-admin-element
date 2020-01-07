
<template>
  <div :ref="className" :class="className" :style="{ height, width }" />
</template>

<script>
/* eslint-disable */
// 参考地址：https://gallery.echartsjs.com/editor.html?c=xduIDV_7VM
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "@/mixins/chart/resize";
export default {
  name: "PieChart",
  mixins: [resize],
  props: {
    // 图表名称
    title: {
      type: String,
      default: ""
    },
    // 图表数据
    chartData: {
      type: Array,
      default: () => []
    },
    // 颜色列表
    colorList: {
      type: Array,
      default: () => [
        "#45FBF7",
        "#48FF58",
        "#EAE809",
        "#FF7E3F",
        "#FF4746",
        "#E177F9",
        "#4E6BFF",
        "#5EA6FE"
      ]
    },
    // 是否开启轮播
    carousel: {
      type: Boolean,
      default: false
    },
    // 图表背景
    background: {
      type: String,
      default: "transparent" // "#000a25"
    },
    // 字体基数
    scale: {
      type: Number,
      default: 1
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
    }
  },
  data() {
    return {
      chart: null,
      option: null
    };
  },
  mounted() {
    this.$nextTick(() => {
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
      this.chart = echarts.init(this.$refs[this.className]);

      this.option = {
        backgroundColor: this.background,
        legend: {
          type: "scroll",
          orient: "vartical",
          // x: "right",
          top: "center",
          right: 10 * this.scale,
          // bottom: "0%",
          itemWidth: 16,
          itemHeight: 8,
          itemGap: 16,
          textStyle: {
            color: "#A3E2F4",
            fontSize: 13 * this.scale,
            fontWeight: 0
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        series: [
          {
            type: "pie",
            radius: [0, 55 * this.scale],
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {},
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.appendBaseColor(this.chartData, this.colorList, 0.6)
          },
          {
            type: "pie",
            radius: [75 * this.scale, 85 * this.scale],
            label: {
              normal: {
                formatter: "{c}",
                fontSize: 12 * this.scale,
                // show: false
              }
            },
            labelLine: {
              normal: {
                show: false,
                length: 10,
                length2: 10
              }
            },
            data: this.appendBaseColor(this.chartData, this.colorList, 1)
          }
        ]
      };
      this.chart.setOption(this.option);
      if (this.carousel) {
        this.startLoopMove();
      }
    },
    appendBaseColor(dataList, colorList, opacity) {
      const temp = [];
      for (let i in dataList) {
        const tempObj = {
          ...dataList[i],
          itemStyle: {
            color: colorList[i],
            opacity: opacity
          }
        };
        temp.push(tempObj);
      }
      return temp;
    },
    startLoopMove() {
      let idx = 0;
      setInterval(() => {
        this.clearSelectedStatus();
        this.option.series[0].data[idx]["selected"] = true;
        this.option.series[0].data[idx]["itemStyle"]["opacity"] = 1;
        this.option.series[1].data[idx]["selected"] = true;
        if (this.chart) {
          this.chart.setOption(this.option);
        }
        idx++;
        if (idx >= this.chartData.length) {
          idx = 0;
        }
      }, 1000);
    },
    clearSelectedStatus() {
      this.option.series[0].data = this.appendBaseColor(
        this.chartData,
        this.colorList,
        0.6
      );
      this.option.series[1].data = this.appendBaseColor(
        this.chartData,
        this.colorList,
        1
      );
      if (this.chart) {
        this.chart.setOption(this.option);
      }
    }
  }
};
</script>
