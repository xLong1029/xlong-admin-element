
<template>
  <div :ref="className" :class="className" :style="{ height, width }" />
</template>

<script>
/* eslint-disable */
// 参考地址：https://gallery.echartsjs.com/editor.html?c=x2Ei_JbHZb
// 参考地址：https://gallery.echartsjs.com/editor.html?c=xdExzKlpOh
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "@/mixins/chart/resize";
import { deepClone } from "@/utils";
// 引入中国地图数据
import "../../../../node_modules/echarts/map/js/province/guangxi.js";

export default {
  name: "MigrationMap",
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
      chart: null,
      migrateData: []
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
      let migrateData = [];
      for (let name in this.geoCoordMap) {
        migrateData.push([
          {
            name: "南宁市"
          },
          {
            name,
            value: name === "南宁市" ? 100 : 50
          }
        ]);
      }

      setTimeout(() => {
        migrateData = [
          [
            {
              name: "南宁市"
            },
            {
              name: "桂林市",
              value: 100
            }
          ]
        ];
      }, 1000);

      var planePath =
        "path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705";
      const _this = this;

      const color = "#3ed4ff";

      const option = {
        backgroundColor: this.background,
        // title: {
        //   text: this.title,
        //   subtext: "",
        //   left: "left",
        //   textStyle: {
        //     color: "#fff"
        //   }
        // },
        // tooltip: {
        //   trigger: "item"
        // },
        geo: {
          map: "广西",
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
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
          {
            type: "lines",
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              color: "#fff",
              symbolSize: 3
            },
            lineStyle: {
              normal: {
                color,
                width: 0,
                curveness: 0.2
              }
            },
            data: _this.convertData(migrateData)
          },
          {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol: planePath,
              symbolSize: 15
            },
            lineStyle: {
              normal: {
                color,
                width: 1,
                opacity: 0.4,
                curveness: 0.2
              }
            },
            data: _this.convertData(migrateData)
          },
          {
            name: "南宁市",
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke"
            },
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "{b}"
              }
            },
            symbolSize: function(val) {
              return val[2] / 8;
            },
            itemStyle: {
              normal: {
                color
              }
            },
            data: migrateData.map(function(dataItem) {
              return {
                name: dataItem[1].name,
                value: _this.geoCoordMap[dataItem[1].name].concat([
                  dataItem[1].value
                ])
              };
            })
          }
        ]
      };
      this.chart.setOption(option, true);
    },
    // 转换数据格式
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = this.geoCoordMap[dataItem[0].name];
        var toCoord = this.geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
          res.push([
            {
              coord: fromCoord
            },
            {
              coord: toCoord
            }
          ]);
        }
      }
      return res;
    }
  }
};
</script>
