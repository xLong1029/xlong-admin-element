<template>
  <!-- eslint-disable -->
  <div class="description">
    <div class="description__title">
      <el-divider :content-position="titlePosition">{{ title }}</el-divider>
    </div>
    <div class="description__body">
      <slot />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Empty from "@/components/common/Empty";

export default {
  name: "InfoTable",
  components: { Empty },
  props: {
    // 标题
    title: {
      type: String,
      default: "标题"
    },
    // 标题位置 left | right | center
    titlePosition: {
      type: String,
      default: "left"
    }
  }
};
</script>

<style lang="scss" scoped>
.description {
  width: 100%;
  &__title {
    // margin-bottom: 20px;
    font-weight: bold;
    font-size: 16px;
    line-height: 1.5;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__body {
    min-height: 80px;
    margin-top: -25px;
    margin-bottom: 10px;
    padding:20px 20px 15px 20px;
    border-left: 1px solid #dcdfe6;
    border-right: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
  }
}
</style>