/*
 * 模块 : 图片上传相关配置
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2020-01-14
 * 版本 : version 1.0
 */
/* eslint-disable */
export default {
    data() {
        return {
            // 图片上传分时
            imgAccept: ".png,.jpg,.jpeg,.gif",
            // 上传进度
            imgProgress: {
                visible: false,
                percentage: 0
            }
        }
    },
    methods: {
        // 图片上传前
        imgBeforeUpload(file) {
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
            // 控制文件大小
            if ((file.size / 1024) > this.fileSize) {
                const overHint = this.fileSize > 1024 ? Math.floor(this.fileSize / 1024) + "M" : this.fileSize + "KB";
                this.$message.warning(`上传图片大小不能超过${overHint}`);
                return false;
            }

            this.imgProgress.visible = true;
            this.imgProgress.percentage = 0;
        },
        // 图片上传进度
        imgUploadProgress(res) {
            this.imgProgress.percentage = Math.floor(res.percent);
        },
        // 上传至Bomb
        uploadToBomb(file) {
            const _file = Bmob.File(file.name, file);

            return new Promise((resolve, reject) => {
                _file.save().then(res => {
                    this.imgProgress.visible = false;
                    this.$message.success("图片上传成功");
                    resolve(res);
                }, err => {
                    this.imgProgress.visible = false;
                    this.$message.error("图片上传失败");
                    reject(err);
                });
            });
        }
    }
}
