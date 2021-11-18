<template>
  <!-- eslint-disable -->
  <div class="file-upload-container">
    <!-- 图片列表 -->
    <div class="file-upload">
      <el-upload
        class="file-upload__btn"
        ref="fileUpload"
        drag
        multiple
        action="/"
        :file-list="fileList"
        :http-request="handleUpload"
        :before-upload="beforeUpload"
      >
        <div slot="default">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </div>
        <div slot="file" slot-scope="{file}">
          <!-- {{ file }} -->
          <div class="file-upload-text flex" v-if="file.status === 'ready'"><span>{{ file.name }}</span><span>上传中...</span></div>
          <div class="file-upload-text" v-if="file.status === 'fail'">上传失败</div>
          <div class="file-item flex" v-if="file.status === 'success'">
            <div class="file-item__left mr-10 flex">
              <div class="file-icon mr-10">
                <img
                  v-if="isImg(file)"
                  class="file-thumbnail"
                  :src="file.url ? file.url : defaultImg"
                  @error="setDefaultImg"
                />
                <span v-else>
                  <i v-if="(file.filename).indexOf('.doc') >= 0" class="iconfont icon-word"></i>
                  <i v-else-if="(file.filename).indexOf('.ppt') >= 0" class="iconfont icon-ppt"></i>
                  <i v-else-if="(file.filename).indexOf('.pdf') >= 0" class="iconfont icon-pdf"></i>
                  <i v-else-if="(file.filename).indexOf('.xls') >= 0" class="iconfont icon-excel"></i>
                  <i v-else-if="(file.filename).indexOf('.zip') >= 0" class="iconfont icon-zip"></i>
                  <i v-else class="iconfont icon-file"></i>
                </span>
              </div>
              <div class="file-name">{{ file.filename }}</div>
              <!-- <span class="file-size">（{{ getSize(file.size / 1024) }}）</span> -->
            </div>
            <div class="file-item__right file-actions">
              <span v-if="canDownload" @click="download(file)">
                <i class="el-icon-download"></i>
              </span>
              <span @click="del(file)">
                <i class="el-icon-delete"></i>
              </span>
            </div>
          </div>
          <div v-if="file.status && file.status === 'uploading'" style="position:relative">
            <!-- 原本el组件的名称 -->
            <div>
              <div class="file-name">{{ file.name }}</div>
              <!-- request请求才有用 -->
              <!-- <i class="el-icon-close" @click="cancelUpload(file)"></i> -->
            </div>
            <el-progress
              class="mt-10"
              :stroke-width="2"
              :percentage="parsePercentage(file.percentage)"
            ></el-progress>
          </div>
        </div>
        <div slot="tip">
          <!-- 提示 -->
          <div class="file-upload__tip">
            <span v-if="fileFormat">文件格式：{{ fileFormat }}，</span>
            <template v-if="showFileSize">
              文件大小：
              <span>{{ getSize(fileSize) }}</span>以内
            </template>
          </div>
          <div v-if="fileList.length" class="mt-10">
            <span class="file-list-title">上传文件列表：</span>
          </div>
        </div>
      </el-upload>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
// mixins
import UploadMixins from "mixins/upload.js";

function noop() {
  return true;
}

export default {
  name: "FileUpload",
  mixins: [UploadMixins],
  props: {
    // 所有图片列表
    fileList: {
      type: Array,
      default: () => []
    },
    // 是否显示文件大小提示文本
    showFileSize: {
      type: Boolean,
      default: true
    },
    // 文件大小限制，单位以上KB
    fileSize: {
      type: Number,
      default: 150
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
      default: ""
    },
    // 检查上传文件格式
    onCheckFormat: {
      type: Function,
      default: noop
    }
  },
  data() {
    return {
      imgReg: /\.(bmp|jpg|jpeg|png|gif|webp|JPG|PNG|GIF)$/
    };
  },
  methods: {
    parsePercentage(val) {
      return parseInt(val, 10);
    },
    // 是否是图片格式
    isImg(file) {
      if (this.imgReg.test(file.filename)) {
        return true;
      }
      return false;
    },
    // 删除
    del(file) {
      let list = [...this.fileList];
      if (!list.length) return;
      list.splice(list.indexOf(file), 1);
      this.$emit("upload-success", list);
    }
  }
};
</script>
<style scoped lang="scss">
.file-upload {
  &__btn {
    cursor: pointer;
    width: 100%;
    max-width: 500px;
    line-height: 20px !important;

    ::v-deep .el-upload-dragger {
      width: 100%;
      padding: 0 30px;
      max-width: 360px;
      height: 130px;

      .el-icon-upload {
        margin-top: 20px;
      }

      .el-upload__text {
        font-size: 12px;
      }
    }

    ::v-deep .el-upload-list__item {
      position: relative;
      transition: none !important;
      line-height: 20px !important;
      padding: 5px 10px;
      outline: none;

      &:hover {
        .file-actions {
          opacity: 1;
        }
      }
    }

    ::v-deep .el-progress {
      // width: 98% !important;
      left: 0;
      top: 8px;
    }
  }

  &__tip {
    font-size: 12px;
    line-height: 16px;
    margin-top: 10px;
    color: #ed3f14;
  }
}
.file-upload-text {
  padding: 0 20px;
  font-size: 12px;
  justify-content: space-between;
}

.file-item {
  position: relative;
  align-items: center;
  justify-content: space-between;
  line-height: 20px !important;

  &__left {
    align-items: center;
    max-width: 88%;
  }
}

.file-thumbnail {
  max-width: 25px;
  max-height: 25px;
  border-radius: 4px;
  display: block;
  // cursor: pointer;
}

.file-icon {
  min-width: 25px;
  text-align: center;
  i {
    font-size: 20px;
  }
}

.file-name {
  width: 85%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}
.file-size {
  font-size: 12px;
}

.file-list-title {
  font-size: 12px;
}

.file-actions {
  cursor: default;
  opacity: 0;
  font-size: 16px;
  i {
    cursor: pointer;
    margin-left: 5px;

    &:hover {
      color: $color-primary;
    }
  }
}
</style>

