<template>
  <div :ref="className" :class="className" :style="{ height, width }" />
</template>

<script>
/* eslint-disable */
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "@/mixins/chart/resize";
import utils from "@/mixins/chart/utils";

export default {
  name: "BarChart",
  mixins: [resize, utils],
  props: {
    // 图表数据
    chartData: {
      type: Object,
      default: () => ({
        name: "",
        value: ""
      })
    },
    // 属性配置
    propertys: {
      type: Object,
      default: () => ({
        // 文本对应属性
        text: "key",
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
    }
  },
  watch: {
    data(data) {
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
      let chartData = {
        name: this.chartData[this.propertys.text],
        value: this.chartData[this.propertys.value]
      };

      // 图表配置
      this.chart.setOption({
        title: {
          show: true,
          x: "center",
          bottom: "20%",
          text: `${chartData.name} ${chartData.value}%`,
          textStyle: {
            fontWeight: "normal",
            fontSize: 16,
            color: "#303133"
          }
        },
        tooltip: {
          formatter: chartData.name + " : {c}%",
          backgroundColor: "rgba(0,0,0,0.6)", // 通过设置rgba调节背景颜色与透明度
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow',
            shadowStyle: "rgba(0, 0, 0, 0.5)" // 通过设置rgba调节背景颜色与透明度
          }
        },
        series: [
          {
            name: "刻度",
            type: "gauge",
            radius: "80%",
            center: ["50%", "65%"],
            startAngle: 180, //刻度起始
            endAngle: 0, //刻度结束
            z: 4,
            axisTick: {
              show: false
            },
            splitLine: {
              length: 16, //刻度节点线长度
              lineStyle: {
                width: 2,
                color: "#fff"
              } //刻度节点线
            },
            axisLabel: {
              color: "#",
              fontSize: 16
            }, //刻度节点文字颜色
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                opacity: 0
              }
            },
            detail: {
              show: false
            },
            data: [
              {
                show: false
              }
            ]
          },
          {
            name: "刻度背景",
            type: "gauge",
            z: 2,
            radius: "80%",
            startAngle: 180,
            endAngle: 0,
            center: ["50%", "65%"], //整体的位置设置
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[1, "#3dbdef"]],
                width: 15,
                opacity: 1 //刻度背景宽度
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            axisTick: {
              show: false
            },
            detail: {
              show: 0
            }
          },
          {
            name: "指针",
            type: "gauge",
            z: 6,
            radius: "95%",
            startAngle: 180,
            endAngle: 0,
            center: ["50%", "65%"], //整体的位置设置
            axisLine: {
              lineStyle: {
                // 属性lineStyle控制线条样式//指针颜色
                color: [[1, "#3dbdef"]],
                width: 0
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            data: [this.chartData.value], //指针位置
            pointer: {
              show: true,
              width: 5,
              length: "55%"
            },
            detail: {
              show: false
            }
          },
          {
            name: "外层盘",
            type: "gauge",
            z: 6,
            radius: "90%",
            startAngle: 180,
            endAngle: 0,
            center: ["50%", "65%"], //整体的位置设置
            axisLine: {
              lineStyle: {
                // 属性lineStyle控制线条样式//控制外圈位置
                color: [[this.chartData.value/100, "#3dbdef"], [1, "rgba(0, 0, 0, 0.1)"]],
                width: 6,
                opacity: 0.9 //控制外圈位置，颜色，宽度，透明度
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },            
            detail: {
              show: false
            }
          }
        ]
      });
    }
  }
};
</script>