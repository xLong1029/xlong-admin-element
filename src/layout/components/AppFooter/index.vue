<template>
  <!-- eslint-disable -->
  <div class="footer flex">
    <div class="footer__left">
      <div class="title">联系方式（一个不务正业的前端工程师）</div>
      <div class="contact flex mt-10">
        <div class="contact-item mr-20">
          <p>QQ：381612175</p>
          <p>
            github：
            <a
              href="https://github.com/xLong1029/"
              target="_blank"
            >https://github.com/xLong1029/</a>
          </p>
        </div>
        <div class="contact-item">
          <p>
            站酷主页：
            <a href="http://xlong.zcool.com.cn/" target="_blank">http://xlong.zcool.com.cn/</a>
          </p>
          <p>
            UI中国：
            <a
              href="http://i.ui.cn/ucenter/358591.html"
              target="_blank"
            >http://i.ui.cn/ucenter/358591.html</a>
          </p>
        </div>
      </div>
    </div>
    <div class="footer__right flex">
      <div class="right-item flex">
        <img :src="require('@/assets/images/qrcode.jpg')" class="mb-5" />
        扫一扫，关注xLong设计
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
$footer-height: 110px;

.footer {
  min-height: $footer-height;
  width: 100%;
  background: #222222;
  color: #cfcfcf;
  font-size: 12px;
  padding: 0 15px;
  justify-content: space-between;

  &__left {
    height: $footer-height;
    align-items: center;
    
    .title{
        color: #fff;
        font-size: 14px;
        margin-top: 10px;
    }
  }

  &__right {
    align-items: center;
  }

  p {
    margin: 10px 0;
  }

  .right-item {
    flex-direction: column;
    align-items: center;
    margin-top: 5px;
    img {
      width: 70px;
    }
  }

  a:hover {
    color: $color-primary;
  }
}
</style>
