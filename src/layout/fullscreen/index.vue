<template>
  <!-- eslint-disable -->
  <div class="app-wrapper">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";

const whiteList = ["Home", "ExpertsList", "AccountSettings"];

export default {
  name: "LayoutFullScreen",
  computed: {
    key() {
      return this.$route.path
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
