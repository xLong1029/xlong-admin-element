<template>
  <!-- eslint-disable -->
  <div class="account-manage-container overspread-page">
    <el-card shadow="never">
      <!-- 筛选 -->
      <el-form ref="filterParams" :model="filterParams" :inline="true" class="form-container">
        <el-form-item label="用户编号">
          <el-input
            v-model.trim="filterParams.id"
            size="small"
            clearable
            placeholder="请输入内容"
            @keyup.enter.native="search()"
          />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            v-model.trim="filterParams.mobile"
            size="small"
            clearable
            placeholder="请输入内容"
            @keyup.enter.native="search()"
          />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            v-model.trim="filterParams.email"
            size="small"
            clearable
            placeholder="请输入内容"
            @keyup.enter.native="search()"
          />
        </el-form-item>
        <el-form-item label="创建日期">
          <el-date-picker
            v-model="filterParams.createTime"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="dateChange"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="职位">
          <el-select v-model="filterParams.job" placeholder="请选择职位" @keyup.enter.native="search()">
            <el-option
              v-for="(item, index) in jobList"
              :key="'job' + index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在省市">
          <el-select
            v-model="filterParams.province"
            placeholder="请选择所在省市"
            @keyup.enter.native="search()"
          >
            <el-option
              v-for="(item, index) in provinceList"
              :key="'province' + index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select
            v-model="filterParams.enabledState"
            placeholder="请选择用户状态"
            @keyup.enter.native="search()"
          >
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="-1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">查询</el-button>
          <el-button @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 操作按钮 -->
      <div class="operate-btn-container">
        <el-button type="primary" @click="showStore()">添加</el-button>
        <pop-confirm title="确认删除?" class="mr-10 ml-10" @confirm="del()">
          <el-button type="warning" :disabled="selectList.length === 0" :loading="delLoading">删除</el-button>
        </pop-confirm>
        <el-button type="primary" :disabled="selectList.length === 0" :loading="enableLoading" @click="enableOrDisable(1)">启用</el-button>
        <el-button type="warning" :disabled="selectList.length === 0" :loading="disableLoading" @click="enableOrDisable(-1)">禁用</el-button>
      </div>
      <!-- 表格 -->
      <dynamic-table
        v-loading="listLoading"
        element-loading-text="加载中，请稍后..."
        class="table-container mt-20"
        :table-header="tableHeader"
        :table-data="listData"
        :table-height="tableHeight"
        :default-props="tableProps"
        :row-class-name="setRowClass"
        :showPagination="true"
        :total="page.total"
        :page-no.sync="page.pageNo"
        :page-size.sync="page.pageSize"
        :page-sizes.sync="page.pageSizes"
        @pagination="getList"
        @selection-change="getSelectList"
      >
        <el-table-column type="selection" width="55" fixed="left"></el-table-column>
        <el-table-column prop="enabledState" label="状态" align="center" width="100" fixed="right">
          <template slot-scope="{ row }">
            <el-tag v-if="row.enabledState === 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作" width="70" fixed="right">
          <template slot-scope="{ row }">
            <el-button size="mini" type="text" icon="el-icon-edit" @click="showStore(row)">编辑</el-button>
          </template>
        </el-table-column>
      </dynamic-table>
    </el-card>
    <!-- 存储弹窗 -->
    <account-store-dialog
      :visible.sync="storeDialog.visible"
      :id="storeDialog.id"
      :job-list="jobList"
      :province-list="provinceList"
      :profession-list="professionList"
      @submit="storeSuccess"
    />
  </div>
</template>

<script>
/* eslint-disable */
// 组件
import Pagination from "components/common/Pagination";
import DynamicTable from "components/common/Table/DynamicTable";
import AccountStoreDialog from "./store";
// Api方法
import Api from "api/account-manage";
// Json数据
import JsonCity from "mock/city.json";
import JsonData from "mock/data.json";
// mixins
import Page from "mixins/page.js";
import Table from "mixins/table.js";
import DateRange from "mixins/date-range-picker.js";
// 工具
import { timeTrans } from "utils";

export default {
  name: "AccountManage",
  components: { Pagination, DynamicTable, AccountStoreDialog },
  mixins: [Page, Table, DateRange],
  computed: {
    // 获取列表
    apiGetList(pageNo, pageSize) {
      return (pageNo, pageSize) =>
        Api.GetAccList(this.filterParams, pageNo, pageSize);
    },
    // 删除操作接口
    apiDelete(){
        return () => Api.DeleteAcc(this.selectList);
    },
    // 启/禁用操作接口
    apiEnable(enabledState){
        return (enabledState) => Api.EnableAcc({ enabledState }, this.selectList);
    },
  },
  data() {
    return {
      defaultParams: {
        // 用户编号
        id: "",
        // 手机号码
        mobile: "",
        // 邮箱
        email: "",
        // 职位
        job: "",
        // 地区
        province: "",
        // 起始时间
        sTime: "",
        // 结束时间
        eTime: "",
        // 状态
        enabledState: ""
      },
      filterParams: {},
      jobList: [],
      provinceList: [],
      professionList: [],
      tableHeader: [
        {
          title: "用户编号",
          key: "objectId",
          align: "center",
          width: 200
        },
        {
          title: "真实姓名",
          key: "realname",
          align: "center",
          width: 200
        },
        {
          title: "性别",
          key: "gender",
          align: "center"
        },
        {
          title: "手机号码",
          key: "mobile",
          align: "center",
          width: 200
        },
        {
          title: "邮箱",
          key: "email",
          align: "center",
          width: 200
        },
        {
          title: "职位",
          key: "job",
          align: "center"
        },
        {
          title: "所在省市",
          key: "province",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createdAt",
          align: "center",
          width: 200
        }
      ],
      tableProps: {
        prop: "key",
        label: "title"
      },
      listData: [],
      selectList: [],
      delLoading: false,
      enableLoading: false,
      disableLoading: false,
      storeDialog: {
        visible: false,
        id: null
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.filterParams = { ...this.defaultParams };
      this.jobList = JsonData.job;
      this.professionList = JsonData.profession;
      this.provinceList = JsonCity;      

      this.setTableHeight(385);
      this.getList(1, this.page.pageSize);
    },
    // 日期改变
    dateChange(vals) {
      if (!vals) {
        this.filterParams.sTime = "";
        this.filterParams.eTime = "";
        return;
      }
      this.filterParams.sTime = `${timeTrans(
        vals[0],
        "YYYY-MM-DD",
        "-"
      )} 00:00:00`;
      this.filterParams.eTime = `${timeTrans(
        vals[1],
        "YYYY-MM-DD",
        "-"
      )} 23:59:59`;
    },
    // 设置表格行样式
    setRowClass(data) {
      return data.row.enabledState === -1 ? "tr-disbale" : null;
    },
    // 显示编辑弹窗
    showStore(row) {
      this.storeDialog = {
        id: row ? row.objectId : null,
        visible: true
      }
    },
    // 存储操作成功 1 编辑 0 新增
    storeSuccess(type){
      type === 1 ? this.getList(this.page.pageNo, this.page.pageSize) : this.getList(1, this.page.pageSize);
    }
  }
};
</script>
<style lang="scss" scoped>
.account-manage-container {
  .page-list {
    text-align: center;
  }

  /deep/  .tr-disbale {
    background: #f8f8f9;
    color: #ccc;
  }  
}
.form-container {
  /deep/ .el-form-item {
    margin-bottom: 15px;
  }
}
</style>
