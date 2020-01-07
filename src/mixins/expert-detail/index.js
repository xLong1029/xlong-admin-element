/* eslint-disable */
import { docElmScrollTo } from "@/utils/scroll-to";
const VUE_APP_SERVER_API = process.env.VUE_APP_SERVER_API;

export default {
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
          name: "工作经历",
          anchor: "workInfo",
          anchorOffsetTop: 0
        },
        {
          index: 3,
          name: "执业资格",
          anchor: "qualification",
          anchorOffsetTop: 0
        },
        {
          index: 4,
          name: "申报信息",
          anchor: "declareInfo",
          anchorOffsetTop: 0
        },
        {
          index: 6,
          name: "证件照片",
          anchor: "docPhotoAttachment",
          anchorOffsetTop: 0
        },
        {
          index: 7,
          name: "其他附件",
          anchor: "otherAttachment",
          anchorOffsetTop: 0
        }
      ],
      // 当前激活tab
      activeTab: {},
      defaultData: {
        baseInfo: {
          name: "",
          sex: "",
          birthday: "",
          age: "",
          areaName: "",
          politicalStatus: "",
          idCard: "",
          workingYears: "",
          headImgUrl: "",
          workingMajor: "",
          highestEducation: "",
          highestDegree: "",
          hasQualityManagementSystemAuditorCertificate: false,
          hasLaboratoryAccreditationAuditorCertificate: false,
          industry: "",
          post: "",
          mobilePhone: "",
          workUnitPhone: "",
          homeTelephone: "",
          postalAddressAndEmail: "",
          graduateSchoolAndMajor: "",
          workUnit: "",
          workUnitAddress: "",
          workUnitZipCode: "",
          homeAddress: "",
          homeAddressZipCode: "",
          workPracticalExperience: "",
          achievements: "",
          otherSituation: ""
        },
        workInfo: [],
        qualification: [],
        declareInfo: {
          declarationType: "",
          declarationNature: "",
          declarationCity: "",
          declarationPersonalType: "",
          reportingUnitName: "",
          reportingUnitApplicant: "",
          reportingUnitTelephone: "",
          briefIntroduction: "",
          selfRecommendationReason: "",
          workUnitReason: "",
          remark: ""
        },
        docPhotoAttachment: [],
        otherAttachment: []
      },
      data: {},
      // 判断是点击滚动还是手动滚动 1：点击，2：手动
      tag: 2,
      baseUrl: VUE_APP_SERVER_API
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.data = { ...this.defaultData };
        this.init();
      }
    }
  },
  methods: {
    // 初始化
    init() {
      /* 测试数据-start */

      // for (let i = 1; i < 5; i++) {
      //   this.data.docPhotoAttachment.push({
      //     url: require("@/assets/test_images/1.jpg")
      //   });

      //   this.data.workInfo.push({
      //     startAndEndYearMonth: "2003.07~2011.03",
      //     workUnitAndPost: "广西大学设计院",
      //     witness: "甘书文"
      //   });

      //   this.data.qualification.push({
      //     no: i,
      //     name: "高级工程师",
      //     code: "131094",
      //     approvalDate: "2003.07",
      //     termOfValidity: "2023.07"
      //   });

      //   this.data.otherAttachment.push({
      //     no: i,
      //     name: "test.docx",
      //     url: '/static/file/test.docx'
      //   });
      // }

      // this.title = this.data.baseInfo.name + "-信息详情";
      // this.$nextTick(() => this.getTabsPosition());
      /* 测试数据-end */
    },
    // 获取每个tab对应的锚点位置
    getTabsPosition() {
      this.activeTab = this.tabTitles[0];
      this.tabTitles.forEach(e => {
        const elm = this.$refs[e.anchor];
        e.anchorOffsetTop = elm.offsetTop;
      });
    },
    // 关闭弹窗
    close() {
      this.$emit("cancel-click", false);
      this.$emit("update:visible", false);
    },
    // 选中tab,获取选中实例
    selectTab(e) {
      this.activeTab = this.tabTitles[e.index];
      const destination = this.$refs[this.activeTab.anchor];
      this.tag = 1;
      const _this = this;
      docElmScrollTo(
        this.$refs.detailContent,
        destination.offsetTop - 69,
        500,
        function () {
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
    }
  }
}
