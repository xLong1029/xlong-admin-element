<template>
  <!-- eslint-disable -->
  <div class="img-list-container">
    <!-- 图片列表 -->
    <ul class="img-list">
      <li v-for="(file, index) in imgList" :key="index" class="img-list__item img-shade">
        <img
          class="img-shade-thumbnail"
          :src="file.url ? file.url : defaultImg"
          @error="setDefaultImg"
        />
        <div class="img-shade-actions">
          <span v-if="canPreview" class="img-shv-if=ade-preview" @click="preview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span v-if="canDownload" @click="download(file)">
            <i class="el-icon-download"></i>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>


const VUE_APP_SERVER_AUTH = process.env.VUE_APP_SERVER_AUTH;

export default {
  name: "ImgList",
  props: {
    // 所有图片列表
    imgList: {
      type: Array,
      default: () => []
    },
    // 是否可预览
    canPreview: {
      type: Boolean,
      default: true
    },
    // 是否可下载
    canDownload: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 缩略图预览
      thumbnailUrl: `${VUE_APP_SERVER_AUTH}/sdcapi/AttachmentManage/ShowThumbnail`,
      // 图片预览
      imgUrl: `${VUE_APP_SERVER_AUTH}/sdcapi/AttachmentManage/ShowImage`,
      defaultImg: require("@/assets/images/no-found-pic.jpg")
    };
  },
  methods: {
    // 下载图片
    download(file) {
      var a = window.document.createElement("a");
      a.download = file.filename;
      a.href = `${this.imgUrl}?id=${file.ID}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    // 预览图片
    preview(file) {
      this.$emit("preview", file);
    },
    // 设置默认图片
    setDefaultImg(e) {
      e.currentTarget.src = this.defaultImg;
      e.currentTarget.onerror = null;
    }
  }
};
</script>
<style scoped lang="scss">
@mixin img-frame {
  border-radius: 4px;
  text-align: center;
  width: 100px;
  height: 100px;
}

.img-list {
  display: flex;
  flex-wrap: wrap;
  &__item {
    @include img-frame;
    border: 1px solid #dcdfe6;
    overflow: hidden;
    margin: 0 8px 8px 0;

    &:hover {
      border-color: $color-primary;
      .img-shade-actions {
        opacity: 1;
      }
    }
  }
}

.img-shade {
  position: relative;
  @include img-frame;

  &-thumbnail {
    max-width: 100%;
    max-height: 100%;
    // cursor: pointer;
  }

  &-actions {
    position: absolute;
    width: 100%;
    // height: 100%;
    left: 0;
    top: 0;
    line-height: 100px;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    display: flex;
    justify-content: space-around;

    i {
      cursor: pointer;
      // margin: 0 20px;

      &:hover {
        color: $color-primary;
      }
    }
  }
}
</style>

