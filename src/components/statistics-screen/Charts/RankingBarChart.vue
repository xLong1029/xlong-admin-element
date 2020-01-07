
<template>
  <div :ref="className" :class="className" :style="{ height, width }" />
</template>

<script>
/* eslint-disable */
// 参考地址：https://gallery.echartsjs.com/editor.html?c=xdExzKlpOh
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "@/mixins/chart/resize";
import utils from "@/mixins/chart/utils";
import { deepClone } from "@/utils";

export default {
  name: "RankingBarChart",
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
      // this.chart.setOption({}, true);
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
      chartData.forEach((e, index) => {
        axisData.push(
          index < 10
            ? "0" + index + e[this.axis.property]
            : index + e[this.axis.property]
        );
      });
      // console.log(axisData);

      // 处理显示数据
      let seriesData = [];
      if (this.series.length > 0 && this.series.length < 2) {
        seriesData = chartData.map((i, index) => {
          return i[this.series[0].property]; // 测试数据，正式需要把(index+1)*20取消掉
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
          show: false
        },
        yAxis: {
          type: "category",
          inverse: true,
          nameGap: 16 * this.scale,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#ddd"
            }
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: "#ddd"
            }
          },
          axisLabel: {
            interval: 0,
            margin: 95 * this.scale,
            textStyle: {
              color: "#fff",
              align: "left",
              fontSize: 14 * this.scale
            },
            rich: {
              a: {
                color: "#fff",
                backgroundColor: "#f0515e",
                width: 20 * this.scale,
                height: 20 * this.scale,
                align: "center",
                borderRadius: 2 * this.scale
              },
              b: {
                color: "#fff",
                backgroundColor: "#24a5cd",
                width: 20 * this.scale,
                height: 20 * this.scale,
                align: "center",
                borderRadius: 2 * this.scale
              }
            },
            // 排序样式
            formatter: function(params) {
              if (parseInt(params.slice(0, 2)) < 3) {
                return [
                  "{a|" +
                    (parseInt(params.slice(0, 2)) + 1) +
                    "}" +
                    "  " +
                    params.slice(2)
                ].join("\n");
              } else {
                return [
                  "{b|" +
                    (parseInt(params.slice(0, 2)) + 1) +
                    "}" +
                    "  " +
                    params.slice(2)
                ].join("\n");
              }
            }
          },
          data: axisData
        },
        grid: {
          right: 15 * this.scale,
          left: 120 * this.scale,
          top: 0,
          bottom: 20 * this.scale
        },
        series: [
          {
            name: "barSer",
            type: "bar",
            roam: false,
            visualMap: false,
            zlevel: 2,
            barMaxWidth: 16 * this.scale,
            barGap: 0,
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    {
                      colorStops: [
                        {
                          offset: 0,
                          color: "#f0515e"
                        },
                        {
                          offset: 1,
                          color: "#ef8554"
                        }
                      ]
                    },
                    {
                      colorStops: [
                        {
                          offset: 0,
                          color: "#3c38e4"
                        },
                        {
                          offset: 1,
                          color: "#24a5cd"
                        }
                      ]
                    }
                  ];
                  if (params.dataIndex < 3) {
                    return colorList[0];
                  } else {
                    return colorList[1];
                  }
                },
                barBorderRadius: [0, 15, 15, 0]
              }
            },
            label: {
              normal: {
                show: true,
                textBorderColor: "#333",
                textBorderWidth: 2
              }
            },
            data: seriesData,
            animationEasing: "bounceOut",
            animationEasingUpdate: "bounceOut",
            animationDelay: 100,
            animationDelayUpdate: 100
          }
        ]
      };
      this.chart.setOption(option, true);
    }
  }
};
</script>
