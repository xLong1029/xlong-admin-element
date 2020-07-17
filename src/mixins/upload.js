/*
 * 模块 : 上传相关配置
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2020-07-09
 * 版本 : version 1.0
 */
/* eslint-disable */
export default {
    data() {
        return {
            defaultImg: require("@/assets/images/no-found-pic.jpg")
        }
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
            return fileSize >= 1024 ? fileSize / 1024 >= 1024 ? `${Math.floor(fileSize / 1024 / 1024 * 100) / 100}GB` : `${Math.floor(fileSize / 1024 * 100) / 100}MB` : `${Math.floor(fileSize * 100) / 100}KB`;
        },
        // 上传前
        beforeUpload(file) {
            const {
                $message,
                fileSize,
                createUploadRecord,
                onCheckFormat,
                getSize
            } = this;

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
        // 上传至Bomb
        uploadToBomb(file) {
            const _file = Bmob.File(file.name, file);

            return new Promise((resolve, reject) => {
                _file.save().then(
                    res => {
                        this.$message.success("上传成功");
                        resolve(res);
                    },
                    err => {
                        this.$message.warning("服务器繁忙，请稍后重试");
                        reject(err);
                    }
                );
            });
        },
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
        // 预览
        preview(file) {
            this.$emit("preview", file);
        },
        handleUpload(options) {
            const file = options.file;
            this.uploadToBomb(file)
              .then(res => {
                console.log(res);
                let fileList = [...this.fileList, ...res];
                this.$emit("upload-success", fileList);
              })
              .catch(err => {
                console.log(err);
                this.del(file);
              });
          },
        // // 取消上传,request请求才有用
        // cancelUpload(file) {
        //     this.$refs.fileUpload.abort(file);
        //     this.$refs.fileUpload.uploadFiles.splice(this.$refs.fileUpload.uploadFiles.indexOf(file), 1);
        // }
    }
}
