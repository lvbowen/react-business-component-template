## 开发调试
### 安装依赖
1. 安装开发依赖：npm install

### 启动开发服务器
1. npm run dev

### 组件打包发布
1、 index.js 去掉热更新，改成：
```
import Demo from './demo'

export default Demo;
```
2、打包：npm run build （会生成lib和dist目录，lib存放组件库文件，dist存放组件预览文件)
3、发布：npm publish （只上传lib目录）

