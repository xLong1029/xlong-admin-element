
<template>
  <div :ref="className" :class="className" :style="{ height, width }" />
</template>

<script>

// 参考地址：https://gallery.echartsjs.com/editor.html?c=x5rCd-XbL6
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "@/mixins/chart/resize";
import utils from "@/mixins/chart/utils";

export default {
  name: "GradualBarChart",
  mixins: [resize, utils],
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
      this.chart = echarts.init(this.$refs[this.className]);
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
      // console.log(axisData);

      // 处理显示数据
      let seriesData = [];
      if (this.series.length > 0 && this.series.length < 2) {
        seriesData = chartData.map((i, index) => {
          return i[this.series[0].property]
        });
      }
      // 多柱状，待优化
      // else{
      //   this.series.forEach(e => {
      //     const dataArr = chartData.map(i => i[e.property]);
      //     dataArr.forEach((item, index) => {
      //       seriesData.push(item);
      //     })
      //   });
      // }

      const option = {
        backgroundColor: this.background,
        // tooltip: {},
        xAxis: {
          type: "value",
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: [
          {
            type: "category",
            inverse: false,
            data: axisData,
            position: "left",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            }
          }
        ],
        grid: {
          top: 10,
          // height: 65 * this.scale * axisData.length,
          left: 5,
          right: '10%',
        },
        series: [
          {
            // 底部背景边框
            type: "pictorialBar",
            symbol: "reat",
            //barWidth: '9%',
            //barMaxWidth: '20%',
            // symbolOffset: [0, 0],
            symbolSize: ["100%", 15 * this.scale],
            itemStyle: {
              normal: {
                color: '#000b26'
              }
            },
            z: 1,
            symbolRepeat: null,
            symbolBoundingData: 9999999,
            // 当前要显示的值
            data: seriesData,
            label: {
              normal: {
                show: true,
                distance: 20,
                position: "right",
                offset: [-10, 0],
                color: '#fff',
                fontSize: 12 * this.scale
              }
            },
            animation: false,
          },
          {
            // 当前数值柱状
            type: "bar",
            label: {
              normal: {
                show: true,
                color: '#fff',
                position: "right",
              }
            },
            barWidth:15 * this.scale,
            stack: 'all',
            position: [20, 0],            
            data: seriesData.map(e => {
              return {
                value: e,
                itemStyle: {
                  normal: {
                    // color: '#03e8fe',
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: 'rgba(0,244,255,1)' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(0,77,167,1)' // 100% 处的颜色
                    }], false),
                  }
                }
              };
            }),
            z: 99
          },
          {
            // 系统名称
            type: "pictorialBar",
            itemStyle: {
              normal: {
                color: 'transparent'
              }
            },            
            label: {
              normal: {
                show: false
              }
            },
            data: seriesData.map((e, index) => {
              return {
                value: e,
                label: {
                  normal: {
                    show: true,
                    position: [0, -10],
                    formatter: "{b}",
                    // offset: [10, 0],
                    textStyle: {
                      color: "#fff",
                      fontSize: 12 * this.scale
                    }
                  }
                }
              };
            }),
            z: 9
          }
        ]
      };
      this.chart.setOption(option, true);
    }
  }
};
</script>
