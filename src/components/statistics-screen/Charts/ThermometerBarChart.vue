
<template>
  <div :ref="className" :class="className" :style="{ height, width }" />
</template>

<script>

// 参考地址：https://gallery.echartsjs.com/editor.html?c=xduIDV_7VM
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "@/mixins/chart/resize";
import utils from "@/mixins/chart/utils";

export default {
  name: "ThermometerBarChart",
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
        name: '系统名称',
        property: 'name'
      })
    },
    // 条形数值配置
    series: {
      type: Array,
      default: () => [{
        name: '登录次数',
        property: 'loginTime'
      }]
    },
    // 颜色列表
    colorList: {
      type: Array,
      // 目前只有3种渐变，多的需要往后自行添加
      default: () => [
        "#fb734e",
        "#e32f46",// 红色渐变
        "#94d96c",
        "#0bbcb7",// 绿色渐变
        "#1a9bfc",
        "#7049f0",// 蓝色渐变
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
    chartData(data){
      // 图表重绘
      this.chart.setOption({}, true);
      this.initChart();
    }
  },
  data() {
    return {
      chart: null,
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
    compare(propertys) {
        return function(a, b) {
          let value1 = 0;
          let value2 = 0;
          propertys.forEach(e => {
            value1 += a[e];
            value2 += b[e];
          })
          return propertys.length > 1 ? value1 - value2 : value2 - value1;
        };
    },
    initChart() {
      // 解决因为排序改变图表数据，切换图表时导致死循环的问题
      let chartData = {...this.chartData};

      // 是否排序
      if (this.sort) {
        chartData = this.sortData();
      }

      // 处理坐标轴数据
      let axisData = [];
      chartData.forEach(e => {
        axisData.push(e[this.axis.property]);
      })
      // console.log(axisData);

      // 处理属性名称
      let nameList = [];
      this.series.forEach(e => nameList.push(e.property));

      // console.log(nameList);

      // 处理显示数据
      let series = [];
      this.series.forEach((e, index) => {
        const num = nameList.length;
        // 处理偏移量
        let symbolOffset = [];
        if(num <= 0) return;
        // 只有一个属性值
        if(num === 1){
          symbolOffset = [0, 0];
        }
        // 双数
        else if(num % 2 === 0){
          symbolOffset = [(1 - num) * 10 + index * 20, 0];
        }
        // 单数
        else {
          const average = Math.floor(num / 2);
          // 中间值
          if(index === average){
            symbolOffset = [0, 0];
          }
          // 左边
          else{
            symbolOffset = [(index - average) * 20, 0];
          }
        }
        const dataArr = chartData.map(i => i[e.property]);
        const colorSet = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: this.colorList[index * 2]
          },
          {
            offset: 1,
            color: this.colorList[(index + 1) * 2 - 1]
          }
        ]);

        // console.log(colorSet);

        series.push(
          // 数值柱状
          {
            name: e.name,
            type: "bar",
            stack: index,
            xAxisIndex: 0,
            data: dataArr,
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
            barWidth: 4,
            barGap: 4,
            itemStyle: {
              normal: {
                color: colorSet
              }
            },
            z: 2
          },
          // 数值圆点
          {
            name: e.name,
            type: "scatter",
            stack: index + 1,
            xAxisIndex: 0,
            // symbolOffset: 0, // 相对于原本位置的偏移量
            data: dataArr,
            label: {
              normal: {
                show: false
              }
            },
            xAxisIndex: 2,
            symbolSize: 8,
            itemStyle: {
              normal: {
                borderColor: "#fff",
                borderWidth: 1,
                color: colorSet,
                opacity: 1
              }
            },
            z: 2
          },
          // 内框
          {
            name: e.name,
            type: "bar",
            xAxisIndex: 1,
            barGap: "140%",
            data: dataArr,
            barWidth: 8,
            itemStyle: {
              normal: {
                color: '#000a25',
                barBorderRadius: 5
              }
            },
            z: 1
          },
          // 外框
          {
            name: e.name,
            type: "bar",
            xAxisIndex: 2,
            data: dataArr,
            barWidth: 10,
            barGap: 1,
            itemStyle: {
              normal: {
                color: colorSet,
                barBorderRadius: 4
              }
            },
            z: 0
          },
          // 底座圆点
          // {
          //   name: e.name,
          //   type: "scatter",
          //   hoverAnimation: false,
          //   data: dataArr.map(i => 0),
          //   xAxisIndex: 2,
          //   symbolOffset, // 相对于原本位置的偏移量
          //   symbolSize: 10,
          //   itemStyle: {
          //     normal: {
          //       color: colorSet,
          //       opacity: 1
          //     }
          //   },
          //   z: 2
          // }
        );
      });

      const option = {
        backgroundColor: this.background,
        // title: {
        //   text: this.title,
        //   x: "10",
        //   y: "10",
        //   textStyle: {
        //     fontWeight: "normal",
        //     fontSize: 24 * this.scale,
        //     color: "#fff"
        //   }
        // },
        grid: {
          left: "3%",
          right: "3%",
          bottom: 0,
          top: "12%",
          containLabel: true
        },
        tooltip: {
          show: "true",
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            shadowStyle: {
              color: "rgba(112,112,112,0)"
            }
          },
          formatter: function(params) {
            let unit = params[0].name.substring(
              params[0].name.indexOf("(") + 1,
              params[0].name.indexOf(")")
            );
            let text = params[0].name + " ：<br />";
            nameList.forEach((e, index) => {
              text += params[index].seriesName +" ：" + params[index].data + unit + "<br />";
            })
            return text;
          },
          backgroundColor: "rgba(0,0,0,0.7)", // 背景
          padding: [8, 10], //内边距
          extraCssText: "box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);" //添加阴影
        },
        // legend: {
        //   top: 20,
        //   right: 50,
        //   textStyle: {
        //     color: "#fff"
        //   }
        // },
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: false
            },
            offset: 10,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#363e83"
              }
            },
            axisLabel: {
              inside: false,
              textStyle: {
                color: "#A3E2F4",
                fontWeight: "normal",
                fontSize: 12 * this.scale
              },              
              // interval:0,
              rotate:40,
              formatter: function(params) {
                const num = 5;

                let text = '';
                for(let i = 0; i <= params.length/num; i++){
                  text += params.substring(i*num, (i+1)*num) + '\n';
                }
                return text;
              },
            },
            data: axisData
          },
          {
            type: "category",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: axisData
          },
          {
            type: "category",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: axisData
          }
        ],
        yAxis: {
          type: "value",
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
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
        series
      };
      this.chart.setOption(option, true);
    }
  }
};
</script>
