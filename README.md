## react business component template

> 用于对接cli命令行工具的脚手架模版

### 工程目录

```
.
├── README.md         # README
├── meta.js           # 问询配置文件
├── package.json      # package.json
└── template          # 模版存放路径
```
### 注意事项
- 提交模板的时候不要把打包后的dist文件夹提交上去了，开发组件的时候dist是需要提交到git仓库的
- webpack 打包技巧
  - webpack.prod.conf.js 导出（module.exports） 一个配置数组可以实现打包出不同的文件夹
  - 打包一个库时 output 要配置 libraryTarget: 'umd'
  - 排除依赖externals，字符串改成函数，可实现基础ui组件库的按需加载打包，可以减少包体积
  - devServer 的 hotOnly: true 属性会使页面即时刷新功能（webpack-dev-server 的 --hot 模式）失效，最好去掉；react-hot-loader 是局部刷新（页面不会刷新）

- 打包库方式改用babel编译（需安装babel-cli）直接对src 目录进行编译，可大大减少包的体积，与webpack 的区别是：babel打包的
包只支持es模块的引入的方式，webpack打的包可以任何方式引入的。项目中基本都是es模块（import）引入的，所以是OK的，和rollup打包工具类似？
- 在项目中本地调试组件的方法：npm link
- 文章参考
  - [如何从零开源一个React组件](https://zhuanlan.zhihu.com/p/73605806)
  - [从工程化角度讨论如何快速构建可靠React组件](https://github.com/lcxfs1991/blog/issues/18)
  - [@babel/cli](https://www.babeljs.cn/docs/babel-cli)

### 遗留问题
- 1、如果使用webpack 打业务组件库包的话，样式文件如何打包？是打在js 里，这样文件会太大？还是抽离成单独的样式文件，这样组件样式好像不生效？
```
output: {
    libraryTarget: "umd", // 表示打包的方式
},
```
