
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
  name: "PopupMsgMap",
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
      const keys = Object.keys(data);
      // 非空对象
      if (keys.length) {
        this.getMsg();
      } else {
        this.initChart();
      }
    }
  },
  data() {
    return {
      chart: null,
      option: {},
      linesData: [],
      popMsgZIndex: 10,
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

      // 处理消息显示数据格式
      let msgSeries = [];
      this.colorList.forEach(color => {
        msgSeries.push({
          type: "effectScatter",
          coordinateSystem: "geo",
          z: this.popMsgZIndex,
          data: [],
          symbolSize: 10 * this.scale,
          label: {
            normal: {
              show: true,
              formatter: function(params) {
                const msg = params.data;

                // // 截取字符串
                // const num = msg.operator.length > 12 ? msg.operator.length : 12;
                // let appName = '';
                // for(let i = 0; i <= msg.appName.length/num; i++){
                //   appName += msg.appName.substring(i*num, (i+1)*num) + '\n';
                // }
                // let matter = '';
                // for(let i = 0; i <= msg.matter.length/num; i++){
                //   matter += msg.matter.substring(i*num, (i+1)*num) + '\n';
                // }

                // return `{fline|用户：${msg.operator}}\n{tline|系统：${msg.appName}}{tline|${msg.action}：${msg.matter}}`;
                return `{tline|用户：${msg.operator}}\n{tline|使用系统：${msg.appName}}`;
              },
              position: "top",
              backgroundColor: color,
              padding: [0, 0],
              borderRadius: 3 * this.scale,
              lineHeight: 24 * this.scale,
              color: "#ffffff",
              rich: {
                fline: {
                  padding: [
                    0,
                    10 * this.scale,
                    5 * this.scale,
                    10 * this.scale
                  ],
                  color: "#ffffff"
                },
                tline: {
                  padding: [0, 10 * this.scale, 0, 10 * this.scale],
                  color: "#ffffff"
                }
              }
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            color
          }
        });
      });

      var planePath =
        "path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705";

      this.option = {
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
          ...msgSeries,
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
          }
        ]
      };

      this.chart.setOption(this.option, true);

      // 测试数据-建议保留做调试
      // const timer = setInterval(() => {
      //   var runidx = Math.floor(Math.random() * 3);
      //   this.option.series[runidx].data = [
      //     {
      //       name: "",
      //       operator: "测试内容",
      //       appName: "",
      //       matter: "",
      //       value: [108.467414, 23.055856] // 坐标
      //     }
      //   ];
      //   if(this.chart){
      //     this.chart.setOption(this.option, true);
      //   }
      // }, 3000);
    },
    getMsg() {
      if (!this.popupMsg){
        this.clearAllMsg();
        return
      }

      // 弹窗配置
      const index = Math.floor(Math.random() * this.colorList.length);
      if (this.popMsgZIndex > 9999) {
        this.popMsgZIndex = 10;
      }
      this.popMsgZIndex += 1;
      this.option.series[index].z = this.popMsgZIndex; // 新消息永远置于顶层
      this.option.series[index].data = [
        {
          name: "",
          operator: this.popupMsg.operator,
          appName: this.popupMsg.appName,
          action: this.popupMsg.action,
          matter: this.popupMsg.matter,
          value: [this.popupMsg.longitude, this.popupMsg.latitude, 5] // 坐标
        }
      ];

      // 飞线配置
      let linesSeries = this.option.series.find(e => e.type === 'lines');

      const fromCoord = this.popupMsg.operationType === 1 ? [108.467414, 23.055856] : [this.popupMsg.longitude, this.popupMsg.latitude];
      const toCoord = this.popupMsg.operationType === 1 ? [this.popupMsg.longitude, this.popupMsg.latitude] : [108.467414, 23.055856];

      linesSeries.data = [
        [{ coord: fromCoord  },{ coord: toCoord }]
      ];      

      linesSeries.effect.color = this.colorList[index];

      // 返回当前消息
      this.$emit("msg-popup", this.popupMsg);

      if (this.chart) {
        this.chart.setOption(this.option, true);
      }
    },
    clearAllMsg(){
      this.linesData = [];
      this.option.series.forEach(e => {
        if(e.type === 'effectScatter' || e.type === 'lines'){
          e.data = [];
        }
      })
    }
  }
};
</script>
