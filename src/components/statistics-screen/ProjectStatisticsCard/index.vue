<template>
  <!-- eslint-disable -->
  <div class="project-statistics-card-container">
    <div class="project-statistics-card-count">
      <div class="mb-5">受理总数</div>
      <span class="num">{{ count }}</span>
    </div>
    <div class="project-statistics-card-finish">办理完结：{{ finish }}</div>
  </div>
</template>

<script>


export default {
    name: 'ProjectStatisticsCard',
    props: {
      // 总数
      count: {
        type: String | Number,
        default: 0
      },
      // 已完成数
      finish: {
        type: String | Number,
        default: 0
      }
    }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/statistics-screen";
.project-statistics-card{
  &-count,
  &-finish{
    color: #fff;
    padding: 5rem*$baseUnit;
  }

  &-count{
    color: #32ffff;
    .num{
      font-size: 30rem*$baseUnit;
      font-weight: bold;
    }
  }

  &-finish{

    font-weight: bold;
  }
}
</style>
