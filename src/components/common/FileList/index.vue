<template>
  <!-- eslint-disable -->
  <el-table ref="table" class="table" :data="fileList" border>
    <el-table-column type="index" label="序号" width="50" align="center" header-align="center"></el-table-column>
    <el-table-column prop="name" label="文件名称" header-align="center">
      <template slot-scope="{ row }">{{ row.filename || row.name }}</template>
    </el-table-column>
    <el-table-column
      v-if="canDownload || canDelete"
      prop="action"
      label="操作"
      align="center"
      header-align="center"
      width="125"
    >
      <template slot-scope="{ row, $index }">
        <el-button
          v-if="canDownload"
          size="mini"
          type="text"
          icon="el-icon-download"
          @click="download(row)"
        >下载</el-button>
        <el-button
          v-if="canDelete"
          size="mini"
          type="text"
          icon="el-icon-delete"
          @click="del($index)"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
/* eslint-disable */

const VUE_APP_SERVER_AUTH = process.env.VUE_APP_SERVER_AUTH;

export default {
  name: "FileList",
  props: {
    // 文件列表
    fileList: {
      type: Array,
      default: () => []
    },
    // 是否可删除
    canDelete: {
      type: Boolean,
      default: false
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
    // 下载
    download(file) {
      console.log(file);
      var a = window.document.createElement("a");
      a.download = file.filename;
      a.href = file.url;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    // 删除
    del(index) {
      console.log(222);
      let list = [...this.fileList];
      if (!list.length) return;
      list.splice(index, 1);
      this.$emit("delete-success", list);
      this.$emit("update:file-list", list);
    }
  }
};
</script>
<style scoped lang="scss">
</style>

