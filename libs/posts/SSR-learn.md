SSR学习



通过 BrowserRouter 我们能够匹配到浏览器即将显示的路由组件，对浏览器来说，我们需要把组件转化成 DOM，所以需要我们使用 ReactDom.render 方法来进行 DOM 的挂载。而 StaticRouter 能够在服务器端匹配到将要显示的组件，对服务器端来说，我们要把组件转化成字符串，这时我们只需要调用 ReactDom 提供的 renderToString 方法，就可以得到 App 组件对应的 HTML 字符串。



对于一个 React 应用来说，路由一般是整个程序的执行入口。在 SSR 中，服务器端的路由和客户端的路由不一样，也就意味着服务器端的入口代码和客户端的入口代码是不同的。



我们知道， React 代码是要通过 Webpack 打包之后才能运行的，也就是第 3 步和第10 步运行的代码，实际上是源代码打包过后生成的代码。上面也说到，服务器端和客户端渲染中的代码，只有一部分一致，其余是有区别的。所以，针对代码运行环境的不同，要进行有区别的 Webpack 打包。

webpack打包区别

(客户端)

```
{
  entry: './src/client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader'
    },{
      test: /\.css?$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {modules: true}
      }]
    },{
      test: /\.(png|jpeg|jpg|gif|svg)?$/,
      loader: 'url-loader',
      options: {
        limit: 8000,
        publicPath: '/'
      }
    }]
  }
}
```

（服务端）

```
{
  target: 'node',
  entry: './src/server/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  externals: [nodeExternals()],
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader'
    },{
      test: /\.css?$/,
      use: ['isomorphic-style-loader', {
        loader: 'css-loader',
        options: {modules: true}
      }]
    },{
      test: /\.(png|jpeg|jpg|gif|svg)?$/,
      loader: 'url-loader',
      options: {
        limit: 8000,
        outputPath: '../public/',
        publicPath: '/'
      }
    }]
  }
};
```

**对于核心模块：**在服务器端运行的代码，有时我们需要引入 Node 中的一些核心模块，我们需要 Webpack 做打包的时候能够识别出类似的核心模块，一旦发现是核心模块，不必把模块的代码合并到最终生成的代码中，解决这个问题的方法非常简单，在服务器端的 Webpack配置中，你只要加入 target: node 这个配置即可。target:node告知webpack打包的目标环境是node环境，所以对于一些node的核心模块，解决起来也比较方便。



**对于第三方模块：**服务器端渲染的代码，如果加载第三方模块，这些第三方模块也是不需要被打包到最终的源码中的，因为 Node 环境下通过 NPM 已经安装了这些包，直接引用就可以，不需要额外再打包到代码里。为了解决这个问题，我们可以使用 webpack-node-externals 这个插件，代码中的 nodeExternals 指的就是这个插件，通过这个插件，我们就能解决这个问题。关于 Node 这里的打包问题，可能看起来有些抽象，不是很明白的同学可以仔细读一下 webpack-node-externals 相关的文章或文档，你就能很好的明白这里存在的问题了。



**对于CSS打包：**而在客户端代码打包配置中，我们使用了 css-loader 和 style-loader，css-loader 不但会在 DOM 上生成 class 类名，解析好的 CSS 代码，还会通过 style-loader 把代码挂载到页面上。不过这么做，由于页面上的样式实际上最终是由客户端渲染时添加上的，所以页面可能会存在一开始没有样式的情况，为了解决这个问题， 我们可以在服务器端渲染时，拿到 isomorphic-style-loader 返回的样式代码，然后以字符串的形式添加到服务器端渲染的 HTML 之中。





