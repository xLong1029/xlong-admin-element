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
        }
    },
    methods: {
        // 上传至Bomb
        uploadToBomb(file) {
            const _file = Bmob.File(file.name, file);

            return new Promise((resolve, reject) => {
                _file.save().then(res => {
                    this.$message.success("图片上传成功");
                    resolve(res);
                }, err => {
                    this.$message.error("图片上传失败");
                    reject(err);
                });
            });
        }
    }
}
