# promise实现

1. promise内部包含`status`状态、`value`成功结果、`reason`失败结果、`onResolvedCB`存储`then`的回调函数、`onRejectedCB`失败回调

2. promise在new的时候会传入一个`executor`函数，然后立即执行该函数`executor`，传入成功和失败的方法，并且出错的话直接走失败的逻辑。(成功、失败方法都对promise的状态和值进行了处理)

3. 执行then方法，会传入成功回调，失败回调。
