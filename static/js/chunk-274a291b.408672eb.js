(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-274a291b"],{"0acd":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"components-container overspread-page"},[a("el-card",{attrs:{shadow:"never"}},[a("el-form",{ref:"form",attrs:{model:t.form,size:"small","label-width":"100px"}},[a("description",{attrs:{title:"背景图片上传组件"}},[a("el-form-item",{staticClass:"components__example",attrs:{label:"应用背景图：",prop:"imgUrl"}},[a("background-upload",{attrs:{"img-select-index":t.imgSelectIndex,"img-list":t.imgDefaultList,"file-size":2048,"size-hint":"285*150px"},on:{"update:imgSelectIndex":function(e){t.imgSelectIndex=e},"update:img-select-index":function(e){t.imgSelectIndex=e},"update:imgList":function(e){t.imgDefaultList=e},"update:img-list":function(e){t.imgDefaultList=e},preview:t.imgPreview,"upload-success":t.setBackgroundImg,"select-img":t.setBackgroundImg}})],1),a("el-collapse",{attrs:{model:1}},[a("el-collapse-item",{attrs:{title:"查看属性",name:"1"}},[a("div",{staticClass:"components__desc"},[a("p",[t._v("属性：")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("imgList")]),t._v("：默认图片列表。Array类型 ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("imgSelectIndex")]),t._v("：当前选中索引。Number类型，默认值为0 ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("sizeHint")]),t._v('：是否显示图片尺寸建议。String类型，默认不显示。设置其他值：size-hint="100*100px" ')]),a("p",[a("span",{staticClass:"attr-text"},[t._v("fileSize")]),t._v("：设置最大图片文件大小，单位kb。Number类型，默认值为150 ")]),a("p",[t._v("事件：")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("select-img")]),t._v("：选中图片时触发，返回该图片URL ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("upload-success")]),t._v("：上传成功时触发，返回该图片URL ")])])])],1)],1),a("description",{attrs:{title:"图片上传组件"}},[a("el-form-item",{staticClass:"components__example",attrs:{label:"图片：",prop:"imgList"}},[a("img-upload",{attrs:{"img-list":t.form.imgList,"file-size":10240},on:{"upload-success":function(e){return t.upload(e,"form","imgList")},preview:t.imgPreview}})],1),a("el-collapse",{attrs:{model:1}},[a("el-collapse-item",{attrs:{title:"查看属性",name:"1"}},[a("div",{staticClass:"components__desc"},[a("p",[t._v("属性：")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("imgList")]),t._v("：图片列表。Array类型 ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("showSizeHint")]),t._v("：是否显示尺寸提示文本。Boolean类型，默认值为true ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("sizeHint")]),t._v('：上传尺寸提示文本。String类型，默认值为"100*100px" ')]),a("p",[a("span",{staticClass:"attr-text"},[t._v("showFileSize")]),t._v("：是否显示文件大小提示文本。Boolean类型，默认值为true ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("fileSize")]),t._v("：设置最大图片文件大小，单位kb。Number类型，默认值为150 ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("canPreview")]),t._v("：是否可预览。Boolean类型，默认值为true ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("canDownload")]),t._v("：是否可下载。Boolean类型，默认值为true ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("data")]),t._v(" ：上传要附带的额外参数。Object类型，默认值为{} ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("fileFormat")]),t._v('：提示文件格式。String类型，默认值为"png / jpg / gif" ')]),a("p",[a("span",{staticClass:"attr-text"},[t._v("onCheckFormat")]),t._v("：检查上传文件格式。Function类型，默认值为defaultFormat(file) ")]),a("p",[t._v("事件：")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("preview")]),t._v("：点击预览按钮时触发，返回该图片file ")])])])],1)],1),a("description",{attrs:{title:"文件上传组件"}},[a("el-form-item",{staticClass:"components__example",attrs:{label:"附件：",prop:"fileList"}},[a("file-upload",{attrs:{"file-format":"doc / docx","file-list":t.form.fileList,"file-size":10240,"on-check-format":t.checkFileFormat},on:{"upload-success":function(e){return t.upload(e,"form","fileList")},preview:t.imgPreview}})],1),a("el-collapse",{attrs:{model:1}},[a("el-collapse-item",{attrs:{title:"查看属性",name:"1"}},[a("div",{staticClass:"components__desc"},[a("p",[t._v("属性：")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("fileList")]),t._v("：文件列表。Array类型 ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("showSizeHint")]),t._v("：是否显示尺寸提示文本。Boolean类型，默认值为true ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("fileSize")]),t._v("：设置最大文件大小，单位以上KB，单位kb。Number类型，默认值为150 ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("canDownload")]),t._v("：是否可下载。Boolean类型，默认值为true ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("data")]),t._v(" ：上传要附带的额外参数。Object类型，默认值为{} ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("fileFormat")]),t._v('：提示文件格式。String类型，默认值为"" ')]),a("p",[a("span",{staticClass:"attr-text"},[t._v("onCheckFormat")]),t._v("：检查上传文件格式。Function类型，默认值为noop(file) ")]),a("p",[t._v("事件：")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("download")]),t._v("：点击下载按钮时触发，返回该文件 ")])])])],1)],1),a("description",{attrs:{title:"文件上传组件（列表形式）"}},[a("el-form-item",{staticClass:"components__example",attrs:{label:"附件：",prop:"fileList"}},[a("list-upload",{attrs:{"file-format":"doc / docx","file-list":t.form.fileList2,"file-size":10240,"on-check-format":t.checkFileFormat},on:{"upload-success":function(e){return t.upload(e,"form","fileList2")},preview:t.imgPreview}})],1),a("el-collapse",{attrs:{model:1}},[a("el-collapse-item",{attrs:{title:"查看属性",name:"1"}},[a("div",{staticClass:"components__desc"},[a("p",[t._v("属性：")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("fileList")]),t._v("：文件列表。Array类型 ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("showSizeHint")]),t._v("：是否显示尺寸提示文本。Boolean类型，默认值为true ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("fileSize")]),t._v("：设置最大文件大小，单位以上KB，单位kb。Number类型，默认值为150 ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("canDownload")]),t._v("：是否可下载。Boolean类型，默认值为true ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("canDelete")]),t._v("：是否可删除。Boolean类型，默认值为true ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("data")]),t._v(" ：上传要附带的额外参数。Object类型，默认值为{} ")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("fileFormat")]),t._v('：提示文件格式。String类型，默认值为"" ')]),a("p",[a("span",{staticClass:"attr-text"},[t._v("onCheckFormat")]),t._v("：检查上传文件格式。Function类型，默认值为noop(file) ")]),a("p",[t._v("事件：")]),a("p",[a("span",{staticClass:"attr-text"},[t._v("download")]),t._v("：点击下载按钮时触发，返回该文件 ")])])])],1)],1)],1)],1),a("img-preview",{attrs:{visible:t.imgDialog.visible,"img-url":t.imgDialog.imgUrl},on:{"update:visible":function(e){return t.$set(t.imgDialog,"visible",e)},close:t.cancelPreview}})],1)},i=[],l=a("cb2c"),n=a("c0a0"),o=a("8522"),c=a("c849"),r={name:"Components",components:{BackgroundUpload:l["default"],ImgUpload:n["default"],FileUpload:o["default"],ListUpload:c["default"]},data:function(){return{imgDialog:{visible:!1,imgUrl:""},imgSelectIndex:0,form:{imgUrl:"",imgList:[],fileList:[],fileList2:[]}}},created:function(){this.init()},methods:{init:function(){this.imgDefaultList=[{url:"http://xlongadmin.xlong.club/2020/01/14/efe90c5b403d25858000703e92082e96.png"},{url:"http://xlongadmin.xlong.club/2020/01/14/c8f1895a40ca2cf680223dad40350cba.png"},{url:"http://xlongadmin.xlong.club/2020/01/14/e1fc831640c2c01b80f0301bb4c7ae6c.png"},{url:"http://xlongadmin.xlong.club/2020/01/14/d7fe867f4045c9e0804d3a1d5bf346eb.png"},{url:"http://xlongadmin.xlong.club/2020/01/14/05934def403bb69780538f13db398090.png"},{url:"http://xlongadmin.xlong.club/2020/01/14/03519e6640d358a980c7a2b7ed52241f.png"}]},checkFileFormat:function(t){return"application/vnd.openxmlformats-officedocument.wordprocessingml.document"===t.type||"application/msword"===t.type||(this.$message.warning("文件只能是 doc 、docx 格式"),!1)},upload:function(t,e,a){this.form[a]=t,t.length&&e&&this.$refs[e].clearValidate(a)},imgPreview:function(t){this.imgDialog={visible:!0,imgUrl:t.url}},setBackgroundImg:function(t){this.form.imgUrl=t},cancelPreview:function(){this.imgDialog={visible:!1,title:null,imgUrl:null}}}},p=r,m=(a("e8d8"),a("0c7c")),d=Object(m["a"])(p,s,i,!1,null,"033629a3",null);e["default"]=d.exports},9431:function(t,e,a){},e8d8:function(t,e,a){"use strict";a("9431")}}]);