## commonjs规范
common 实现的思想
### require引入文件流程
>注意：更改exports的引用，不会导致module.exports的变化
>详见：why_use_this_by_exports

1. 首先require语法是同步的，利用fs.readFileSync处理
2. 接收的返回是module.exports
3. 模块是动态加载的，每次加载require都会获取最新的导出结果
4. 创建一个Module类，包含exports/id两个属性，load方法
5. 加载_load方法，首先通过_getFilePath方法进行文件获取。
6. 判断文件是否存在，存在则继续判断，当前文件是否被解析缓存过
7. 没有被缓存过，则实例化一个Module，加载实例的load方法
8. 加载load获取文件拓展名，根据文件拓展名执行不同的方法，进行文件的获取。通过策略模式执行。
9. 解析js文件，读取文件内容，再以字符串的形式拼接成一个自运行函数，最后通过vm模块解析成函数。执行该函数，this执行变成module实例下的exports。这样是为了文件导出的不同类型去接收。
10. 接收方式有module.exports/exports/this等等。
11. 这样就在module.exports这个实例上获取到了这个文件的内容。