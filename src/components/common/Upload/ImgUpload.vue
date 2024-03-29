<template>
  <!-- eslint-disable -->
  <div class="img-upload-container">
    <!-- 图片列表 -->
    <div class="img-upload">
      <el-upload
        class="img-upload__btn"
        ref="imgUpload"
        drag
        multiple
        list-type="picture-card"
        action="/"
        :file-list="imgList"
        :http-request="handleUpload"
        :before-upload="beforeUpload"
      >
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <div class="file-upload-text" v-if="file.status === 'ready'">上传中...</div>
          <div class="file-upload-text" v-if="file.status === 'fail'">上传失败</div>
          <div class="img-shade" v-if="file.status === 'success'">
            <img class="img-shade-thumbnail" :src="file.url ? file.url : defaultImg" @error="setDefaultImg" />
            <div class="img-shade-actions">
              <span v-if="canPreview" class="img-shv-if=ade-preview" @click="preview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span v-if="canDownload" @click="download(file)">
                <i class="el-icon-download"></i>
              </span>
              <span @click="del(file)">
                <i class="el-icon-delete"></i>
              </span>
            </div>
          </div>
          <!-- progress换成request请求才有用 -->
          <el-progress
            v-if="file.status === 'uploading'"
            type="circle"
            :stroke-width="3"
            :percentage="parsePercentage(file.percentage)"
          ></el-progress>
        </div>
      </el-upload>
      <!-- 提示 -->
      <div class="img-upload__tip">
        <span v-if="sizeHint && showSizeHint">建议上传尺寸： {{ sizeHint }}，</span>
        <span v-if="fileFormat">文件格式：{{ fileFormat }}，</span>
        <template v-if="showFileSize">
          文件大小：
          <span>{{ getSize(fileSize) }}</span>以内
        </template>
      </div>
    </div>
  </div>
</template>
<script>

// mixins
import UploadMixins from "mixins/upload.js";
import { Message } from 'element-ui'

function defaultFormat(file) {
  // 文件格式
  if (
    !(
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/gif"
    )
  ) {
    Message.warning("图片只能是 png 、jpg 、gif 格式");
    return false;
  }
  return true;
}

export default {
  name: "ImgUpload",
  mixins: [UploadMixins],
  props: {
    // 所有图片列表
    imgList: {
      type: Array,
      default: () => []
    },
    // 是否显示尺寸提示文本
    showSizeHint: {
      type: Boolean,
      default: true
    },
    // 上传尺寸提示文本
    sizeHint: {
      type: String,
      default: "100*100px"
    },
    // 是否显示文件大小提示文本
    showFileSize: {
      type: Boolean,
      default: true
    },
    // 图片文件大小限制，单位以上KB
    fileSize: {
      type: Number,
      default: 150
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
    },
    // 上传要附带的额外参数
    data: {
      type: Object,
      default: () => {}
    },
    // 文件格式
    fileFormat: {
      type: String,
      default: "png / jpg / gif"
    },
    // 检查上传文件格式
    onCheckFormat: {
      type: Function,
      default: defaultFormat
    }
  },
  computed:{
    fileList(){
      return this.imgList;
    }
  },
  data() {
    return {
      uploadList: []
    };
  },
  methods: {
    parsePercentage(val) {
      return parseInt(val, 10);
    },
  }
};
</script>
<style scoped lang="scss">
@mixin img-frame {
  border-radius: 4px;
  text-align: center;
  width: 100px;
  height: 100px;
  background: transparent;
  //   line-height: 100px;
}

.img-upload {
  &__btn {
    cursor: pointer;

    ::v-deep .el-upload-dragger {
      @include img-frame;
      border: none;
    }

    ::v-deep .el-upload--picture-card {
      @include img-frame;
      border: 1px dashed #dcdfe6;
      margin: 0 8px 15px 0;
      line-height: 100px;

      &:hover {
        border-color: $color-primary;
        .el-icon-plus {
          color: $color-primary;
        }
      }

      i {
        font-size: 14px;
      }
    }

    ::v-deep .el-upload-list__item {
      @include img-frame;
      transition: none !important;
      border: 1px solid #dcdfe6;

      &:hover {
        border-color: $color-primary;
        .img-shade-actions {
          opacity: 1;
        }
      }
    }

    ::v-deep .el-progress {
      width: 80px !important;
      height: 80px !important;
    }

    ::v-deep .el-progress-circle {
      width: 80px !important;
      height: 80px !important;
    }
  }

  &__tip {
    font-size: 12px;
    line-height: 16px;
    // margin-top: 10px;
    color: #ed3f14;
  }
}

.file-upload-text {
  @include img-frame;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.img-shade {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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

