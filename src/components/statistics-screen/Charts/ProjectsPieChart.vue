
<template>
  <div :ref="className" :class="className" :style="{ height, width }" />
</template>

<script>
/* eslint-disable */
// 参考地址：https://gallery.echartsjs.com/editor.html?c=xduIDV_7VM
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/mixins/chart/resize'
export default {
  name: 'ProjectsPieChart',
  mixins: [resize],
  props: {
    // 图表名称
    title: {
      type: String,
      default: ''
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
        '#45FBF7',
        '#48FF58',
        '#EAE809',
        '#FF7E3F',
        '#FF4746',
        '#E177F9',
        '#4E6BFF',
        '#5EA6FE'
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
      default: 'transparent' // "#000a25"
    },
    // 字体基数
    scale: {
      type: Number,
      default: 1
    },
    // 类名
    className: {
      type: String,
      default: 'chart'
    },
    // 宽度
    width: {
      type: String,
      default: '100%'
    },
    // 高度
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      option: null,
      timer:null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null

    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs[this.className])

      this.option = {
        backgroundColor: this.background,
        legend: {
          type: 'scroll',
          bottom: 30 * this.scale,
          itemWidth: 16,
          itemHeight: 8,
          textStyle: {
            color: '#A3E2F4',
            fontSize: 14 * this.scale,
            fontWeight: 0
          }
        },
        title: {
          text: this.chartData.title,
          textStyle: {
            color: '#ffffff',
            fontSize: 12 * this.scale
          },
          top: '8%'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10
        },
        series: [
          {
            type: 'pie',
            radius: [0, 120 * this.scale],
            label: {
              normal: {
                formatter: '{c}',
                fontSize: 12 * this.scale
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            itemStyle: {},
            data: this.appendBaseColor(this.chartData, this.colorList, 0.6)
          }
        ]
      }
      this.chart.setOption(this.option)
      if (this.carousel) {
        this.startLoopMove()
      }
    },
    appendBaseColor(dataList, colorList, opacity) {
      const temp = []
      for (let i in dataList) {
        const tempObj = {
          ...dataList[i],
          itemStyle: {
            color: colorList[i],
            opacity: opacity
          }
        }
        temp.push(tempObj)
      }
      return temp
    },
    startLoopMove() {
      let idx = 0
      this.timer =  setInterval(() => {
        this.clearSelectedStatus()
        this.option.series[0].data[idx]['selected'] = true
        this.option.series[0].data[idx]['itemStyle']['opacity'] = 1
        if (this.chart) {
          this.chart.setOption(this.option)
        }
        idx++
        if (idx >= this.chartData.length) {
          idx = 0
        }
      }, 1000)
    },
    clearSelectedStatus() {
      this.option.series[0].data = this.appendBaseColor(
        this.chartData,
        this.colorList,
        0.6
      )
      if (this.chart) {
        this.chart.setOption(this.option)
      }
    }
  }
}
</script>
