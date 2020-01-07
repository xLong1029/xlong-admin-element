<template>
  <!-- eslint-disable -->
  <div ref="sidetree" class="sidetree-container" :style="{ minWidth, width }">
    <div class="sidetree-title" @click="handleClickTitle">
      <span>{{ title }}</span>
      <span v-if="total >= 0">（{{ total }}）</span>
    </div>
    <div ref="sidetreeListWrapper" class="sidetree-list" :style="{ minHeight, maxHeight: height }">
      <el-tree
        ref="tree"
        :data="list"
        :node-key="nodeKey"
        :current-node-key="currentNodeKey"
        :default-expanded-keys="defaultExpandedKeys"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import { addClass, removeClass, getScrollTop } from "@/utils";

export default {
  name: "SideTree",
  props: {
    // 侧边菜单列表
    list: {
      type: Array,
      default: () => []
    },
    // 侧边菜单顶部标题
    title: {
      type: String,
      default: "全部信息"
    },
    // 侧边栏显示数据总数，默认值为-1(不显示)，否则显示对应数量
    total: {
      type: Number,
      default: -1
    },
    // 默认展开的节点的 key 的数组
    defaultExpandedKeys: {
      type: Array,
      default: null
    },
    // 当前选中的节点
    currentNodeKey: {
      type: String | Number,
      default: null
    },
    // 是否根据滚动固定位置
    isFixed: {
      type: Boolean,
      default: true
    },
    // 高度
    height: {
      type: String,
      default: "auto"
    },
    // 最小高度
    minHeight: {
      type: String,
      default: "auto"
    },
    // 宽度
    width: {
      type: String,
      default: "250px"
    },
    // 最小宽度
    minWidth: {
      type: String,
      default: "250px"
    },
    // 属性配置
    defaultProps: {
      type: Object,
      default: () => ({
        children: "children",
        label: "name"
      })
    },
    // 节点唯一标识
    nodeKey: {
      type: String,
      default: 'path'
    }
  },
  watch: {
    currentNodeKey(val){
      this.$refs.tree.setCurrentKey(val);
    },
    // defaultExpandedKeys(vals){
    //   if(!vals.length) return false;

    //   vals.forEach(val => {
    //     const node = this.$refs.tree.store.root.childNodes.find(e => e[this.nodeKey] === val);
    //     node.expanded = true;
    //   });
    // }
  },
  mounted() {
    if (this.isFixed) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  beforeDestroy() {
    if (this.isFixed) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  },
  methods: {
    // 滚动事件
    handleScroll() {
      const scrollTop = getScrollTop();
      const listContent = document.querySelector(".sidetree-layout__right");
      if (scrollTop > 260) {

        if (
          listContent &&
          listContent.offsetHeight >= this.$refs.sidetree.offsetHeight
        ) {
          addClass(this.$refs.sidetree, "fixed");
          addClass(listContent, "fixed");
          return;
        }
      }
      removeClass(this.$refs.sidetree, "fixed");
      removeClass(this.$refs.sidetree, "fixed");
    },
    // 选择菜单标题时触发，返回字符串'all'，表示需要请求全部数据
    handleClickTitle() {
      // 收起全部树形 this.$refs.tree.store._getAllNodes() 不管用
      let childNodes = this.$refs.tree.store.root.childNodes;
      for (var i = 0; i < childNodes.length; i++) {
        childNodes[i].expanded = false;
      }
      this.$refs.tree.setCurrentKey(null);
      this.$emit("title-click", "all");
    },
    // 节点被点击时的回调
    handleNodeClick(res) {
      this.$emit("node-click", res);
    }
  }
};
</script>
<style lang="scss" scoped>
.sidetree {
  &-container {
    position: relative;
    width: 250px;
    min-width: 250px;
    transition: 0.3 position ease-in-out;
    transition: 0.3 top ease-in-out;

    &.fixed {
      position: fixed !important;
      top: 15px;

      .sidetree-list {
        /* 225 = sidetree-title + padding + footer */
        max-height: calc(100vh - 225px);
        // height: calc(100vh - 78px);
      }
    }
  }

  &-list {
    overflow: auto;
    border-radius: 0 0 4px 4px;
    border-left: $border;
    border-right: $border;
    border-bottom: $border;
    background: #fff;
    padding: 10px;
    /* 266 = sidetree-title + padding-top + topbar + navbar + breadcrumb */
    // height: calc(100vh - 266px);

    /deep/ .el-tree-node {
      padding: 2px 0;
      &:focus > .el-tree-node__content {
        background: transparent; // 与当前激活状态有冲突，因此改为透明
      }

      &.is-current > .el-tree-node__content {
        background: #f6f7f9;
        color: #333;
        border-left: 3px solid #ffba00;
      }
    }

    /deep/ .el-tree-node__content {
      padding: 5px 0;
      height: auto;
    }
  }

  &-title {
    border-radius: 4px 4px 0 0;
    font-size: 16px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    color: #fff;
    background: $color-primary;
    cursor: pointer;
  }
}
</style>
