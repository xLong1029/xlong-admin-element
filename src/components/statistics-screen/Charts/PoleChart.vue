
<template>
  <div :ref="className" :class="className" :style="{ height, width }" />
</template>

<script>

// 参考地址：https://gallery.echartsjs.com/editor.html?c=xRHCwW5jq1
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "@/mixins/chart/resize";
export default {
  name: "PoleChart",
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
        "#EAEA26",
        "#906BF9",
        "#FE5656",
        "#01E17E",
        "#3DD1F9",
        "#FFAD05"
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
      default: "transparent" //"#000a25"
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
      option: null,
      legendData: []
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

      this.legendData = this.chartData.map(e => e.name);
      this.option = {
        backgroundColor: this.background,
        color: this.colorList,
        // title: {
        //   text: this.title,
        //   left: "60",
        //   top: 0,
        //   textAlign: "center",
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: 14 * this.scale,
        //     fontWeight: 0
        //   }
        // },
        grid: {
          left: 0,
          top: 0,
          bottom: 10,
          right: 10 * this.scale,
          containLabel: true
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vartical",
          // x: "right",
          top: "center",
          right: 0,
          // bottom: "0%",
          itemWidth: 16,
          itemHeight: 8,
          itemGap: 16,
          textStyle: {
            color: "#A3E2F4",
            fontSize: 12 * this.scale,
            fontWeight: 0
          },
          data: this.legendData
        },
        polar: {},
        angleAxis: {
          interval: 1,
          type: "category",
          data: [],
          z: 10,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#0B4A6B",
              width: 1,
              type: "solid"
            }
          },
          axisLabel: {
            interval: 0,
            show: true,
            color: "#0B4A6B",
            margin: 8,
            fontSize: 12 * this.scale
          }
        },
        radiusAxis: {
          min: 30 * this.scale,
          max: 70 * this.scale,
          interval: 10 * this.scale,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#0B3E5E",
              width: 1,
              type: "solid"
            }
          },
          axisLabel: {
            formatter: "{value} %",
            show: false,
            padding: [0, 0, 10 * this.scale, 0],
            color: "#0B3E5E",
            fontSize: 12 * this.scale
          },
          splitLine: {
            lineStyle: {
              color: "#0B3E5E",
              width: 2,
              type: "solid"
            }
          }
        },
        calculable: true,
        series: [
          {
            stack: "a",
            type: "pie",
            radius: ["10%", "70%"],
            roseType: "area",
            zlevel: 10,
            label: {
              normal: {
                show: true,
                formatter: "{c}",
                textStyle: {
                  fontSize: 12 * this.scale
                },
                position: "outside"
              },
              emphasis: {
                show: true
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 10,
                length2: 10
              },
              emphasis: {
                show: false
              }
            },
            data: this.chartData
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
        1
      );
      if (this.chart) {
        this.chart.setOption(this.option);
      }
    }
  }
};
</script>
