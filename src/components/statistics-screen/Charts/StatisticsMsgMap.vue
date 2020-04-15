
<template>
  <div :ref="className" :class="className" :style="{ height, width }" />
</template>

<script>
/* eslint-disable */
// 参考地址：https://gallery.echartsjs.com/editor.html?c=xdExzKlpOh
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "mixins/chart/resize";
import { deepClone } from "utils";
import geoJson from "mock/guangxi.json";

export default {
  name: "StatisticsMsgMap",
  mixins: [resize],
  props: {
    // 图表名称
    title: {
      type: String,
      default: ""
    },
    // 地理坐标数据
    geoCoordMap: {
      type: Object,
      default: () => ({
        南宁市: [108.467414, 23.055856]
      })
    },
    // 图表数据
    chartData: {
      type: Array,
      default: () => []
    },
    // 弹窗消息
    popupMsg: {
      type: Object,
      default: () => ({
        // action: "申报",
        // actionTime: "2019-11-15T16:46:30.2626147+08:00",
        // actionTimeStr: "2019年11月15日 04:46:30",
        // cityCode: "4501",
        // cityName: "桂林市",
        // appName: "广西房屋建筑和市政基础设施工程评标专家管理系统",
        // latitude: 23.055856,
        // longitude: 108.467414,
        // operationType: 2, // 1 从南宁出发， 2 回到南宁
        // operator: "林勇",
      })
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
      default: () => [
        "rgba(254,174,33,.9)",
        "rgba(255,57,121,.9)",
        "rgba(8,186,236,.9)"
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
    popupMsg(data) {
      this.getMsg();
    }
  },
  data() {
    return {
      chart: null,
      option: {},
      linesData: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      echarts.registerMap("广西", geoJson);
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
      let coordinateData = [];
      for (let name in this.geoCoordMap) {
        coordinateData.push({
          name,
          value: this.geoCoordMap[name]
        });
      }

      this.option = {
        backgroundColor: this.background,

        grid: {
          left: 0,
          right: 0,
          bottom: 0,
          top: "12%"
        },
        // 地图
        geo: {
          map: "广西",
          label: {
            show: false,
            emphasis: {
              show: false
            }
          },
          // 地图变形，1为不变形
          aspectScale: 1,
          // 缩放操作
          // roam: true,
          // 地图样式
          itemStyle: {
            normal: {
              areaColor: "#04235b",
              borderColor: "#0692a4"
            },
            emphasis: {
              areaColor: "#011031"
            }
          }
        },
        series: [
          // 坐标点
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            z: 1,
            data: coordinateData,
            symbolSize: 3 * this.scale,
            label: {
              normal: {
                show: true,
                position: "bottom",
                formatter: "{b}"
              }
            },
            itemStyle: {
              color: "#08baec"
            }
          },
          {
            type: "lines",
            zlevel: 1,
            effect: {
              show: true,
              period: 3,
              trailLength: 0.7,
              color: "#fff",
              symbolSize: 3
            },
            lineStyle: {
              normal: {
                color: "#3ed4ff",
                width: 0,
                curveness: 0.2
              }
            },
            animationDelayUpdate: 5000,
            data: []
          },
          // 数值点
          {
            name: "点",
            type: "scatter",
            coordinateSystem: "geo",
            symbol: "pin",
            symbolSize: 50,
            label: {
              normal: {
                show: true,
                formatter: function(val) {
                  const data = val.data.value[2];
                  return data;
                },
                textStyle: {
                  color: "#fff",
                  fontSize: 12
                }
              }
            },
            itemStyle: {
              normal: {
                color: "#F62157" //标志颜色
              }
            },
            zlevel: 26,
            data: this.convertData(this.chartData)
          }
        ]
      };

      this.chart.setOption(this.option, true);
    },
    getMsg() {
      if (!this.popupMsg) {
        this.clearAllMsg();
        return;
      }

      // 返回当前消息
      this.$emit("msg-popup", this.popupMsg);

      if (this.chart) {
        this.initChart();
      }
    },
    clearAllMsg() {
      this.option.series.forEach(e => {
        if (e.type === "scatter") {
          e.data = [];
        }
      });
    },
    // 转换数据
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    }
  }
};
</script>
