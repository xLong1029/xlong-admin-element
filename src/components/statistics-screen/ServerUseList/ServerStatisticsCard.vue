<template>
  <!-- eslint-disable -->
  <div class="server-statistics-card-container flex">
    <div class="server-statistics-card-title" :style="{ color: titleColor }">{{ title }}</div>
    <div class="server-statistics-card-content" :style="{ color: contentColor }">
      <span>{{ content }}</span>
      <span v-if="unit && unit !=''">{{ unit }}</span>
    </div>
  </div>
</template>

<script>


export default {
    name: 'ServerStatisticsCard',
    props: {
      // 标题
      title: {
        type: String,
        default: ''
      },
      // 标题颜色
      titleColor: {
        type: String,
        default: ''
      },
      // 文本颜色
      contentColor: {
        type: String,
        default: ''
      },
      // 文本内容
      content: {
        type: String | Number,
        default: ''
      },
      // 单位
      unit: {
        type: String,
        default: ''
      }
    }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/statistics-screen";
.server-statistics-card{
  &-container{
    @include background-setting("../../../assets/screen_images/img_shiyong_2.png", 190rem * $baseUnit, 52rem * $baseUnit);
    margin-left: 20rem*$baseUnit;
    line-height: 52rem * $baseUnit;
    justify-content: center;
  }

  &-title,
  &-content{
    text-align: center;
     color: #99dced;
     padding: 5rem*$baseUnit;
  }

  &-content{
    font-size: 20rem*$baseUnit;
    font-weight: bold;
  }
  &-title{
    font-size: 14rem*$baseUnit;
  }
}
</style>
