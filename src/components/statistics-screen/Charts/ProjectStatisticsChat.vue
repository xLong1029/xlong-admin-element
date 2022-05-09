
<template>
  <div :ref="className" :class="className" :style="{ height, width}" />
</template>

<script>

// 参考地址：https://gallery.echartsjs.com/editor.html?c=xduIDV_7VM
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "@/mixins/chart/resize";
import utils from "@/mixins/chart/utils";

export default {
  name: "ProjectStatisticsChat",
  mixins: [resize, utils],
  props: {
    // 图表名称
    title: {
      type: String,
      default: ""
    },
    chartData: {
      type: Object,
      defalut: () => null
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
  data() {
    return {
      chart: null,
      timer: null
    };
  },
  watch: {
    chartData(data) {
      // 图表重绘
      this.chart.setOption({}, true);
      this.initChart();
    }
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
    initChart() {
      const that = this;

      const { data, title } = this.chartData;

      const series = [
          {
            data,
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top",
                distance: 10,
                textStyle: {
                  color: "#ffffff",
                  fontSize: 12 * this.scale
                }
              }
            },
            barWidth: 30
          }
        ];

      const op = {
        title: {
          text: title,
          textStyle: {
            color: "#ffffff",
            fontSize: 12 * this.scale
          },
          top: "8%"
        },
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgb(3,160,252)" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgb(1,88,255)" // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },
        backgroundColor: this.background,
        xAxis: {
          type: "category",
          data: data.map(e => e.name),
          axisLabel: {
            inside: false,
            textStyle: {
              color: "#A3E2F4",
              fontWeight: "normal",
              fontSize: 12 * this.scale
            },
            // interval:0,
            // formatter: function(params) {
            //   const num = 5;

            //   let text = "";
            //   for (let i = 0; i <= params.length / num; i++) {
            //     text += params.substring(i * num, (i + 1) * num) + "\n";
            //   }
            //   return text;
            // }
          }
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#32346c"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#32346c "
            }
          },
          axisLabel: {
            textStyle: {
              color: "#bac0c0",
              fontWeight: "normal",
              fontSize: 12 * this.scale
            }
          }
        },
        tooltip: {
          show: false,
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            shadowStyle: {
              shadowStyle: "rgba(0, 0, 0, 0.5)"
            }
          },
          formatter(params) {
            const labels = that.chartData.labels || [];
            let text = params[0].name;

            if (labels.length) {
              text += "<br />";

              labels.forEach((e, index) => {
                text +=
                  params[index].seriesName +
                  " ：" +
                  params[index].data +
                  that.chartData.unit +
                  "<br />";
              });
            } else {
              text += " ：" + params[0].data + that.chartData.unit + "<br />";
            }

            return text;
          },
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: [8, 10], //内边距
          extraCssText: "box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);" //添加阴影
        },
        grid: {
          left: "3%",
          right: "2%",
          bottom: 0,
          top: "30%",
          containLabel: true
        },
        series
      };
      this.chart.setOption(op, true);
    }
  }
};
</script>
