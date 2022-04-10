Node buffer：

JS对于字符串操作十分友好，无论是单字节字符串还是宽字节字符串，都被认为是一个字符串。

```js
“console.log("0123456789".length); // 10
console.log("零一二三四五六七八九".length); //10
console.log("\u00bd".length); // 1”
```

在前端中，我们只需要处理和DOM/字符串处理相关的基本需求，在Node中，应用需要处理网络协议，图片，数据库相关的内容，在网络和文件的传输中，涉及到大量的二进制文件。JS字符串没有办法满足这样的需求，于是有了Buffer。

预先转黄静态内容为Buffer对象，可以有效的减少CPU压力可以节省CPU资源。此处在SSR的地方也可以优化。

highWaterMark设置对于Buffer内存的分配和使用有一定的影响。其设置越小那么系统中需要去访问文件系统的次数就越多。一般来说highWaterMark设置越大，那么速度越快。





Node 异步编程：

这本书介绍了大量的异步编程的方法，但是在2022年的今天，基本上都已经被大一统为promise/A+ async/await 的解决方法了。



Node 内存控制：(这部分和GC那一部分一起来讲)



Node网络编程：（需要实践）

websocket：

1.是真正的全双工方式，简历连接后客户端与服务端是完全平等的，可以互相主动发送请求。而HTTP长连接基于HTTP，是传统的客户端对服务器发送请求的模式。

2.HTTP长连接中，每次数据交换除了真正的数据部分外，服务器和客户端还需要大量交互HTTP header，通信效率比较低下。WebSocket协议通过第一个request建立了TCP连接后，之后交换的数据都需要发送HTTP header就可以交换数据，这显然和原有的HTTP协议有区别，所以他需要对服务器和客户端都进行升级才能实现（主流服务器都已经支持H5）。此外还有multiplex、不同的URL可以复用同一个WebSocket连接等功能。这些都是HTTP长连接中不能做到的。



如何建立连接：

客户端申请协议升级：

```
GET / HTTP/1.1
Host: localhost:8080
Origin:http://127.0.0.1:3000[/url]
Connection: Upgrade // 表明需要升级协议
Upgrade: websocket // 升级为websocket
Sec-WebSocket-Version: 13 
Sec-WebSocket-Key: w4v7O6xFTi36lq3RNcgctw== //与后面服务端响应首部的Sec-WebSocket-Accept是配套的，提供基本的防护，比如恶意的连接，或者无意的连接。
```

服务端返回数据

```
HTTP/1.1 101 Switching Protocols
Connection:Upgrade
Upgrade: websocket
Sec-WebSocket-Accept: Oy4NRAQ13jhfONC7bP8dTKb4PTU=
```

Sec-WebSocket-Accept 的计算

1.将 Sec-WebSocket-Key跟258EAFA5-E914-47DA-95CA-C5AB0DC85B11拼接；

2.通过SHA1计算出来摘要，并转换为base64.

伪代码为：

1>toBase64(sha1(Sec-WebSocket-Key + 258EAFA5-E914-47DA-95CA-C5AB0DC85B11))



数据帧格式：

客户端、服务端传输过程中离不开数据帧格式的定义。WebSocket客户端、服务端通信的最小单位是帧（frame），由一个或者多个帧组成一条完整的信息（Message）。

https://datatracker.ietf.org/doc/html/rfc6455?spm=5176.100239.blogcont334155.13.789c995lTKjFN#section-5.2



保持连接+心跳：



HTTPs：



Session与安全问题：

尽管我们所有的数据都存放在后端，但是是使用Cookie的方式还是存在一定的问题，因为sessionId这个部分还是明文存储的，如果Web用户非常多，那么就可以通过随机尝试sessionId的方式试出来一部分用户信息。所以说cookie中存储sessionId的方式不是很安全。那么我们可以借助一定的方式去解决这个问题就是对sessionId进行签名，那么如果他不知道密钥的话，实际上没有办法去伪造sesssionId，所以说这个问题就解决了。但是还有一个问题就是说如果别人拿到了这个sessionId其实他不需要去解开这个签名，也可以进行登录访问。那么我们就可以加入一些客户端独有的某些信息作为原始值可以增强信息的稳健型。这样即使别人获取到了这个sessionId也没有办法使用，因为他的客户端信息对应不上。



构建Web应用中：

数据上传与安全问题：

1.内存限制：在解析表单、JSON和XML部分，我们采取



模版引擎问题



后面还有 多线程多进程问题、测试问题、产品化问题。三个主要方面