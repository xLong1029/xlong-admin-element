
<template>
  <div :ref="className" :class="className" :style="{ height, width }" />
</template>

<script>
/* eslint-disable */
// 参考地址：https://gallery.echartsjs.com/editor.html?c=xQu-EdKtv9
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "@/mixins/chart/resize";
export default {
  name: "RadarChart",
  mixins: [resize],
  props: {
    // 图表名称
    title: {
      type: String,
      default: "chartName"
    },
    // 图表数据
    chartData: {
      type: Array,
      default: () => []
    },
    // 指示器数据
    indicatorData: {
      type: Array,
      default: () => []
    },
    // 是否开启动画
    animation: {
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
      chart: null
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

      const option = {
        backgroundColor: this.background,
        grid: {
          top: "1%",
          left: "1%",
          right: "1%",
          bottom: "1%"
        },
        tooltip: {
          trigger: "axis"
        },
        radar: [
          {
            nameGap: 5,
            indicator: this.indicatorData,
            center: ["50%", "50%"],
            radius: "40%",
            name: {
              textStyle: {
                fontSize: 14 * this.scale,
                color: "#ffffff"
              }
            },
            splitLine: {
              lineStyle: {
                color: "#696969",
                width: 1
              }
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: "#001A29"
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#696969"
              }
            }
          }
        ],
        // legend: {
        //   selectedMode: false,
        //   top: "0", // 图例组件离容器顶部的距离
        //   right: "0%",
        //   icon: "none",
        //   textStyle: {
        //     fontSize: 14 * this.scale,
        //     rich: {
        //         total: {
        //             color: "#ffc72b",
        //             fontSize: 18 * this.scale,
        //             align: 'center',
        //             padding: [1, 0],
        //         },
        //         total_text: {
        //             fontSize: 14 * this.scale,
        //             align: 'center'
        //         },
        //     }
        //   }
        // },
        series: [
          {
            type: "radar",
            animation: this.animation,
            tooltip: {
              trigger: "item"
            },
            data: [
              {
                value: this.chartData,
                name: this.title
              }
            ],
            symbolSize: 2,
            itemStyle: {
              normal: {
                borderColor: "#ffc000"
              }
            },
            lineStyle: {
              normal: {
                color: "#ffc000",
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0,0,0,1,[
                    {
                      offset: 0,
                      color: "rgba(255,246,0, 0.9)"
                    },
                    {
                      offset: 0.5,
                      color: "rgba(255,246,0,0)"
                    },
                    {
                      offset: 1,
                      color: "rgba(255,246,0, 0.9)"
                    }
                  ],false)
              }
            }
          }
        ]
      };
      this.chart.setOption(option);
    }
  }
};
</script>
