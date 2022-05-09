<template>
  <!-- eslint-disable -->
  <el-dialog
    :title="title ? title: '查看图片'"
    :visible="visible"
    :close-on-click-modal="false"
    :append-to-body="true"
    width="900px"
    @close="close"
  >
    <img class="preview-img" :src="url" @error="setDefaultImg" />
  </el-dialog>
</template>
<script>


export default {
  name: "ImgPreview",
  props: {
    // 弹窗可见性
    visible: {
      type: Boolean,
      default: true
    },
    // 图片地址
    imgUrl: {
      type: String,
      default: null
    },
    // 标题
    title: {
      type: String,
      default: "查看图片"
    }
  },
  watch: {
    imgUrl(val) {
      this.url = val;
    }
  },
  data() {
    return {
      url: null,
      defaultImg: require("@/assets/images/no-found-pic.jpg")
    };
  },
  methods: {
    close() {
      this.$emit("close", false);
      this.$emit("update:visible", false);
    },
    // 设置默认图片
    setDefaultImg(e) {
      e.currentTarget.src = this.defaultImg;
      e.currentTarget.onerror = null;
    }
  }
};
</script>
<style lang="scss" scoped>
.preview-img {
  display: block;
  max-width: 100%;
  margin: 0 auto;
}
</style>

