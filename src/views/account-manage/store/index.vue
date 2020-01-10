<template>
  <!-- eslint-disable -->
  <el-dialog
    :title="title"
    :visible="visible"
    :close-on-click-modal="false"
    width="900px"
    @close="close"
  >
    <div class="expert-detail-container" v-loading="loading" element-loading-text="加载中，请稍后...">
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
          <el-form ref="form" :model="form" :rules="validate">
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
                    </div>
                    <div class="info-table__tr">
                      <div class="info-table__th">
                        <span class="required">所在省市</span>
                      </div>
                      <div class="info-table__td">
                        <el-form-item prop="province">
                          <el-cascader
                            v-model="provinceValue"
                            :options="provinceList"
                            :props="provinceListProps"
                            placeholder="请选择所在省市"
                            style="width: 100%"
                            @change="provinceValueChange"
                          ></el-cascader>
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
                  <div class="info-table__th">
                    <span class="required">出生日期</span>
                  </div>
                  <div class="info-table__td">
                    <el-form-item prop="birthdate">
                      <el-date-picker
                        v-model="form.birthdate"
                        type="date"
                        placeholder="请选择日期"
                        style="width:100%"
                      ></el-date-picker>
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
                  <div class="info-table__th">通讯地址</div>
                  <div class="info-table__td">
                    <el-form-item>
                      <el-input v-model="form.address" placeholder="请输入内容"></el-input>
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

            <div class="expert-detail-content__title" id="workInfo">工作信息</div>
            <div class="expert-detail-content__cont">
              <div class="info-table">
                <div class="info-table__tr">
                  <div class="info-table__th">
                    <span class="required">工作单位名称</span>
                  </div>
                  <div class="info-table__td">
                    <el-form-item prop="companyName">
                      <el-input v-model="form.companyName" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </div>
                  <div class="info-table__th">
                    <span class="required">职位</span>
                  </div>
                  <div class="info-table__td">
                    <el-form-item prop="job">
                      <el-select v-model="form.job" placeholder="请选择职位">
                        <el-option
                          v-for="(item, index) in jobList"
                          :key="'job' + index"
                          :label="item.name"
                          :value="item.name"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="info-table__tr">
                  <div class="info-table__th">
                    <span class="required">参加工作时间</span>
                  </div>
                  <div class="info-table__td">
                    <el-form-item prop="workTime">
                      <el-date-picker
                        v-model="form.workTime"
                        type="date"
                        :placeholder="workTimePH"
                        :disabled="form.isGraduate"
                        class="mr-10"
                        style="width:80%"
                      ></el-date-picker>
                      <el-checkbox v-model="form.isGraduate" @change="graduateChange">尚未毕业</el-checkbox>
                    </el-form-item>
                  </div>
                </div>
                <div class="info-table__tr">
                  <div class="info-table__th">
                    <span class="required">专业领域</span>
                  </div>
                  <div class="info-table__td">
                    <el-form-item prop="profession">
                      <el-checkbox-group v-model="professionValue">
                        <el-checkbox
                          v-for="(item, index) in professionList"
                          :key="'profession' + index"
                          :label="item.name"
                        ></el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </div>
                <div class="info-table__tr"></div>
              </div>
            </div>

            <div class="expert-detail-content__title" id="workExperience">工作经历</div>
            <div class="expert-detail-content__cont">
              <el-table ref="table" :data="form.workExperience" border class="table">
                <el-table-column align="center" header-align="center">
                  <template slot="header">
                    <span class="required">起止年月</span>
                  </template>
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      label
                      :key="'workExperience.' + $index + '.date'"
                      :prop="'workExperience.' + $index + '.date'"
                      :rules="{ required: true, message: '请输入起止年月', trigger: 'blur' }"
                      class="mb-20"
                    >
                      <el-input
                        v-model="row.date"
                        type="textarea"
                        :autosize="{ minRows: 1 }"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column align="center" header-align="center">
                  <template slot="header">
                    <span class="required">单位及职务/职称</span>
                  </template>
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      label
                      :key="'workExperience.' + $index + '.unitAndPost'"
                      :prop="'workExperience.' + $index + '.unitAndPost'"
                      :rules="{ required: true, message: '请输入单位及职务/职称', trigger: 'blur' }"
                      class="mb-20"
                    >
                      <el-input
                        v-model="row.unitAndPost"
                        type="textarea"
                        :autosize="{ minRows: 1 }"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="witness" align="center" header-align="center">
                  <template slot="header">
                    <span class="required">证明人</span>
                  </template>
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      label
                      :key="'workExperience.' + $index + '.witness'"
                      :prop="'workExperience.' + $index + '.witness'"
                      :rules="{ required: true, message: '请输入证明人', trigger: 'blur' }"
                      class="mb-20"
                    >
                      <el-input
                        v-model="row.witness"
                        type="textarea"
                        :autosize="{ minRows: 1 }"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="action"
                  label="操作"
                  align="center"
                  header-align="center"
                  width="100"
                >
                  <template slot-scope="{ row, $index }">
                    <el-button
                      size="mini"
                      type="primary"
                      icon="el-icon-delete"
                      class="mb-15"
                      @click="deleteWorkExp(row, $index)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="table-add-btn" @click="addWorkExp()">
                <i class="el-icon-plus"></i>新增工作经历
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div slot="footer">
      <el-button @click="close">取消</el-button>
      <template>
        <el-button type="primary" @click="submit()">提交保存</el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
/* eslint-disable */
import Api from "api/account-manage";
import { docElmScrollTo } from "utils/scroll-to";
import { compareDate, timeTrans, arrToStr, strToArr, deepClone } from "utils";
import { validEmail, validMobile } from "utils/validate";

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
    },
    // 专业领域
    professionList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    const validBirthDate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择出生日期"));
      }
      let nowDate = new Date();
      const compare = compareDate(value, nowDate);
      if (!compare) return callback(new Error("出生日期不能大于当前日期"));
      else {
        return callback();
      }
    };
    const validateMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入手机号码"));
      } else if (!validMobile(value)) {
        return callback(new Error("手机号码格式不正确"));
      } else {
        return callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱地址"));
      } else if (!validEmail(value)) {
        return callback(new Error("邮箱格式不正确"));
      } else {
        return callback();
      }
    };
    const validateWorkTime = (rule, value, callback) => {
      if (this.form.isGraduate) return callback();
      if (!value) return callback(new Error("请选择工作时间"));
      else {
        // 日期比较
        let nowDate = new Date();
        const compare = compareDate(value, nowDate);
        if (!compare) return callback(new Error("工作时间不能大于当前日期"));
        else return callback();
      }
    };

    const validateProfession = (rule, value, callback) => {
      if (this.professionValue.length <= 0)
        return callback(new Error("请选择专业领域"));
      else {
        this.form.profession = arrToStr(this.professionValue, ",");
        return callback();
      }
    };

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
        },
        {
          index: 3,
          name: "工作经历",
          anchor: "workExperience",
          anchorOffsetTop: 0
        }
      ],
      // 当前激活tab
      activeTab: {},
      form: {
        area: "",
        birthdate: "",
        city: "",
        companyName: "",
        email: "",
        face: null,
        gender: "男",
        isGraduate: false,
        job: "",
        mobile: "",
        profession: "",
        province: "",
        realname: "",
        workTime: "",
        address: "",
        remark: "",
        workExperience: []
      },
      // 验证规则
      validate: {
        realname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        gender: [
          { required: true, message: "请选择性别", trigger: "change" }
        ],
        birthdate: [
          {
            required: true,
            validator: validBirthDate,
            trigger: "change"
          }
        ],
        province: [
          { required: true, message: "请选择所在省市", trigger: "change" }
        ],
        mobile: [
          {
            required: true,
            validator: validateMobile,
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            validator: validateEmail,
            trigger: "blur"
          }
        ],
        companyName: [
          { required: true, message: "请输入工作单位名称", trigger: "blur" }
        ],
        job: [{ required: true, message: "请选择职位", trigger: "change" }],
        workTime: [
          {
            required: true,
            validator: validateWorkTime,
            trigger: "blur"
          }
        ],
        profession: [
          { required: true, validator: validateProfession, trigger: "change" }
        ]
      },
      // 工作时间
      workTimePH: "请选择日期",
      // 所在省市
      provinceValue: [],
      provinceListProps: {
        label: "name",
        value: "name",
        children: "childs"
      },
      // 专业领域
      professionValue: [],
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
      this.form.workExperience = [];
      this.activeTab = this.tabTitles[0];

      if (!this.id) {
        this.title = "添加用户";
        this.$nextTick(() => this.getTabsPosition());
        return;
      }

      this.title = "用户信息详情";

      this.loading = true;
      Api.GetAccInfo(this.id)
        .then(res => {
          const result = res.data;
          if (res.code == 200) {
            // 设置数据
            this.form = {...this.form, ...result};
            // 设置省市值
            this.provinceValue = [
              this.form.province,
              this.form.city,
              this.form.area
            ];
            // 设置出生日期
            this.form.birthdate = this.form.birthdate ? new Date(this.form.birthdate) : "";
            // 设置工作时间
            this.workTimePH = this.form.isGraduate ? "尚未毕业" : "请选择日期";
            this.form.workTime = this.form.workTime ? new Date(this.form.workTime) : "";
            // 截取专业领域
            this.professionValue = this.form.profession ? strToArr(this.form.profession, ",") : [];

            this.$nextTick(() => this.getTabsPosition());
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

      const scrollTop = e.target.scrollTop + 69 * 2;
      const clientHeight = e.target.clientHeight;
      const scrollHeight = e.target.scrollHeight;
      // console.log(scrollTop, clientHeight, scrollHeight);

      // 滚动到定部则激活Tab第一项
      if (e.target.scrollTop === 0) {
        this.activeTab = this.tabTitles[0];
        return;
      }

      // 滚动到底部则激活Tab最后一项
      if (scrollTop >= scrollHeight - clientHeight) {
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
    // 所在省市值改变
    provinceValueChange(val) {
      this.form.province = val[0];
      this.form.city = val[1] ? val[1] : "";
      this.form.area = val[2] ? val[2] : "";
    },
    // 毕业选项值改变
    graduateChange(val) {
      this.disabledWT = val;
      this.workTimePH = val ? "尚未毕业" : "请选择日期";
      this.form.workTime = "";
      this.$refs.form.clearValidate("workTime");
    },
    // 新增工作经验
    addWorkExp() {
      this.form.workExperience.push({
        date: "",
        // unitAndPost: "",
        // witness: ""
      });
    },
    // 删除工作经验
    deleteWorkExp(row, index) {
      this.form.workExperience.splice(index, 1);
    },
    // 重置表单
    reset() {
      this.$refs.form.resetFields();      
      this.provinceValue = [];
      this.professionValue = [];
    },
    // 关闭弹窗
    close() {
      this.reset();

      this.$emit("cancel-click", false);
      this.$emit("update:visible", false);
    },
    // 提交表单
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let params = {...this.form};
          params.birthdate = params.birthdate === "" ? "" : timeTrans(params.birthdate, "YYYY-MM-DD", "-");
          params.workTime = params.isGraduate ? "" : timeTrans(params.workTime, "YYYY-MM-DD", "-");
          this.id ? this.$emit("edit", deepClone(params), this.id) : this.$emit("add", deepClone(params));
          this.close();
        } else {
          this.$message.error("提交失败！请检查填写是否有误");
        }
      });
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

  &__td {
    padding-bottom: 0;
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

  /deep/ td{
    padding-bottom: 0;
  }

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

.required::before {
  content: "*";
  color: $pink;
  margin-right: 5px;
}
</style>