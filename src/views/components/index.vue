<template>
  <!-- eslint-disable -->
  <div class="components-container overspread-page">
    <el-card shadow="never">
      <el-form :model="form" ref="form" size="small" label-width="100px">
        <description title="图片上传组件">
          <el-form-item label="应用背景图：" prop="imgUrl" class="components__example">
            <background-upload
              :img-select-index.sync="imgSelectIndex"
              :img-list.sync="imgDefaultList"
              :file-size="2048"
              size-hint="285*150px"
              @preview="imgPreview"
              @upload-success="setBackgroundImg"
              @select-img="setBackgroundImg"
            />
          </el-form-item>
          <el-divider></el-divider>
          <div class="components__desc">
            <p>属性：</p>
            <p>
              <span class="attr-text">imgList</span>：默认图片列表。Array类型
            </p>
            <p>
              <span class="attr-text">imgSelectIndex</span>：当前选中索引。Number类型，默认值为0
            </p>
            <p>
              <span class="attr-text">sizeHint</span>：是否显示图片尺寸建议。String类型，默认不显示。设置其他值：size-hint="100*100px"
            </p>
            <p>
              <span class="attr-text">fileSize</span>：设置最大图片文件大小，单位kb。Number类型，默认值为150
            </p>
            <p>事件：</p>
            <p>
              <span class="attr-text">select-img</span>：选中图片时触发，返回该图片URL
            </p>
            <p>
              <span class="attr-text">upload-success</span>：上传成功时触发，返回该图片URL
            </p>
          </div>
        </description>
      </el-form>
    </el-card>
    <!-- 查看图片 -->
    <el-dialog :visible.sync="imgDialog.visible">
      <img width="100%" :src="imgDialog.imageUrl" />
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import BackgroundUpload from "components/common/Upload/BackgroundUpload";

export default {
  name: "Components",
  components: { BackgroundUpload },
  data() {
    return {
      // 预览窗口
      imgDialog: {
        visible: false,
        imgUrl: ""
      },
      // 当前选中索引
      imgSelectIndex: 0,
      form: {
        imgUrl: ""
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.imgDefaultList = [
        {
          url:
            "http://xlongadmin.xlong.club/2020/01/14/efe90c5b403d25858000703e92082e96.png"
        },
        {
          url:
            "http://xlongadmin.xlong.club/2020/01/14/c8f1895a40ca2cf680223dad40350cba.png"
        },
        {
          url:
            "http://xlongadmin.xlong.club/2020/01/14/e1fc831640c2c01b80f0301bb4c7ae6c.png"
        },
        {
          url:
            "http://xlongadmin.xlong.club/2020/01/14/d7fe867f4045c9e0804d3a1d5bf346eb.png"
        },
        {
          url:
            "http://xlongadmin.xlong.club/2020/01/14/05934def403bb69780538f13db398090.png"
        },
        {
          url:
            "http://xlongadmin.xlong.club/2020/01/14/03519e6640d358a980c7a2b7ed52241f.png"
        }
      ];
    },
    // 图片预览
    imgPreview(file) {
      this.imgDialog.imageUrl = file.url;
      this.imgDialog.visible = true;
    },
    // 设置背景图片
    setBackgroundImg(url) {
      this.form.imgUrl = url;
    }
  }
};
</script>
<style lang="scss" scoped>
.components {
  &__desc {
    color: #888;
  }
}
</style>
