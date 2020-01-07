<template>
  <!-- eslint-disable -->
  <div class="statistics-screen-header">
    <div class="statistics-screen-header-left">
      <span class="statistics-screen-header__home" @click="$router.go(-1)">
          <i class="el-icon-arrow-left mr-5"></i><span>返回</span>
        </span>
    </div>
    <div class="statistics-screen-header__title">{{ title }}</div>
    <div class="statistics-screen-header-right">
      <span class="statistics-screen-header__time">{{ currentTime }}</span>
      <span class="statistics-screen-header__line">|</span>
      <span class="statistics-screen-header__date">{{ currentDate }}</span>
      <span class="statistics-screen-header__week">{{ currentWeek }}</span>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "StatisticsScreenHeader",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      currentTime: "",
      currentDate: "",
      currentWeek: "",
      timer: null
    };
  },
  created() {
    this.setCurrentTime();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    // 配置当前时间
    setCurrentTime() {
      const dateTime = new Date();
      this.currentDate = this.dateFormat(dateTime);
      this.currentWeek = this.weekFormat(dateTime.getDay());
      this.currentTime = this.timeFormat(dateTime);

      // 实时更新时间
      this.timer = setInterval(() => {
        this.currentTime = this.timeFormat(new Date());
      }, 1000);
    },
    // 日期格式化
    dateFormat(dateTime) {
      return (
        dateTime.getFullYear() +
        "/" +
        (dateTime.getMonth() + 1).toString().padStart(2, "0") +
        "/" +
        dateTime
          .getDate()
          .toString()
          .padStart(2, "0")
      );
    },
    // 时间格式化
    timeFormat(dateTime) {
      return (
        dateTime
          .getHours()
          .toString()
          .padStart(2, "0") +
        ":" +
        dateTime
          .getMinutes()
          .toString()
          .padStart(2, "0") +
        ":" +
        dateTime
          .getSeconds()
          .toString()
          .padStart(2, "0")
      );
    },
    // 星期格式化
    weekFormat(weeknum) {
      switch (weeknum) {
        case 0:
          return "星期日";
        case 1:
          return "星期一";
        case 2:
          return "星期二";
        case 3:
          return "星期三";
        case 4:
          return "星期四";
        case 5:
          return "星期五";
        case 6:
          return "星期六";
        default:
          return "暂无数据";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/statistics-screen.scss";
$header-height: 40rem * $baseUnit;
.statistics-screen {
  &-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    color: #0bb0ff;
    width: 100%;
    border-bottom: 1px solid #0951a2; 
    // @include background-setting(
    //   "../../../assets/images/headright.png",
    //   100%,
    //   65rem * $baseUnit
    // );
    background: #09166f;
    height: $header-height;
    line-height: $header-height;
    overflow: hidden;

    &-left {
      position: absolute;
      top: 0;
      left: 10rem * $baseUnit;
      color: #39d6fe;
      align-items: center;
    }

    &-right {
      position: absolute;
      top: 0;
      right: 10rem * $baseUnit;
      color: #39d6fe;
      align-items: center;
      justify-content: flex-end;
    }

    &__title {
      font-weight: bold;
      text-align: center;
      font-size: 22rem * $baseUnit;
    }

    &__home {
      font-weight: bold;
      font-size: 14rem * $baseUnit;
      cursor: pointer;
      i{
        font-size: 16rem * $baseUnit;
      }

      &:hover{
        color: $color-yellow;
      }
    }

    &__time {
      font-weight: bold;
      margin-right: 15rem * $baseUnit;
      font-size: 18rem * $baseUnit;
    }

    &__line {
      font-size: 18rem * $baseUnit;
      color: #00f2ff;
      padding-right: 10rem * $baseUnit;
      margin-right: 10rem * $baseUnit;
    }

    &__date {
      font-size: 14rem * $baseUnit;
      margin-right: 30rem * $baseUnit;
    }

    &__week{
      font-size: 14rem * $baseUnit;
    }
  }
}
</style>
