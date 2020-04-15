
<template>
  <div :ref="className" :class="className" :style="{ height, width }" />
</template>

<script>
/* eslint-disable */
// 参考地址：https://gallery.echartsjs.com/editor.html?c=xHyoiv-D-e
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "@/mixins/chart/resize";
import utils from "@/mixins/chart/utils";

export default {
  name: "RegionMultipleChart",
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
          name: "登录次数",
          property: "loginTime"
        }
      ]
    },
    // 颜色列表
    colorList: {
      type: Array,
      default: () => ["#d85965", "#f39762", "#3079fc", "#07b8c5"]
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
    },
    // 动画效果
    animation: {
      type: Boolean,
      default: true
    },
    // 动画间隔时间
    animationDuration: {
      type: Number,
      default: 2000
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
      chart: null,
      timer: null
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

    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    compare(propertys) {
      return function(a, b) {
        let value1 = 0;
        let value2 = 0;
        propertys.forEach(e => {
          value1 += a[e];
          value2 += b[e];
        });
        return propertys.length > 1 ? value1 - value2 : value2 - value1;
      };
    },
    initChart() {
      // 处理坐标轴数据
      let axisData = [];
      this.chartData.forEach(e => {
        axisData.push(e[this.axis.property]);
      });

      // 处理属性名称
      let nameList = [];
      this.series.forEach(e => nameList.push(e.property));
      // console.log(nameList);

      // 处理显示数据
      let series = [];
      this.series.forEach((e, index) => {
        const dataArr = this.chartData.map(i => i[e.property]);
        if (e.type === "bar") {
          series.push({
            name: e.name,
            type: "bar",
            // "stack": "总量",
            barMaxWidth: 10 * this.scale,
            barGap: "30%",
            itemStyle: {
              normal: {
                color: this.colorList[index],
                label: {
                  show: false,
                  textStyle: {
                    color: this.colorList[index]
                  },
                  position: "top",
                  formatter: function(p) {
                    return p.value > 0 ? p.value : "";
                  }
                }
              }
            },
            data: dataArr
          });
        } else if (e.type === "line") {
          series.push({
            name: e.name,
            type: "line",
            // stack: "总量",
            symbolSize: 5 * this.scale,
            symbol: "circle",
            lineStyle: {
              width: 0.8 * this.scale
            },
            itemStyle: {
              normal: {
                color: this.colorList[index],
                barBorderRadius: 0,
                label: {
                  show: false,
                  position: "top",
                  formatter: function(p) {
                    return p.value > 0 ? p.value : "";
                  }
                }
              }
            },
            data: dataArr
          });
        }
      });

      const option = {
        backgroundColor: this.background,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            shadowStyle: "rgba(0, 0, 0, 0.5)"
          },
          backgroundColor: "rgba(0,0,0,0.6)"
        },
        grid: {
          borderWidth: 0,
          top: "20%",
          bottom: "10%",
          left: "7%",
          right: "3%",
          textStyle: {
            color: "#fff"
          }
        },
        legend: {
          top: 0,
          right: 10,
          itemWidth: 16 * this.scale,
          itemHeight: 8 * this.scale,
          itemGap: 16 * this.scale,
          textStyle: {
            color: "#99dced",
            fontSize: 12 * this.scale
          },
          data: this.series.map(e => e.name)
        },
        // calculable: true,
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: false,
              lineStyle: {
                color: "#fff",
                type: "dashed",
                width: 0.8 * this.scale
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "#fff",
                fontWeight: "normal",
                fontSize: 12 * this.scale
              }
            },
            data: axisData
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                color: "#1b5581",
                type: "dashed",
                width: 0.8 * this.scale
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#fff",
                type: "dashed",
                width: 0.8 * this.scale
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "#fff",
                fontWeight: "normal",
                fontSize: 12 * this.scale
              }
            },
            splitArea: {
              show: false
            }
          }
        ],
        series
      };
      this.chart.setOption(option, true);

      if (this.animation && option.series[0]) {
        this.setAnimation(option);
      }
    },
    setAnimation(option) {
      let currentIndex = -1;

      if (this.timer) {
        clearInterval(this.timer)
      }

      this.timer = setInterval(() => {
        var dataLen = option.series[0].data.length;

        // 取消之前高亮的图形
        this.chart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen;

        // 高亮当前图形
        this.chart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: currentIndex
        });

        // 显示 tooltip
        this.chart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, this.animationDuration);
    }
  }
};
</script>
