<template>
  <!-- eslint-disable -->
  <el-dialog
    :title="title"
    :visible="visible"
    :close-on-click-modal="false"
    width="900px"
    @close="close"
  >
    <div class="expert-detail-container" v-loading="loading">
      <div class="expert-detail__left">
        <el-tabs
          :value="activeTab.name"
          :stretch="true"
          tab-position="left"
          class="expert-detail-tab"
          @tab-click="selectTab"
        >
          <el-tab-pane
            v-for="item in tabTitles"
            :key="'tab' + item.index"
            :label="item.name"
            :name="item.name"
          ></el-tab-pane>
        </el-tabs>
      </div>
      <div class="expert-detail__right ml-15">
        <div ref="detailContent" class="expert-detail-content" @scroll="contentScorll">
          <el-form ref="form" :model="form">
            <div class="expert-detail-content__title" id="baseInfo">基本信息</div>
            <div class="expert-detail-content__cont">
              <div class="info-table">
                <div class="flex">
                  <div style="width:100%">
                    <div class="info-table__tr">
                      <div class="info-table__th">
                        <span class="required">真实姓名</span>
                      </div>
                      <div class="info-table__td">
                        <el-form-item prop="realname">
                          <el-input v-model="form.realname" placeholder="请输入内容"></el-input>
                        </el-form-item>
                      </div>
                      <div class="info-table__th">
                        <span class="required">性别</span>
                      </div>
                      <div class="info-table__td">
                        <el-form-item prop="gender">
                          <el-radio-group v-model="form.gender">
                            <el-radio label="男">男</el-radio>
                            <el-radio label="女">女</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="info-table__tr">
                      <div class="info-table__th">出生日期</div>
                      <div class="info-table__td">
                        <el-form-item>
                          <el-date-picker
                            v-model="form.birthdate"
                            type="date"
                            placeholder="请选择日期"
                            style="width:100%"
                          ></el-date-picker>
                        </el-form-item>
                      </div>
                      <div class="info-table__th">所在省市</div>
                      <div class="info-table__td">
                        <el-form-item>
                          <el-cascader v-model="provinceValue" :options="provinceList"></el-cascader>
                        </el-form-item>
                      </div>
                    </div>
                  </div>
                  <div class="info-table__tr">
                    <div class="info-table__td head-pic">
                      <img :src="form.face ? form.face : require('@/assets/images/head.jpg')" />
                    </div>
                  </div>
                </div>
                <div class="info-table__tr">
                  <div class="info-table__th">通讯地址</div>
                  <div class="info-table__td">
                    <el-form-item>
                      <el-input v-model="form.address" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="info-table__tr">
                  <div class="info-table__th">
                    <span class="required">手机号码</span>
                  </div>
                  <div class="info-table__td">
                    <el-form-item prop="mobile">
                      <el-input v-model="form.mobile" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </div>
                  <div class="info-table__th">
                    <span class="required">电子邮箱</span>
                  </div>
                  <div class="info-table__td">
                    <el-form-item prop="email">
                      <el-input v-model="form.email" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="info-table__tr">
                  <div class="info-table__th">备注</div>
                  <div class="info-table__td">
                    <el-form-item>
                      <el-input
                        v-model="form.remark"
                        type="textarea"
                        :autosize="{ minRows: 5 }"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>

            <div class="expert-detail-content__title" id="workInfo">工作经历</div>
            <div class="expert-detail-content__cont">
              <div class="info-table">
                <div class="info-table__tr">
                  <div class="info-table__th">工作单位名称</div>
                  <div class="info-table__td">
                    <el-form-item>
                      <el-input v-model="form.companyName" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </div>
                  <div class="info-table__th">职位</div>
                  <div class="info-table__td">
                    <el-form-item>
                      <el-input v-model="form.job" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="info-table__tr">
                  <div class="info-table__th"><span class="required">参加工作时间</span></div>
                  <div class="info-table__td">
                    <el-form-item prop="workTime">
                      <el-date-picker
                        v-model="form.workTime"
                        type="date"
                        placeholder="请选择日期"
                        class="mr-10"
                        style="width:80%"
                      ></el-date-picker>
                      <el-checkbox v-model="form.isGraduate">尚未毕业</el-checkbox>
                    </el-form-item>
                  </div>
                </div>
                <div class="info-table__tr">
                  <div class="info-table__th"><span class="required">专业领域</span></div>
                  <div class="info-table__td">
                    <el-form-item prop="profession">
                      <el-checkbox-group v-model="form.profession">
                        <el-checkbox label="复选框 A"></el-checkbox>
                        <el-checkbox label="复选框 B"></el-checkbox>
                        <el-checkbox label="复选框 C"></el-checkbox>
                        <el-checkbox label="禁用" disabled></el-checkbox>
                        <el-checkbox label="选中且禁用" disabled></el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </div>
                <div class="info-table__tr"></div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div slot="footer">
      <el-button @click="close">取消</el-button>
      <template>
        <el-button type="primary" @click="submitForm()">提交保存</el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
/* eslint-disable */
import Api from "api/account-manage";
import { docElmScrollTo } from "@/utils/scroll-to";

export default {
  name: "AccountStore",
  props: {
    // 弹窗可见性
    visible: {
      type: Boolean,
      default: false
    },
    // 详情id
    id: {
      type: String | Number,
      default: null
    },
    // 职位
    jobList: {
      type: Array,
      default: () => []
    },
    // 省份
    provinceList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      title: "信息详情",
      loading: false,
      tabTitles: [
        {
          index: 1,
          name: "基本信息",
          anchor: "baseInfo",
          anchorOffsetTop: 0
        },
        {
          index: 2,
          name: "工作信息",
          anchor: "workInfo",
          anchorOffsetTop: 0
        }
      ],
      // 当前激活tab
      activeTab: {},
      defaultData: {
        area: "",
        birthdate: "",
        city: "",
        companyName: "",
        createdAt: "",
        email: "",
        enabledState: 1,
        face: null,
        gender: "男",
        isGraduate: false,
        job: "",
        mobile: "",
        objectId: "",
        profession: "",
        province: "",
        realname: "",
        updatedAt: "",
        workTime: "",
        graduateSchool: "",
        address: "",
        politicalStatus: "",
        remark: ""
      },
      form: {},
      provinceValue: [],
      // 判断是点击滚动还是手动滚动 1：点击，2：手动
      tag: 2
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.init();
      }
    }
  },
  methods: {
    // 初始化
    init() {
      this.form = { ...this.defaultData };
      this.activeTab = this.tabTitles[0];
      if (!this.id) {
        this.title = "添加用户";
        return;
      }

      this.title = "用户信息详情";

      this.loading = true;
      Api.GetAccInfo(this.id)
        .then(res => {
          const result = res.data;
          if (res.code == 200) {
            // 设置数据
            this.form = result;
            // 设置省市值
            this.provinceValue = [
              this.form.province,
              this.form.city,
              this.form.area
            ];
            // 设置工作时间
            if (this.form.isGraduate) {
              this.disabledWT = true;
              this.workTimePH = "尚未毕业";
            }
            // 截取专业领域
            let str = this.form.profession;
            if (str != "")
              this.professionValue = this.form.profession.split(",");
            else this.professionValue = [];
          } else this.$message.error("无该用户数据!");
        })
        .catch(err => console.log(err))
        .finally(() => (this.loading = false));
    },
    // 获取每个tab对应的锚点位置
    getTabsPosition() {
      this.activeTab = this.tabTitles[0];
      setTimeout(() => {
        this.tabTitles.forEach(e => {
          const elm = document.getElementById(e.anchor);
          e.anchorOffsetTop = elm.offsetTop;
        });
      }, 500);
    },
    // 关闭弹窗
    close() {
      this.$emit("cancel-click", false);
      this.$emit("update:visible", false);
    },
    // 选中tab,获取选中实例
    selectTab(e) {
      this.activeTab = this.tabTitles[e.index];
      const destination = document.getElementById(this.activeTab.anchor);
      this.tag = 1;
      const _this = this;
      docElmScrollTo(
        this.$refs.detailContent,
        destination.offsetTop - 69,
        500,
        function() {
          _this.tag = 2;
        }
      );
    },
    // 内容部分滚动事件
    contentScorll(e) {
      if (this.tag === 1) return;

      const scrollTop = e.target.scrollTop + 69*2;
      const clientHeight = e.target.clientHeight;
      const scrollHeight = e.target.scrollHeight;

      // 滚动到定部则激活Tab第一项
      if (e.target.scrollTop === 0) {
        this.activeTab = this.tabTitles[0];
        return;
      }

      // 滚动到底部则激活Tab最后一项
      if (scrollTop >= (scrollHeight - clientHeight)) {
        this.activeTab = this.tabTitles[this.tabTitles.length - 1];
        return;
      }

      for (let i = 0; i < this.tabTitles.length; i++) {
        if (i === this.tabTitles.length - 1) {
          this.activeTab = this.tabTitles[i];
          return;
        }
        if (
          scrollTop >= this.tabTitles[i].anchorOffsetTop &&
          scrollTop < this.tabTitles[i + 1].anchorOffsetTop
        ) {
          this.activeTab = this.tabTitles[i];
          return;
        }
      }
    },
    // 提交表单
    submitForm() {
      // Api.save({
      //   json: JSON.stringify(this.data)
      // })
      //   .then(res => {
      //     this.$message.success(res.status.text);
      //   })
      //   .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>
$height: calc(100vh - 270px);
/deep/ .el-dialog__body {
  padding: 15px 10px 25px 20px;
}
/deep/ .el-dialog {
  margin-top: 50px !important;
}

.expert-detail {
  &-container {
    height: $height;
    display: flex;
  }

  &__left {
    min-width: 120px;
    position: relative;

    &:after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
      width: 2px;
      height: 100%;
      background-color: #dfe4ed;
      z-index: 1;
    }
  }

  &__right {
    width: 100%;
  }

  &-tab {
    min-width: 120px;
    /deep/ .el-tabs__nav {
      height: $height;
      min-width: 120px;
    }
    /deep/ .el-tabs__item.is-left {
      text-align: center;
    }

    /deep/ .el-tabs__item.is-active {
      background-color: #def7f3;
    }

    /deep/ .el-tabs__header.is-left {
      margin-right: 15px;
    }

    &__content {
      height: $height;
      padding-right: 10px;
      overflow-y: auto;
    }
  }

  &-content {
    height: $height;
    overflow-y: auto;
    padding-right: 10px;

    &__title {
      font-size: 16px;
      margin-bottom: 10px;
      font-weight: bold;
      // color: $color-primary;
    }

    &__cont {
      margin-bottom: 20px;
    }
  }
}

$border: 1px solid #ebeef5;
.info-table {
  width: 100%;
  border-top: $border;
  border-left: $border;

  &-container {
    height: 100%;
    min-height: 400px;
  }

  &__tr {
    display: flex;
  }

  &__th,
  &__td {
    padding: 12px 10px;
    border-bottom: $border;
    border-right: $border;
  }

  &__th {
    display: flex;
    align-items: center;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: #fafafa;
    width: 135px;
    min-width: 135px;
    max-width: 135px;

    .required::before {
      content: "*";
      color: $pink;
      margin-right: 5px;
    }
  }

  &__td {
    width: 100%;
  }

  &__icon {
    font-size: 20px;
  }
}

.color-green {
  color: $green;
}

.color-red {
  color: $red;
}

.head-pic {
  text-align: center;
  display: flex;
  align-items: center;
  height: 100%;

  img {
    min-width: 100px;
    max-width: 100px;
    max-height: 138px;
  }
}

.align-item-center {
  display: flex;
  align-items: center;
}

.table {
  width: 100%;

  &-add-btn {
    border: 1px solid #dfe6ec;
    margin-top: -1px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    position: relative;
    z-index: 10;
    color: $color-primary;

    &:hover {
      border-color: $color-primary;
    }

    & > i {
      margin-right: 5px;
    }
  }
}

.img-list {
  width: 724px;
  min-height: 200px;

  &__item {
    width: 100%;
    position: relative;
    margin-bottom: 15px;
    border: $border;

    &-btn {
      position: absolute;
      top: 15px;
      right: 15px;
    }

    &-img {
      display: block;
      width: 100%;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>