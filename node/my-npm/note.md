## npm node包管理器，管理的都是node模块
- nrm（node中的源管理工具） nvm（node版本管理工具）

## 自己编写全局包
举例computed 1 2 3 4
1. 创建bin的文件夹
2. `package.json`设置bin对象配置执行命令
3. 放到npm全局（上传后下载-g，临时`npm link`）
### 通过npm-link
1. 运行文件加上 `#! /usr/bin/env node`

## 安装项目包

- `peerDependencies`
  同等依赖，兼容宿主版本的依赖
- `bundleDependencies`
  打包依赖，执行`npm pack`的时候是否加入进去
- `optionalDependencies`
  可选依赖，如果有一些依赖包即使安装失败，项目仍然能够运行或者希望npm继续运行。会覆盖`dependencies`

## 版本问题
- major(破坏性跟新)minor(新增更新，修订大版本的功能)patch(小的bug)

## 运行脚本问题
- 默认运行`npm run`会将`node_modules`下的.bin目录放到全局下的所有可以使用当前文件夹的命令。可以通过`npm run env`查看添加的环境。
- `npx` 命令等于`npm run`。`npx`会自动下载包执行再删除。