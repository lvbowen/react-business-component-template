## react business component template

> 用于对接zoo cli命令行工具的脚手架模版

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