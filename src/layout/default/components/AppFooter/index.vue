<template>
  <!-- eslint-disable -->
  <div class="footer flex">
    <div class="info">
      <div class="contact flex mt-5">
        <div class="contact-item mr-30">
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
    <div class="copyright">2020-2022 &copy; XLONG JIALIDUN</div>
  </div>
</template>

<script>


export default {
  name: "AppFooter",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.footer {
  min-height: 60px;
  width: 100%;
  background: #333;
  color: #cfcfcf;
  font-size: 12px;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;

  .contact {
    width: 470px;
    margin: 0 auto;
  }

  .copyright {
    text-align: center;
    color: #117564;
  }

  p {
    margin: 10px 0;
  }

  a:hover {
    color: $color-primary;
  }
}
</style>
