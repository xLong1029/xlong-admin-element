<template>
  <div :class="{'hidden':hidden}" class="pagination-container clearfix">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
/* eslint-disable */
import { scrollTo } from "@/utils/scroll-to";

export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [20, 30, 50, 80];
      }
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      }
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      }
    }
  },
  methods: {
    // 切换数据条数配置时触发，返回当前页码和数据条数
    handleSizeChange(val) {
      this.$emit("pagination", this.currentPage, val);
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    // 切换页码时触发，返回当前页码和数据条数
    handleCurrentChange(val) {
      this.$emit("pagination", val, this.pageSize);
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    }
  }
};
</script>

<style scoped>
.pagination-container {
  /* background: #fff;
  padding: 20px 20px; */
}
.pagination-container.hidden {
  display: none;
}
</style>
