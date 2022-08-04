# writeStream实现

`writeStream`即`fs.createWriteStream`模块，通过buffer的方式进行文件写入。

## writeSteam 核心理念

1. 根据`highWaterMark`判断每次写入的范围是多少
2. 每次写入`chunk`


writeStream 同样基于events模块进行开发。
