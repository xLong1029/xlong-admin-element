/* eslint-disable */
export default {
    data() {
        return {
            // 表格高度
            tableHeight: '500',
            // 全选选项列表
            selectList: [],
        }
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
            this.getList(1, this.page.pageSize);
        },
        /**
         * 添加
         */
        add() { },
        /**
         * 删除
         */
        del() { },
        /**
         * 编辑
         *
         * @param {*} row 当前行
         */
        edit(row) { },
        /**
         * 详情
         *
         * @param {*} row 当前行
         */
        detail(row) { },
        /**
         * 启、禁用
         *
         * @param {*} type 1 启用 -1 禁用
         */
        enableOrDisable(type) { },

    }
}
