<template>
  <!-- eslint-disable -->
    <div class="footer">
        <div class="wrapper-container">
            <div class="center">
                <p>主办单位：广西壮族自治区住房和城乡建设厅 &nbsp;&nbsp; &nbsp;</p>
                <p>承办单位：广西壮族自治区住房和城乡建设信息中心</p>
                <p>地址：广西壮族自治区住房和城乡建设厅 &nbsp; &nbsp;邮编：530000</p>
                <p>
                    友情链接：
                    <a href="http://zjt.gxzf.gov.cn/" target="_blank">住建厅官网</a>
                    <el-divider direction="vertical"></el-divider>
                    <a href="http://zwfw.gxzf.gov.cn/" target="_blank">广西数字政务一体化平台</a>
                </p>
                <p>浏览建议:建议使用谷歌新版浏览器/IE10以上浏览器/火狐浏览器/360浏览器，分辨率为1280x768以上最佳</p>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */

export default {
    name: "AppFooter",
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
$footer-height: 145px;

.footer {
    height: $footer-height;
    width: 100%;
    background: #222222;
    color: #cfcfcf;
    font-size: 12px;

    &__left {
        height: $footer-height;
        align-items: center;
    }
    .center {
        width: 1200px;
        padding: 5px 0;
        text-align: center;
        p{
          &:last-child{
            margin-bottom: 0;
          }
        }
    }

    // .qrcode {
    //     width: 69px;
    //     height: 69px;
    //     background: url("../../../assets/images/qrcode.png");
    // }

    // .party {
    //     width: 69px;
    //     height: 69px;
    //     background: url("../../../assets/images/party.png");
    // }

    .info {
        p {
            margin: 10px 0;
        }
    }

    // .right-item {
    //     align-items: center;
    // }

    a:hover{
      color: #ffed1a;
    }
}
</style>
