<template>
  <!-- eslint-disable -->
  <div class="app-container">
    <div class="change-password-container">
      <el-form ref="form" :model="form" :rules="rules" label-width="95px" style="margin-top:25vh">
        <el-form-item label="旧密码：" prop="oldPassword">
          <el-input type="password" v-model="form.oldPassword" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input type="password" v-model="form.newPassword" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="rePassword">
          <el-input type="password" v-model="form.rePassword" placeholder="请输入确认密码"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import { validPassword, isEqual } from "utils/validate";
// Api方法
import Api from "api/user";
// Vuex
import { mapGetters } from "vuex";

import request from "@/utils/request";
const VUE_APP_SERVER_API = process.env.VUE_APP_SERVER_API;
export default {
  name: "AccountSettings",
  computed: {
    ...mapGetters(["token"])
  },
  data() {
    const validateNewPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入新密码"));
      } else if (!validPassword(value)) {
        return callback(new Error("密码中必须包含字母、数字，长度至少为6个字符！"));
      } else {
        return callback();
      }
    };
    const validateComfirPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入确认密码"));
      } else if (!isEqual(value, this.form.newPassword)) {
        return callback(new Error("两次输入密码不一致"));
      } else {
        return callback();
      }
    };
    return {
      form: {
        oldPassword: "",
        newPassword: "",
        rePassword: ""
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" }
        ],
        newPassword: [
          {
            required: true,
            validator: validateNewPassword,
            trigger: "blur"
          }
        ],
        rePassword: [
          {
            required: true,
            validator: validateComfirPassword,
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.oldPassword == this.form.newPassword) {
            this.$message.error("旧密码和新密码不能相同！");
            return false;
          }

          // 修改密码 Api
          Api.ChangePwd(this.form, this.token)
            .then(res => {
              if (res.code == 200) {
                // 登出 action方法
                this.$store
                  .dispatch("user/logout")
                  .then(res => {
                    this.$message.success("密码修改成功!请重新登录");
                    this.$router.push({ name: "Login" });
                  })
                  .catch(err => console.log(err));
              } else if (res.code == 404) this.$message.warning(res.msg);
              else this.$message.error("密码修改失败！");
            })
            .catch(err => this.$message.error(err.error));
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.change-password-container {
  width: 500px;
  margin: 0 auto;
}
</style>
