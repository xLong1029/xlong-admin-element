# xlong-admin-element

## 重要通知！！！ 
我的账号在Github开启2FA设置后，因某种原因丢失恢复码导致账号无法登录，日后该账号下的所有项目在github不再更新，若想查看持续更新的项目请移步到 [我的码云仓库](https://gitee.com/xlong1029)

## 介绍

xlong-admin-element 是一套基于 Vue + Element + Mock 开发的单页面客户端渲染管理后台系统示例。  

温馨提示：  
1. 原来使用Bmob开发的版本用的是开发版套餐（2022 年 5 月 5 日起，Bomb已对开发版应用创建时间超过 12 个月的停止免费服务），因为穷不想充值，所以不打算继续维护了。  
2. Bmob版传送门：[develop-vite-bmob](https://github.com/xLong1029/xlong-admin-element/tree/develop-bmob)

*该项目仅作学习参考，请勿商用

## 项目展示

> DEMO地址：https://xlong1029.github.io/xlong-admin-element/#/Login

## 项目用到技术、框架与插件
[Vue.js](https://github.com/vuejs)<br/>
[webpack](https://github.com/webpack)<br/>
[Element](https://github.com/ElemeFE/element)<br/>
[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)<br/>
[ECharts](https://www.echartsjs.com/zh)<br/>
[Mock](http://mockjs.com/) 

## 部分项目运行截图
* 登录界面

![Image text](static/images/screen-1.gif)

* 组件展示

![Image text](static/images/screen-2.gif)

* 账户管理

![Image text](static/images/screen-3.gif)

![Image text](static/images/screen-4.gif)

* 监控大屏

![Image text](static/images/screen-5.gif)

![Image text](static/images/screen-6.gif)

## 目录结构

```
│  .editorconfig
│  .env.development // 开发环境配置
│  .env.production // 生产环境配置
│  .env.release // release正式库环境配置
│  .env.staging // stage正式库环境配置
│  .eslintignore
│  .eslintrc.js
│  .gitignore
│  .travis.yml
│  babel.config.js // babel配置
│  jest.config.js
│  jsconfig.json
│  package.json
│  postcss.config.js // CSS转换配置
│  vue.config.js // 配置文件
│  README.md
│
├─pubilc
│   favicon.ico // 图标
│   index.html // 首页入口文件
│
├─src
│  │  main.js // 项目入口js
│  │  permission.js // 角色权限配置
│  │  App.vue // 根组件
│  │
│  ├─assets // 资源目录，这里的资源会被wabpack构建
│  ├─api // api接口文件
│  ├─store  // 应用级数据（state）
│  ├─styles  // 样式
│  │
│  ├─mock // 模拟请求数据
│  │    index.js // mock数据
│  │    mock-handle.js // mock数据处理
│  │    mock-server.js // mock服务
│  │
│  ├─filters // 过滤器
│  │    index.js
│  │
│  ├─config // 项目配置
│  │    index.js
│  │
│  ├─components // 功能组件
│  │  │
│  │  ├─common // 通用组件
│  │  └─statistics-screen // 监控大屏相关组件
│  │
│  ├─layout // 布局
│  │  │
│  │  │  
│  │  ├─ default // 基础布局
│  │  │   │  index.vue
│  │  │   │
│  │  │   └─components // 布局组件
│  │  │      │  index.js
│  │  │      │  
│  │  │      ├─AppFooter // 底部
│  │  │      ├─AppMain // 主页面
│  │  │      ├─Breadcrumb // 面包屑
│  │  │      └─Navbar // 导航
│  │  │
│  │  └─ fullscreen // 全屏布局
│  │
│  ├─views // 视图
│  │  │
│  │  ├─account-manage // 账户管理
│  │  ├─change-password // 修改密码
│  │  ├─components // 组件展示相关
│  │  ├─error-page // 错误页面
│  │  ├─home // 主页
│  │  ├─login // 登录
│  │  ├─redirect // 重定向
│  │  └─statistics-screen // 监控大屏
│  │
│  ├─mixins // 混合模块
│  │  │  date-range-picker.js // 日期范围选择配置
│  │  │  response.js // 响应式配置
│  │  │  page.js // 页码配置
│  │  │  table.js // 表格相关操作
│  │  │  upload.js // 上传图片
│  │  │
│  │  └─chart
│  │
│  ├─utils // 通用工具函数
│  │    index.js
│  │    auth.js // 读写token
│  │    get-page-title.js // 页面标题
│  │    request.js // 请求配置
│  │    scroll-to.js // 页面滚动
│  │    validate.js // 验证
│  │
│  └─router  // 路由配置
│     │  index.js
│     │  
│     └─modules // 分模块的动态路由
│
├─static // 静态资源
│
└─tests // 单元测试文件
```

## 本地运行
1. 安装前台依赖
> npm install
2. 运行前台项目
> npm run dev
3. 访问地址：http://localhost:9090

## 项目打包
按需求选择打包命令(请将vue.config.js中publicPath改成你的项目)：

> npm run build:prod

> npm run build:release

> npm run build:stageing

## 作者联系方式

QQ：381612175
TEL: 18376686974

github：https://github.com/xLong1029/

站酷主页：http://xlong.zcool.com.cn/

UI中国：http://i.ui.cn/ucenter/358591.html

* 此项目做学习Vuejs测试使用，有什么问题可联系我讨论
