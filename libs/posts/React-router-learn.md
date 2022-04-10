React-router 学习



调用history，createHistoryBrowser createHashBrowser 这个方法返回关于bom上的history的各个属性。 history 的两个函数分别是监听 popState 和 hashChange 这个事件。它内部拥有一个发布订阅机制。通过返回的history.listen 来收集订阅者。

在BrowserRouter 中，我们通过两个context，来传递，history中传递下来的各个变量。 同时监听。

将history的属性用 useState包裹之后，使用useEffect来监听[history]，当history变化的时候，使用setHistory来重新给history赋值，通过history.listern将setHistory传递。