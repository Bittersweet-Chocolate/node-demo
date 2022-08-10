# writeStream实现

1. `writeStream`即`fs.createWriteStream`模块，通过buffer的方式进行文件写入。
2. 受异步写入的影响，需要加入`LinkList`链表来缓存多次写入的操作。
   1. 当多次`write`的时候，通过实例上`writing`标识，是写入还是放入实例缓存中去。
   2. `cache`即链表，以及放入的下次要写入的缓存数据。先`offer`插入，然后再每次写入完之后取插入的值，重新写入。依次循环。
3. 根据`highWaterMark`判断每次写入的范围是多少，如果超出或等于，会抛出`darin`事件，通知是否超出预期。
