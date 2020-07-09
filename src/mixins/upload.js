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
        }
    },
    methods: {
        // 单位从kb开始计算
        getSize(fileSize) {
            if (fileSize < 1) return `${Math.floor(fileSize * 1024 * 100) / 100}B`;
            return fileSize >= 1024 ? fileSize / 1024 >= 1024 ? `${Math.floor(fileSize / 1024 / 1024 * 100) / 100}GB` : `${Math.floor(fileSize / 1024 * 100) / 100}MB` : `${Math.floor(fileSize * 100) / 100}KB`;
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
        }
    }
}
