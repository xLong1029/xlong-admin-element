/* eslint-disable */
export default {
  data() {
    return {
      // 表格高度
      tableHeight: '500',
    }
  },
  methods: {
    setTableHeight(tableReduceH) {
      const windowH = window.innerHeight;
      if (this.tableHeight) {
        this.tableHeight = windowH - tableReduceH;
      }
    },
  }
}
