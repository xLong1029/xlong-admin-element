/*
 * 模块 : 上传相关配置
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2020-07-09
 * 版本 : version 1.0
 */

import { Random } from "mockjs";

export default {
  data() {
    return {
      defaultImg: require("@/assets/images/no-found-pic.jpg"),
    };
  },
  methods: {
    // 设置默认图片
    setDefaultImg(e) {
      e.currentTarget.src = this.defaultImg;
      e.currentTarget.onerror = null;
    },
    // 单位从kb开始计算
    getSize(fileSize) {
      if (fileSize < 1) return `${Math.floor(fileSize * 1024 * 100) / 100}B`;
      return fileSize >= 1024
        ? fileSize / 1024 >= 1024
          ? `${Math.floor((fileSize / 1024 / 1024) * 100) / 100}GB`
          : `${Math.floor((fileSize / 1024) * 100) / 100}MB`
        : `${Math.floor(fileSize * 100) / 100}KB`;
    },
    // 上传前
    beforeUpload(file) {
      const { $message, fileSize, createUploadRecord, onCheckFormat, getSize } =
        this;

      if (file.name.length > 100) {
        $message.warning(`文件名称过长，请修改后重新上传`);
        return false;
      }

      const format = onCheckFormat(file);
      if (!format) return false;

      // 控制文件大小
      if (file.size / 1024 > fileSize) {
        $message.warning(`大小不能超过${getSize(fileSize)}`);
        return false;
      }
    },
    // 上传文件（模拟）
    uploadFileDemo(file) {
      return new Promise((resolve) => {
        const { name, size, type } = file;

        // 转bse64
        let reader = new FileReader();
        reader.readAsDataURL(file); // 这里也可以直接写参数event.raw
        reader.onload = () => {
          const url = reader.result;
          const data = {
            name,
            size,
            type,
            urlType: "base64",
            url,
            uid:Random.guid()
          };
          const res = { code: 200, data, mesaage: "上传成功" };
          resolve(res);
        };
      });
    },
    // 下载
    download(file) {
      var a = window.document.createElement("a");
      a.download = file.name;
      a.href = file.url;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    // 预览
    preview(file) {
      this.$emit("preview", file);
    },
    // 自定义上传处理
    handleUpload(options) {
      const file = options.file;
      this.uploadFileDemo(file)
        .then(res => {
          let fileList = [...this.fileList, res.data];
          this.$emit("upload-success", fileList);
        })
        .catch(err => {
          console.log(err);
          this.del(file);
        });
    },
    // 删除
    del(file) {
      let list = [...this.fileList];
      console.log(222, list);

      if (!list.length) return;
      list.splice(list.indexOf(file), 1);
      this.$emit("upload-success", list);
    }
    // // 取消上传,request请求才有用
    // cancelUpload(file) {
    //     this.$refs.fileUpload.abort(file);
    //     this.$refs.fileUpload.uploadFiles.splice(this.$refs.fileUpload.uploadFiles.indexOf(file), 1);
    // }
  },
};
