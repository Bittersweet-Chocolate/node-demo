## npm node包管理器，管理的都是node模块
- nrm（node中的源管理工具） nvm（node版本管理工具）

## 自己编写全局包
举例computed 1 2 3 4
1. 创建bin的文件夹
2. `package.json`设置bin对象配置执行命令
3. 放到npm全局（上传后下载-g，临时`npm link`）
### 通过npm-link
1. 运行文件加上 `#! /usr/bin/env node`