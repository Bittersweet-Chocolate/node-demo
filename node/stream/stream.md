# Stream相关

## writeStream实现

1. `writeStream`即`fs.createWriteStream`模块，通过buffer的方式进行文件写入。
2. 受异步写入的影响，需要加入`LinkList`链表来缓存多次写入的操作。
   1. 当多次`write`的时候，通过实例上`writing`标识，是写入还是放入实例缓存中去。
   2. `cache`即链表，以及放入的下次要写入的缓存数据。先`offer`插入，然后再每次写入完之后取插入的值，重新写入。依次循环。
3. 根据`highWaterMark`判断每次写入的范围是多少，如果超出或等于，会抛出`drain`事件，通知是否超出预期。

## readStream实现

自身关键参数：
`autoClose` | `highWaterMark` | `flowing`
--- | :---: | :--:
是否自动关闭 | 读取数量（默认64kb） | 是否流动（即控制暂停读取）

1. 同继承`events`模块，声明构造函数。
2. 被实例化的时候，打开文件，记录文件`fd`
3. 监听`newListener`，判断用户是否触发了`data`方法，则进行`read`
   1. 根据用户传入`highWaterMark`限制读入多少
   2. 看用户是否设置`end`读取多少，则用`end`减去偏移量`pos`判断是否大于`highWaterMark`限制长度。并和`highWaterMark`比较取最小
   3. 开始读取文件

## pipe

- 边读边写，集成`writeStream`、`readStream`

1. 在`readStream`中定义个`pipe`方法，通过监听`data`获取`chunk`
2. 把`chunk`塞入`writeStream`中，根据配置的`highWaterMark`标准去判断是否暂停读取
3. 当写入完成后会触发`darin`事件，通过`darin`在重新开启读入。