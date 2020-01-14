<template>
  <!-- eslint-disable -->
  <div class="navbar">
    <div class="logo-container fl">
      <img class="logo" :src="logo" />
    </div>
    <!-- 导航 -->
    <div class="nav-list-container fl">
      <el-menu
        :default-active="activeMenu"
        class="nav-list"
        mode="horizontal"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
      >
        <nav-item
          v-for="route in permissionRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </div>
    <div class="right-menu fr">
      <pop-confirm title="确认退出?" @confirm="logout">
        <div class="right-menu-item hover-effect fr">
          <div class="icon-wrapper">
            <i class="iconfont icon-exit"></i>
            <span class="ml-5">退出</span>
          </div>
        </div>
      </pop-confirm>
      <!-- 账户设置 -->
      <el-popover placement="bottom" width="300" trigger="hover">
        <div class="user-info-container">
          <div class="user-info-title">
            <span>账户信息</span>
            <router-link to="/change-password" class="url-btn fr">
              修改密码
              <i class="el-icon-arrow-right"></i>
            </router-link>
          </div>
          <ul class="user-info-list mt-10">
            <li class="user-info-list-item">账号：{{ username | isNull }}</li>
            <li class="user-info-list-item">真实姓名：{{ realName | isNull }}</li>
            <li class="user-info-list-item">性别：{{ gender | isNull }}</li>
          </ul>
        </div>
        <div slot="reference" class="right-menu-item hover-effect fr">
          <div class="icon-wrapper">
            <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
            <span class="user-name">
              <i class="el-icon-user-solid mr-5"></i>
              {{ nickName }}
            </span>
            <i class="el-icon-caret-bottom" />
          </div>
        </div>
      </el-popover>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import NavItem from "./NavItem";
import variables from "@/styles/variables.scss";

export default {
  name: "Navbar",
  components: { NavItem },
  computed: {
    ...mapGetters([
      "permissionRoutes",
      "username",
      "nickName",
      "realName",
      "gender"
    ]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;

      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return variables;
    }
  },
  data() {
    return {
      logo: require("@/assets/images/logo-green.png")
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$message.success("您已退出该系统");
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style lang="scss">
.navbar {
  z-index: 999;
}
</style>

<style lang="scss" scoped>
$right-menu-height: 50px;

.navbar {
  padding-left: 12px;
  height: $navbar-height;
  width: 100%;
  overflow: hidden;
  position: relative;
  background: #333;

  .logo-container {
    margin-top: 10px;
    font-size: 21px;
    color: #fff;
    font-weight: bold;
    display: flex;
    align-items: center;
    .logo {
      width: 150px;
    }

    .text {
      margin-top: 3px;
    }
  }

  .right-menu {
    height: $right-menu-height;
    justify-content: flex-end;
    // width: 980px;
    margin-top: 5px;
    font-size: 16px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: flex;
      align-items: center;
      height: 100%;
      color: $menuText;
      vertical-align: text-bottom;

      .icon-wrapper {
        height: $right-menu-height;
        line-height: $right-menu-height;
        padding: 0 20px;
      }

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          color: $menuActiveText;
          // background: rgba(0, 0, 0, 0.2);
        }
      }

      .user-name {
        i {
          font-size: 16px;
        }
      }
    }
  }
}

.user-info {
  &-title {
    padding-top: 5px;
    padding-bottom: 10px;
    border-bottom: $border;

    .url-btn {
      &:hover {
        color: $color-primary;
      }
    }
  }

  &-list {
    &-item {
      margin: 10px 0;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

// $color-primary: #ffaa0e;

.nav-list {
  &-container {
    margin: 0 auto;
    position: relative;
    margin-top: 5px;
    margin-left: 50px;

    /deep/ .el-menu {
      background: transparent;
    }

    /deep/ .el-menu-item {
      height: $right-menu-height;
      line-height: $right-menu-height;
      font-size: 16px;
      color: $menuText;

      i {
        color: $menuText;
      }

      &:focus {
        background: transparent !important;
      }

      &:hover {
        color: $menuActiveText !important;
        background: transparent !important;
        i {
          color: $menuActiveText;
        }
      }
    }

    /deep/ .el-submenu__title {
      height: $right-menu-height;
      line-height: $right-menu-height;
      font-size: 16px;

      i {
        color: $menuText;
      }
    }

    /deep/ .el-menu--horizontal {
      border-bottom: none;
    }

    /deep/ .el-submenu__title {
      color: $menuText;

      &:focus {
        background: transparent !important;
      }

      &:hover {
        color: $menuActiveText !important;
        background: transparent !important;
        i {
          color: $menuActiveText;
        }
      }

      span {
        margin-right: 10px;
      }
      i {
        color: $menuText;
      }
    }

    /deep/ .el-submenu__icon-arrow {
      position: relative;
      top: inherit;
      right: inherit;
      margin-top: 0;
    }
  }
}
</style>
