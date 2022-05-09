<template>
  <!-- eslint-disable -->
  <div id="login" class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="validate" class="login-form">
      <h3 class="form-title">
        <img :src="logo" />
      </h3>
      <el-form-item prop="username">
        <el-input
          prefix-icon="el-icon-user"
          v-model.trim="loginForm.username"
          placeholder="请输入手机号码"
          @keyup.enter.native="submit('loginForm')"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          prefix-icon="el-icon-key"
          type="password"
          v-model.trim="loginForm.password"
          placeholder="请输入密码"
          @keyup.enter.native="submit('loginForm')"
        />
      </el-form-item>
      <el-form-item style="line-height: inherit;">
        <el-checkbox v-model="remeberPwd">记住密码</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" long @click="submit('loginForm')" :loading="loading">登录</el-button>
      </el-form-item>
      <div class="info">普通用户登录账号: 18888888888 密码: 666666</div>
      <div class="info">管理员登录账号: 17777075292 密码: 123456</div>
      <div class="info">超级管理员登录账号: 18376686974 密码: 123456</div>
    </el-form>
  </div>
</template>

<script>

import { setLocalS, getLocalS, delLocalS, encrypt, AESDecrypt } from "utils";

export default {
  name: "Login",
  data() {
    return {
      // 加载状态
      loading: false,
      // logo
      logo: require("assets/images/logo-green.png"),
      // 表单信息
      loginForm: {
        // 用户名
        username: "",
        // 密码
        password: ""
      },
      // 记住密码
      remeberPwd: false,
      // 验证规则
      validate: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "登录密码不能为空", trigger: "blur" }
        ]
      },
      redirect: ""
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    },
    remeberPwd(val) {
      if (!val) {
        if (getLocalS("username")) {
          delLocalS("username");
          delLocalS("password");
        }
      }
    }
  },
  created() {
    // 判断本地存储用户名是否存在
    if (getLocalS("username")) {
      // 获取本地存储的用户名和密码
      this.loginForm.username = getLocalS("username");
      this.loginForm.password = AESDecrypt(getLocalS("password"));
      this.remeberPwd = true;
    }
  },
  mounted() {
    this.$_initResizeEvent();
  },
  beforeDestroy() {
    this.$_destroyResizeEvent();
  },
  methods: {
    $_initResizeEvent() {
      window.addEventListener("resize", this.$_resizeHandler);
    },
    $_destroyResizeEvent() {
      window.removeEventListener("resize", this.$_resizeHandler);
    },
    $_resizeHandler() {
      const loginBg = document.getElementById("login");
      // 设置背景颜色高度
      loginBg.style.height = document.body.scrollHeight + "px";
      // 监听窗口变化
      window.onresize = () => {
        loginBg.style.height = document.body.scrollHeight + "px";
      };
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(res => {
              // 判断是否记住密码
              if (this.remeberPwd) {
                // 本地存储用户名和密码
                setLocalS("username", this.loginForm.username);
                setLocalS("password", encrypt(this.loginForm.password));
              }
              this.$message.success("登录成功!");

              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery
              });
            })
            .catch(err => this.$message.error(err.error))
            .finally(() => (this.loading = false));
        } else this.$message.error("登录失败!填写有误！");
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  height: 100vh;
  min-height: 900px;
  background-color: #4d5256;
}

.login-form {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 400px;
  padding: 35px 35px 15px;
  margin: auto;
  margin-top: -250px;
  margin-left: -200px;
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  box-shadow: 0 0 25px #555;

  .info {
    text-align: center;
    color: #888;
  }

  ::v-deep .el-button {
    width: 100%;
  }
}

.form-title {
  font-size: 24px;
  font-weight: 400;
  color: #555;
  margin: 0 auto 20px;
  text-align: center;
  font-weight: 700;

  img {
    display: inline-block;
  }
}
</style>
