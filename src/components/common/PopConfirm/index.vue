<template>
<!-- eslint-disable -->
  <el-popover placement="top" width="160" v-model="visible">
    <p>
      <i class="el-icon-warning" style="color:#E6A23C;font-size: 16px;"></i>
      &nbsp;{{ title }}
    </p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" @click="$emit('cancel');visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="$emit('confirm');visible = false">确定</el-button>
    </div>
    <slot slot="reference"></slot>
  </el-popover>
</template>
<script>

export default {
  name: "PopConfirm",
  props: {
    title: {
      type: String
    }
  },
  data() {
    return {
      visible: false
    };
  }
};
</script>
<style scoped lang="scss"></style>

