<template>
  <!-- eslint-disable -->
  <div class="components-container overspread-page">
    <el-card shadow="never">
      <el-form :model="form" ref="form" size="small" label-width="100px">
        <description title="背景图片上传组件">
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
          <el-collapse :model="1">
            <el-collapse-item title="查看属性" name="1">
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
            </el-collapse-item>
          </el-collapse>
          <!-- <el-divider></el-divider> -->
        </description>
        <description title="图片上传组件">
          <el-form-item label="图片：" prop="imgList" class="components__example">
            <img-upload
              :img-list="form.imgList"
              :file-size="10240"
              @upload-success="upload($event, 'form', 'imgList')"
              @preview="imgPreview"
            />
          </el-form-item>
          <el-collapse :model="1">
            <el-collapse-item title="查看属性" name="1">
              <div class="components__desc">
                <p>属性：</p>
                <p>
                  <span class="attr-text">imgList</span>：图片列表。Array类型
                </p>
                <p>
                  <span class="attr-text">showSizeHint</span>：是否显示尺寸提示文本。Boolean类型，默认值为true
                </p>
                <p>
                  <span class="attr-text">sizeHint</span>：上传尺寸提示文本。String类型，默认值为"100*100px"
                </p>
                <p>
                  <span class="attr-text">showFileSize</span>：是否显示文件大小提示文本。Boolean类型，默认值为true
                </p>
                <p>
                  <span class="attr-text">fileSize</span>：设置最大图片文件大小，单位kb。Number类型，默认值为150
                </p>
                <p>
                  <span class="attr-text">canPreview</span>：是否可预览。Boolean类型，默认值为true
                </p>
                <p>
                  <span class="attr-text">canDownload</span>：是否可下载。Boolean类型，默认值为true
                </p>
                <p>
                  <span class="attr-text">data</span>
                  ：上传要附带的额外参数。Object类型，默认值为{}
                </p>
                <p>
                  <span class="attr-text">fileFormat</span>：提示文件格式。String类型，默认值为"png / jpg / gif"
                </p>
                <p>
                  <span class="attr-text">onCheckFormat</span>：检查上传文件格式。Function类型，默认值为defaultFormat(file)
                </p>
                <p>事件：</p>
                <p>
                  <span class="attr-text">preview</span>：点击预览按钮时触发，返回该图片file
                </p>
              </div>
            </el-collapse-item>
          </el-collapse>
        </description>
        <description title="文件上传组件">
          <el-form-item label="附件：" prop="fileList" class="components__example">
            <file-upload
              file-format="doc / docx"
              :file-list="form.fileList"
              :file-size="10240"
              :on-check-format="checkFileFormat"
              @upload-success="upload($event, 'form', 'fileList')"
              @preview="imgPreview"
            />
          </el-form-item>
          <el-collapse :model="1">
            <el-collapse-item title="查看属性" name="1">
              <div class="components__desc">
                <p>属性：</p>
                <p>
                  <span class="attr-text">fileList</span>：文件列表。Array类型
                </p>
                <p>
                  <span class="attr-text">showSizeHint</span>：是否显示尺寸提示文本。Boolean类型，默认值为true
                </p>
                <p>
                  <span class="attr-text">fileSize</span>：设置最大文件大小，单位以上KB，单位kb。Number类型，默认值为150
                </p>
                <p>
                  <span class="attr-text">canDownload</span>：是否可下载。Boolean类型，默认值为true
                </p>
                <p>
                  <span class="attr-text">data</span>
                  ：上传要附带的额外参数。Object类型，默认值为{}
                </p>
                <p>
                  <span class="attr-text">fileFormat</span>：提示文件格式。String类型，默认值为""
                </p>
                <p>
                  <span class="attr-text">onCheckFormat</span>：检查上传文件格式。Function类型，默认值为noop(file)
                </p>
                <p>事件：</p>
                <p>
                  <span class="attr-text">download</span>：点击下载按钮时触发，返回该文件
                </p>
              </div>
            </el-collapse-item>
          </el-collapse>
        </description>
        <description title="文件上传组件（列表形式）">
          <el-form-item label="附件：" prop="fileList" class="components__example">
            <list-upload
              file-format="doc / docx"
              :file-list="form.fileList2"
              :file-size="10240"
              :on-check-format="checkFileFormat"
              @upload-success="upload($event, 'form', 'fileList2')"
              @preview="imgPreview"
            />
          </el-form-item>
          <el-collapse :model="1">
            <el-collapse-item title="查看属性" name="1">
              <div class="components__desc">
                <p>属性：</p>
                <p>
                  <span class="attr-text">fileList</span>：文件列表。Array类型
                </p>
                <p>
                  <span class="attr-text">showSizeHint</span>：是否显示尺寸提示文本。Boolean类型，默认值为true
                </p>
                <p>
                  <span class="attr-text">fileSize</span>：设置最大文件大小，单位以上KB，单位kb。Number类型，默认值为150
                </p>
                <p>
                  <span class="attr-text">canDownload</span>：是否可下载。Boolean类型，默认值为true
                </p>
                <p>
                  <span class="attr-text">canDelete</span>：是否可删除。Boolean类型，默认值为true
                </p>
                <p>
                  <span class="attr-text">data</span>
                  ：上传要附带的额外参数。Object类型，默认值为{}
                </p>
                <p>
                  <span class="attr-text">fileFormat</span>：提示文件格式。String类型，默认值为""
                </p>
                <p>
                  <span class="attr-text">onCheckFormat</span>：检查上传文件格式。Function类型，默认值为noop(file)
                </p>
                <p>事件：</p>
                <p>
                  <span class="attr-text">download</span>：点击下载按钮时触发，返回该文件
                </p>
              </div>
            </el-collapse-item>
          </el-collapse>
        </description>
      </el-form>
    </el-card>
    <!-- 图片预览 -->
    <img-preview
      :visible.sync="imgDialog.visible"
      :img-url="imgDialog.imgUrl"
      @close="cancelPreview"
    />
  </div>
</template>

<script>
/* eslint-disable */
import BackgroundUpload from "components/common/Upload/BackgroundUpload";
import ImgUpload from "components/common/Upload/ImgUpload";
import FileUpload from "components/common/Upload/FileUpload";
import ListUpload from "components/common/Upload/ListUpload";

export default {
  name: "Components",
  components: { BackgroundUpload, ImgUpload, FileUpload, ListUpload },
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
        imgUrl: "",
        imgList: [],
        fileList: [],
        fileList2: []
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
    // 检查上传文件格式
    checkFileFormat(file) {
      // 文件格式
      if (
        !(
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.type === "application/msword"
        )
      ) {
        this.$message.warning("文件只能是 doc 、docx 格式");
        return false;
      }
      return true;
    },
    // 上传
    upload(e, formName, attr) {
      console.log(e);
      this.form[attr] = e;
      if (e.length && formName) {
        this.$refs[formName].clearValidate(attr);
      }
    },
    // 图片预览
    imgPreview(file) {
      this.imgDialog = {
        visible: true,
        imgUrl: file.url
      };
    },
    // 设置背景图片
    setBackgroundImg(url) {
      this.form.imgUrl = url;
    },
    // 取消预览
    cancelPreview() {
      this.imgDialog = {
        visible: false,
        title: null,
        imgUrl: null
      };
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .el-collapse-item__content {
  padding-bottom: 5px;
}

::v-deep .el-collapse-item__header{
  padding-left: 10px;

  &.is-active {
  background: #f8f8f8;
  }
}

.components {
  &__desc {
    color: #888;
    .attr-text {
      color: $color-primary;
    }
  }
}
</style>
