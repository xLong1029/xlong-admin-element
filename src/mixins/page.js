/* eslint-disable */
export default {
  data() {
    return {
      // 列表加载
      listLoading: false,
      // 分页配置
      page: {
        // 当前页面
        pageNo: 1,
        // 每页条数
        pageSize: 20,
        // 每页条数选择
        pageSizes: [20, 30, 50, 80],
        // 总数
        total: 0
      }
    }
  },
  methods: {
    /**
     * 获取列表内容
     *
     * @param {*} pageNo 当前页码
     * @param {*} pageSize 每页条数
     */
    getList(pageNo, pageSize) {
      this.page.pageNo = pageNo;
      this.page.pageSize = pageSize;

      this.listLoading = true;
      this.apiGetList(pageNo, pageSize).then(res => {
        this.listLoading = false;
        this.listData = res.custom.data;
        this.setPage(res.custom);
      }).catch(err => console.log(err));
    },
    /**
     * 配置页码
     *
     * @param {*} data 数据
     */
    setPage(data) {
      this.page.pageNo = data.page;
      this.page.pageSize = data.pageSize;
      this.page.total = data.totalCount;
    }
  }
}
