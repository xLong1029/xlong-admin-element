<template>
  <!-- eslint-disable -->
    <div class="app-container">
        <div class="account-set-container">
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
                label-width="95px"
                style="margin-top:200px;"
            >
                <el-form-item label="旧密码：" prop="oldPassword">
                    <el-input type="password" v-model="form.oldPassword" placeholder="请输入旧密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码：" prop="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="rePassword">
                    <el-input type="password" v-model="form.rePassword" placeholder="请输入确认密码"></el-input>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button @click="resetForm('form')">重置</el-button>
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { validPassword, isEqual } from "@/utils/validate";

import request from "@/utils/request";
const VUE_APP_SERVER_API = process.env.VUE_APP_SERVER_API;
export default {
    name: "AccountSettings",
    data() {
        const validateNewPassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入新密码"));
            } else if (!validPassword(value)) {
                callback(
                    new Error("密码中必须包含字母、数字，长度至少为6个字符！")
                );
            } else {
                callback();
            }
        };
        const validateComfirPassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入确认密码"));
            } else if (!isEqual(value, this.form.password)) {
                callback(new Error("两次输入密码不一致"));
            } else {
                callback();
            }
        };
        return {
            form: {
                oldPassword: "",
                password: "",
                rePassword: ""
            },
            rules: {
                oldPassword: [
                    { required: true, message: "请输入旧密码", trigger: "blur" }
                ],
                password: [
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
                    let params = this.form;
                    request
                        .post(VUE_APP_SERVER_API + "/users/updatepwd", params)
                        .then(res => {
                            if (res.status.code) {
                                this.$message({
                                    message:'密码修改成功，3秒后自动退出！',
                                    type: "success"
                                });
                                let that = this;
                                setTimeout(function() {
                                    that.logout()
                                },3000)
                            } else {
                                this.$message({
                                    message: res.status.text,
                                    type: "error"
                                });
                            }
                        })
                        .catch(error => {
                            this.$message({
                                message: error,
                                type: "error"
                            });
                        });
                }
            });
        },
        async logout() {
      await this.$store.dispatch("user/logout");
      await this.$store.dispatch("oidc/signoutRedirect");
    }
    }
};
</script>
<style lang="scss" scoped>
.account-set-container {
    width: 500px;
    margin: 25px auto;
}
</style>
