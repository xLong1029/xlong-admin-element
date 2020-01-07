<template>
  <!-- eslint-disable -->
  <div class="statistics-progress-container">
    <span class="statistics-progress-title">{{ title }}：</span>
    <el-progress
      class="statistics-progress-bar"
      :text-inside="true"
      :stroke-width="14"
      :percentage="rate"
      color="#906bf9"
    />
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "StatisticsProgress",
  props: {
    // 标题
    title: {
      type: String,
      default: ""
    },
    // 百分比数值
    rate: {
      type: Number,
      default: 0
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/statistics-screen";
.statistics-progress {
  &-title {
    float: left;
    width: 20%;
    margin-right: 1%;
    font-size: 15rem *$baseUnit;
    display: block;
  }

  &-bar {
    width: 79%;
    float: left;

    /deep/ .el-progress-bar__outer{
      background: #000a23;
    }
  }
}
</style>
