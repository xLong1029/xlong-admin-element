<template>
  <!-- eslint-disable -->
  <div class="background-upload-container">
    <div class="img-upload">
      <ul class="img-default-list">
        <li
          v-for="(item, index) in imgList"
          :key="'default-img' + index"
          class="img-default-list__item"
          :class="{ 'is-active': imgSelectIndex === index}"
          @click="selectImg(index)"
        >
          <div class="img-shade">
            <img class="img-shade-thumbnail" :src="imgBaseUrl + item.url" />
            <div class="img-shade-actions">
              <span class="img-shade-preview" @click="imgUploadCardPreview(item)">
                <i class="el-icon-zoom-in"></i>
              </span>
            </div>
          </div>
        </li>
        <li>
          <el-upload
            class="img-upload__btn"
            :action="uploadSettings.action"
            :data="uploadSettings.data"
            :headers="uploadSettings.headers"
            :accept="uploadSettings.accept"
            :before-upload="imgBeforeUpload"
            :on-progress="imgUploadProgress"
            :on-preview="imgUploadCardPreview"
            :on-success="imgUploadSuccess"
            :on-error="imgUploadError"
            :show-file-list="false"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </li>
      </ul>
      <div class="img-upload__tip">建议上传尺寸：285*150px，文件格式：png / jpg / gif，文件大小：500kb以内</div>
      <el-progress
        class="img-upload__progress"
        v-show="imgProgress.visible"
        :percentage="imgProgress.percentage"
        color="#409eff"
      ></el-progress>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { getToken } from "@/utils/auth";

const VUE_APP_SERVER_API = process.env.VUE_APP_SERVER_API;

export default {
  name: "BackgroundUpload",
  props: {
    // 图片上传配置
    uploadSettings: {
      type: Object,
      default: () => ({
        action: VUE_APP_SERVER_API + "/api/upload",
        accept: ".png,.jpg,.jpeg,.gif",
        headers: {
          Authorization: "Bearer " + getToken()
        },
        data: {}
      })
    },
    // 图片显示基路径
    imgBaseUrl: {
      type: String,
      default: VUE_APP_SERVER_API
    },
    // 所有图片列表
    imgList: {
      type: Array,
      default: () => []
    },
    // 当前选中索引
    imgSelectIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 上传进度
      imgProgress: {
        visible: false,
        percentage: 0
      },
    };
  },
  methods: {
    // 图片选中状态
    selectImg(index) {
      this.$emit("update:img-select-index", index);
      this.$emit("select-img", this.imgList[index].url);      
    },
    // 图片上传前
    imgBeforeUpload(file) {
      if (
        !(
          file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/gif"
        )
      ) {
        this.$message.error("图片只能是 png 、jpg 、gif 格式");
        return false;
      }
      if (file.size > 500 * 1024) {
        this.$message.error("上传图片大小不能超过 500KB");
        return false;
      }

      this.imgProgress.visible = true;
      this.imgProgress.percentage = 0;
    },
    // 图片上传成功
    imgUploadSuccess(res) {
      this.imgProgress.visible = false;
      if (res.status.code === 1) {
        const url = res.custom[0].localUrl;

        const foundImg = this.imgList.find(e => e.url === url);
        if (!foundImg) {
          // 添加至图片列表
          this.imgList.push({ url });
          // 默认选中上传图片
          const activeIndex = this.imgList.length - 1;
          this.$emit("update:img-select-index", activeIndex);
          this.$emit("upload-success", url);
          this.$message.success("图片上传成功");
        } else {
          const activeIndex = this.imgList.findIndex(e => e.url === url);
          this.$emit("update:img-select-index", activeIndex);
          this.$message.warning("图片已存在");
        }
        this.$emit("update:img-list", this.imgList);
      } else {
        this.$message.error(res.status.text);
      }
    },
    // 图片上传错误
    imgUploadError(file) {
      this.imgProgress.visible = false;
      this.$message.error("图片上传失败！请重试");
    },
    // 图片上传进度
    imgUploadProgress(res) {
      this.imgProgress.percentage = Math.floor(res.percent);
    },
    // 预览图片
    imgUploadCardPreview(file) {
      this.$emit("preview", file);
    }
  }
};
</script>
<style scoped lang="scss">
.background-upload-container {
}

@mixin img-frame {
  border: 1px dashed #dcdfe6;
  border-radius: 4px;
  text-align: center;
  width: 134px;
  height: 75px;
}

.img-upload {
  &__btn {
    @include img-frame;
    line-height: 75px;

    /deep/ .el-upload {
      width: 100%;
      height: 100%;
    }

    &:hover {
      border-color: $color-primary;
    }
  }

  &__progress {
    // @include img-upload-frame;
  }

  &__tip {
    font-size: 12px;
    line-height: 16px;
    margin-top: 10px;
  }

  .img-default {
    &-list {
      width: 100%;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      &__item {
        @include img-frame;
        border: 1px solid #dcdfe6;
        margin: 0 10px 10px 0;
        cursor: pointer;
        overflow: hidden;

        &:hover {
          border-color: $color-primary;
          .img-shade-actions {
            opacity: 1;
          }
        }

        &.is-active {
          padding: 5px;
          border-color: $color-primary;
          .img-shade-actions{
            line-height: 65px;
          }
        }
        &-img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

.img-shade {
  position: relative;
  width: 100%;
  height: 100%;

  &-thumbnail {
    width: 100%;
    height: 100%;
    // cursor: pointer;
  }

  &-actions {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    line-height: 75px;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    i {
      cursor: pointer;
      // margin: 0 20px;
    }
  }
}
</style>

