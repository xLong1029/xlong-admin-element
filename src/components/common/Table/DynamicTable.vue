<template>
  <!-- eslint-disable -->
  <div class="dynamic-table-container">
    <template v-if="tableHeader.length">
      <el-table
        ref="table"
        :data="tableData"
        :height="tableHeight"
        :row-class-name="rowClassName"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <template v-for="(item, index) in tableHeader">
          <el-table-column
            :key="'columns' + index"
            :fixed="item.fixed"
            :align="item.align"
            :header-align="item.headerAlign"
            :prop="item[defaultProps.prop]"
            :label="item[defaultProps.label]"
            :show-overflow-tooltip="true"
            :width="item.width"
          ></el-table-column>
        </template>
        <slot />
      </el-table>
    </template>
    <empty v-else :height="tableHeight + 'px'" />
    <!-- 分页 -->
    <pagination
      class="page-list mt-20"
      v-show="total > 0 && showPagination"
      :total="total"
      :page.sync="currentPage"
      :limit.sync="limit"
      :pageSizes.sync="pageSizes"
      :auto-scroll="false"
      @pagination="handlePageChange"
    />
  </div>
</template>

<script>
/* eslint-disable */
import Pagination from "@/components/common/Pagination";
import Empty from "@/components/common/Empty";
import Page from "@/mixins/page.js";

export default {
  name: "DynamicTable",
  components: { Pagination, Empty },
  mixins: [Page],
  props: {
    // 表格表头
    // 必须保留一个值，否则无法形成滚动
    tableHeader: {
      type: Array,
      default: () => [
        {
          prop: "text",
          label: "表头",
          fixed: true
        }
      ]
    },
    // 表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 表格高度
    tableHeight: {
      type: String | Number,
      default: "auto"
    },
    // 判断是否有详情可显示
    hasDetail: {
      type: Boolean,
      default: false
    },
    // 是否显示页码
    showPagination: {
      type: Boolean,
      default: false
    },
    // 当前页码
    pageNo: {
      type: Number,
      default: 1
    },
    // 每页记录条数
    pageSize: {
      type: Number,
      default: 1
    },
    // 当前页码
    pageSizes: {
      type: Array,
      default() {
        return [20, 30, 50, 80];
      }
    },
    // 总数
    total: {
      required: true,
      type: Number
    },
    // 属性配置
    defaultProps: {
      type: Object,
      default: () => ({
        prop: "prop",
        label: "label"
      })
    },
    rowClassName: {
      type: Function | String
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.pageNo;
      },
      set(val) {
        this.$emit("update:pageNo", val);
      }
    },
    limit: {
      get() {
        return this.pageSize;
      },
      set(val) {
        this.$emit("update:pageSize", val);
      }
    }
  },
  methods: {
    // 页码切换时触发，返回当前页码和每页记录条数
    handlePageChange(page, pageSize) {
      this.$emit("pagination", page, pageSize);
    },
    // 选择框切换时触发，返回所有选项
    handleSelectionChange(selection) {
      this.$emit("selection-change", selection);
    }
  }
};
</script>

<style lang="scss" scoped>
.dynamic-table-container {
  .page-list {
    text-align: center;
    width: 100%;
  }
}
</style>