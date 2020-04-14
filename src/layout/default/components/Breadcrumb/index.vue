<template>
  <!-- eslint-disable -->
  <el-breadcrumb class="app-breadcrumb-container" separator="/">
    <div class="app-breadcrumb-content">
      <div class="app-breadcrumb-content-wrapper">
        <span class="fl">当前位置：</span>
          <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
            <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
            <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
          </el-breadcrumb-item>
      </div>
      <el-button v-if="$route.meta.needBack" class="fr back-btn" style="min-width: 80px; margin-top: 4px;" size="small" @click="$router.go(-1)">返回</el-button>
    </div>
  </el-breadcrumb>
</template>

<script>
/* eslint-disable */
import pathToRegexp from "path-to-regexp";

export default {
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(
        item => item.meta && item.meta.title
      );
      const first = matched[0];

      if (!this.isDashboard(first)) {
        // matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
        matched = [{ path: "/home", meta: { title: "主页" } }].concat(matched);
      }

      this.levelList = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      // return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
      return name.trim().toLocaleLowerCase() === "Home".toLocaleLowerCase();
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route;
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    }
  }
};
</script>

<style lang="scss" scoped>
.app-breadcrumb-container.el-breadcrumb {
  // display: inline-block;
  width: 100%;
  line-height: 40px;
  padding: 0 15px;
  background: #fff;
  border-bottom: $border;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
