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
        pageSize: 15,
        // 每页条数选择
        pageSizes: [15, 30, 50, 80],
        // 总数
        total: 1,
      },
    };
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
      this.apiGetList(pageNo, pageSize)
        .then((res) => {
          this.listLoading = false;

          const { code, data, message } = res;
          if (code === 200) {
            this.listData = data.list;
            this.setPage(data.page);
          } else this.$message.warning(message);
        })
        .catch((err) => console.log(err));
    },
    /**
     * 配置页码
     *
     * @param {*} data 数据
     */
    setPage(data) {
      this.page.pageNo = data.page;
      this.page.pageSize = data.size;
      this.page.total = data.count;
    },
  },
};
