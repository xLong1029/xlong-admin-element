<template>
  <!-- eslint-disable -->
  <div class="home-container overspread-page">
    <el-card shadow="never">
      <p>噔噔~！XLONG家里蹲管理系统，欢迎你！</p>
      <br />
      <p>组件页面里的相关组件，是本人由于工作需要根据Element原有组件进行部分重写的新组件。</p>
      <p>其他示例页面里的相关页面，是本人整理出来曾用过一些功能页面。</p>
      <br />
      <img :src="qrcode" />
      <p class="mt-5">扫一扫，关注xLong设计</p>
      <br />
      <p>联系方式（一个不务正业的前端工程师）</p>
      <br />
      <p>QQ：381612175</p>
      <p>
        github：
        <a href="https://github.com/xLong1029/" target="_blank">https://github.com/xLong1029/</a>
      </p>
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
      <br />
      <p>*此项目做学习Vue测试使用，有什么问题可联系我讨论</p>
    </el-card>
  </div>
</template>

<script>


export default {
  name: "Home",
  data() {
    return {
      qrcode: require("assets/images/qrcode.jpg")
    };
  }
};
</script>
<style lang="scss" scoped>
.home-container {
  text-align: center;
}
</style>
