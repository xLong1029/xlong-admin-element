<template>
  <!-- eslint-disable -->
  <div ref="empty" class="empty-container flex" :style="{ height, width }">
    <img class="empty-image" :src="image" :style="{ height: imgHeight, width: imgWidth }" />
    <div class="empty-text">{{ text }}</div>
  </div>
</template>

<script>

export default {
  name: "Empty",
  props: {
    // 组件宽度
    width: {
      type: String,
      default: "100%"
    },
    // 组件高度
    height: {
      type: String,
      default: null
    },
    // 图片宽度
    imgWidth: {
      type: String,
      default: "80px"
    },
    // 图片高度
    imgHeight: {
      type: String,
      default: "80px"
    },
    // 空状态文本
    image: {
      type: String,
      default: require("@/assets/images/empty.png")
    },
    // 空状态文本
    text: {
      type: String,
      default: "暂无内容"
    }
  },
  mounted() {
    this.setHeight();
  },
  methods: {
    setHeight() {
      if (this.height) return;

      const height =
        this.$refs.empty.parentElement.style.height ||
        this.$refs.empty.parentElement.clientHeight;
      if (height) {
        if (
          this.$refs.empty.parentElement.style.height != "" &&
          this.$refs.empty.parentElement.style.height != null &&
          this.$refs.empty.parentElement.style.height != undefined
        ) {
          this.$refs.empty.style.height = this.$refs.empty.parentElement.style.height;
        } else {
          this.$refs.empty.style.height =
            this.$refs.empty.parentElement.clientHeight + "px";
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.empty-container {
  padding: 20px;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .empty-text {
    color: $dark-gray;
    margin-top: 10px;
    font-size: 14px;
  }
}
</style>
