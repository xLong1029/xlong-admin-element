export default {
  data() {
    return {
      // 表格高度
      tableHeight: "500",
      // 全选选项列表
      selectList: [],
    };
  },
  methods: {
    /**
     * 设置表格固定高度
     *
     * @param {*} tableReduceH 缩减高度
     */
    setTableHeight(tableReduceH) {
      const windowH = window.innerHeight;
      if (this.tableHeight) {
        this.tableHeight = windowH - tableReduceH;
      }
    },
    /**
     * 获取选项id
     *
     * @param {*} selection 选项
     */
    getSelectList(selection) {
      // 清空选项列表
      this.clearSelect();
      for (let i = 0; i < selection.length; i++) {
        this.selectList.push(selection[i].id);
      }
    },
    /**
     * 清空选项
     */
    clearSelect() {
      this.selectList = [];
    },
    /**
     * 搜索
     */
    search() {
      this.getList(1, this.page.pageSize);
    },
    /**
     * 重置
     */
    reset() {
      this.filterParams = { ...this.defaultParams };
      this.clearSelect();
      this.getList(1, this.page.pageSize);
    },
    /**
     * 添加
     *
     * @param {*} params 参数
     */
    add(params) {
      this.apiAdd(params)
        .then((res) => {
          const { code, message } = res;
          if (code == 200) {
            this.$message.success("新增成功!");
            this.getList(1, this.page.pageSize);
          } else this.$message.warning(message);
        })
        .catch((err) => console.log(err));
    },
    /**
     * 编辑
     *
     * @param {*} params 参数
     */
    edit(params) {
      this.apiEdit(params)
        .then((res) => {
          const { code, message } = res;
          if (code == 200) {
            this.$message.success("编辑成功!");
            this.getList(this.page.pageNo, this.page.pageSize);
          } else this.$message.warning(message);
        })
        .catch((err) => console.log(err));
    },
    /**
     * 删除
     */
    del() {
      this.delLoading = true;
      this.apiDelete()
        .then((res) => {
          const { code, message } = res;
          if (code == 200) {
            this.$message.success("删除成功!");
            this.getList(this.page.pageNo, this.page.pageSize);
            this.clearSelect();
          } else this.$message.warning(message);
        })
        .catch((err) => console.log(err))
        .finally(() => (this.delLoading = false));
    },
    /**
     * 启、禁用
     *
     * @param {*} enabledState 1 启用 -1 禁用
     */
    enableOrDisable(enabledState) {
      enabledState === 1
        ? (this.enableLoading = true)
        : (this.disableLoading = true);
      this.apiEnable(enabledState)
        .then((res) => {
          const { code, message } = res;
          if (code == 200) {
            this.$message.success("操作成功!");
            this.getList(this.page.pageNo, this.page.pageSize);
            this.clearSelect();
          } else this.$message.warning(message);
        })
        .catch((err) => console.log(err))
        .finally(() =>
          enabledState === 1
            ? (this.enableLoading = false)
            : (this.disableLoading = false)
        );
    },
  },
};
