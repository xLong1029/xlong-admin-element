<template>
  <!-- eslint-disable -->
  <div class="app-wrapper">
    <div class="main-container">
      <navbar />
      <breadcrumb v-if="breadcrumbVisible" class="breadcrumb-container" />
      <app-main />
      <app-footer />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { AppMain, Navbar, AppFooter, Breadcrumb } from "./components";
import { mapState } from "vuex";

const whiteList = ["Home", "ExpertsList", "AccountSettings"];

export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    AppFooter,
    Breadcrumb
  },
  data() {
    return {
      breadcrumbVisible: true
    };
  },
  mounted() {
    this.init(this.$route);
  },
  watch: {
    $route(route) {
      this.init(route);
    }
  },
  methods: {
    init(route) {
      const navH = 60;
      const breadcrumbH = 41;
      this.breadcrumbVisible = true;
      appMain.style.minHeight = `calc(100vh - ${navH + breadcrumbH}px)`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
