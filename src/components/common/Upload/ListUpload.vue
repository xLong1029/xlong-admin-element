<template>
  <!-- eslint-disable -->
  <div class="list-upload-container">
    <!-- 提示 -->
    <div class="list-upload__tip">
      <span v-if="fileFormat">文件格式：{{ fileFormat }}，</span>
      <template v-if="showFileSize">
        文件大小：
        <span>{{ getSize(fileSize) }}</span>以内
      </template>
    </div>
    <!-- 图片列表 -->
    <div class="list-upload">
      <file-list :file-list="fileList" @delete-success="del" />
      <el-upload
        ref="fileUpload"
        multiple
        action="/"
        :file-list="fileList"
        :http-request="handleUpload"
        :before-upload="beforeUpload"
      >
        <div slot="default" class="list-upload-add-btn">
          <i class="el-icon-plus"></i>上传附件
        </div>
        <div slot="file" slot-scope="{file}">
          <div class="file-upload-text" v-if="file.status === 'ready'"><span>{{ file.name }}</span>上传中...</div>
          <div class="file-upload-text" v-if="file.status === 'fail'">上传失败</div>
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
      </el-upload>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
// mixins
import UploadMixins from "mixins/upload.js";
// 组件
import FileList from "components/common/FileList/index.vue";

function noop() {
  return true;
}

export default {
  name: "ListUpload",
  mixins: [UploadMixins],
  components: { FileList },
  props: {
    // 所有文件列表
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
    return {};
  },
  methods: {
    // 删除
    del(list) {
      this.$emit("upload-success", list);
    }
  }
};
</script>
<style scoped lang="scss">
.list-upload {
  /deep/ .el-upload {
    width: 100%;
  }

  /deep/ .el-upload-list__item {
    position: relative;
    transition: none !important;
    line-height: 25px !important;
    padding: 5px 10px;
    outline: none;

    &.is-success{
      display: none;
    }
  }

  /deep/ .el-progress {
    // width: 98% !important;
    left: 0;
    top: 8px;
  }

  &__tip {
    font-size: 12px;
    line-height: 16px;
    margin: 10px 0;
    color: #ed3f14;
  }

  &-add-btn {
    border: 1px dashed #dfe6ec;
    width: 100%;
    // border-radius: 4px;
    text-align: center;
    height: 45px;
    line-height: 45px;
    cursor: pointer;
    position: relative;
    z-index: 10;
    color: $color-primary;
    margin-top: -1px;

    &:hover {
      border-color: $color-primary;
    }

    & > i {
      margin-right: 5px;
    }
  }
}
</style>

