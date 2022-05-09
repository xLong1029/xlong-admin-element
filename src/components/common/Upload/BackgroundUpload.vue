<template>
  <!-- eslint-disable -->
  <div class="background-upload-container">
    <div class="img-upload">
      <ul class="img-default-list">
        <li
          v-for="(item, index) in imgList"
          :key="'default-img' + index"
          class="img-default-list__item"
          :class="{ 'is-active': imgSelectIndex === index }"
          @click="selectImg(index)"
        >
          <div class="img-shade">
            <img
              class="img-shade-thumbnail"
              :src="item.url"
              @error="setDefaultImg"
            />
            <div class="img-shade-actions">
              <span class="img-shade-preview" @click="preview(item)">
                <i class="el-icon-zoom-in"></i>
              </span>
            </div>
          </div>
        </li>
        <li>
          <el-upload
            class="img-upload__btn"
            action="customize"
            :on-progress="imgUploadProgress"
            :before-upload="imgBeforeUpload"
            :http-request="uploadBackground"
            :show-file-list="false"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </li>
      </ul>
      <div class="img-upload__tip">
        <span v-if="sizeHint">建议上传尺寸： {{ sizeHint }}，</span
        >文件格式：png / jpg / gif， 文件大小：
        <span v-if="fileSize < 1024">{{ fileSize }}kb</span>
        <span v-else>{{ Math.floor(fileSize / 1024) }}M</span>以内
      </div>
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
import UploadMixins from "mixins/upload.js";

function defaultFormat(file) {
  // 文件格式
  if (
    !(
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/gif"
    )
  ) {
    this.$message.warning("图片只能是 png 、jpg 、gif 格式");
    return false;
  }
  return true;
}

export default {
  name: "BackgroundUpload",
  mixins: [UploadMixins],
  props: {
    // 所有图片列表
    imgList: {
      type: Array,
      default: () => [],
    },
    // 当前选中索引
    imgSelectIndex: {
      type: Number,
      default: 0,
    },
    // 上传按钮尺寸提示文本
    sizeHint: {
      type: String,
      default: "100*100px",
    },
    // 图片文件大小限制，单位KB
    fileSize: {
      type: Number,
      default: 150,
    },
    // 检查上传文件格式
    onCheckFormat: {
      type: Function,
      default: defaultFormat,
    },
  },
  data() {
    return {
      // 图片上传分时
      imgAccept: ".png,.jpg,.jpeg,.gif",
      // 上传进度
      imgProgress: {
        visible: false,
        percentage: 0,
      },
    };
  },
  methods: {
    // 图片选中状态
    selectImg(index) {
      this.$emit("update:img-select-index", index);
      this.$emit("select-img", this.imgList[index].url);
    },
    // 上传背景图
    uploadBackground(options) {
      const file = options.file;

      this.uploadFileDemo(file)
        .then((res) => {
          this.imgProgress.percentage = 100;
          this.imgProgress.visible = false;

          const {
            data: { url },
          } = res;

          const foundImg = this.imgList.find((e) => e.url === url);
          if (!foundImg) {
            // 添加至图片列表
            this.imgList.push({ url });
            // 默认选中上传图片
            const activeIndex = this.imgList.length - 1;
            this.$emit("update:img-select-index", activeIndex);
            this.$emit("upload-success", url);
          } else {
            const activeIndex = this.imgList.findIndex((e) => e.url === url);
            this.$emit("update:img-select-index", activeIndex);
            this.$message.warning("图片已存在");
          }
          this.$emit("update:img-list", this.imgList);
        })
        .catch((err) => {
          console.log(err);
          this.imgProgress.visible = false;
        });
    },
    // 图片上传前
    imgBeforeUpload(file) {
      const { $message, fileSize, createUploadRecord, onCheckFormat, getSize } =
        this;

      if (name.length > 100) {
        $message.warning(`文件名称过长，请修改后重新上传`);
        return false;
      }

      const format = onCheckFormat(file);
      if (!format) return false;

      // 控制文件大小
      if (file.size / 1024 > fileSize) {
        $message.warning(`上传图片大小不能超过${getSize(fileSize)}`);
        return false;
      }

      this.imgProgress.visible = true;
      this.imgProgress.percentage = 0;
    },
    // 图片上传进度
    imgUploadProgress(res) {
      this.imgProgress.percentage = Math.floor(res.percent);
    },
  },
};
</script>
<style scoped lang="scss">
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

    ::v-deep .el-upload {
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
    color: #ed3f14;
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
          .img-shade-actions {
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

