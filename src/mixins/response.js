export default {
  data() {
    return {
      /**
       * 响应式配置
       */
      pageH: 0,
      pageW: 0,
      // 设计稿高宽
      design: {
        width: 1909,
        height: 1076
      },
      // 宽高比
      widthHeightRatio: 1,
      // 字体可缩放的最小尺寸
      minWidth: 1400,
      minHidth: 820,
      // 实际开发与设计稿比率
      contrastRadio: 1
    }
  },
  mounted() {
    this.$_initResizeEvent()
  },
  beforeDestroy() {
    this.$_destroyResizeEvent()
  },
  methods: {
    $_initResizeEvent() {
      window.addEventListener('resize', this.$_resizeHandler)
    },
    $_destroyResizeEvent() {
      window.removeEventListener('resize', this.$_resizeHandler)
    },
    /**
     * 初始化大屏字体，用于配置响应式
     */
    $_resizeHandler() {
      this.widthHeightRatio = this.design.width / this.design.height

      let docW = document.body.clientWidth
      let docH = document.body.clientHeight

      this.pageH = docH

      docW = docW > this.design.width ? this.design.width : docW
      docH = docH > this.design.height ? this.design.height : docH

      // 制定html根字体大小
      if (docW / docH > this.widthHeightRatio) {
        this.contrastRadio =
          docH < this.minHidth ? 0.76 : docH / this.design.height // 以高度为基准制定
      } else {
        this.contrastRadio =
          docW < this.minWidth ? 0.76 : docW / this.design.width // 以宽度为基准制定
      }

      document.getElementsByTagName('html')[0].style.fontSize =
        this.contrastRadio * 100 + 'px'
    }
  }
}
