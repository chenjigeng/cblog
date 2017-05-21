# 使用react-rouer4.X遇到的问题

### 直接访问url后自定重定向
问题描述:
当我直接访问localhost/passage/1(id)的时候，会先进入passage/:id的界面，然后自动重定向到passage/list界面
原因：
因为我写了一个语句
```js
  <Redirect from='/passage' to='passage/list'></Redirect>
```
因此，当访问passage/1的时候，会重定向到passage/list界面


# 使用npm run 运行自定义脚本遇到的问题
问题描述：我本来是想写一个npm脚本，可以一个命令开启数据库、服务器和客户端的所有指令，但是实际上在写的时候，遇到一个问题，我一开始代码如下
```js
"start-server": "node ./server/app.js",
"start-js": "react-scripts start &",
"start": "npm run start-js & npm run server",
```
因为想着npm run可以使用&来达到并行执行命令的效果，所以我就觉得这样写应该可以达到我的目的，然而，当我执行npm run start的时候，却惊奇的发现，命令直接阻塞在start-js上面了，后面的start-server并没有执行。(win10环境下) 

当时就上网找了一些解决方案，自己测试了下，觉得比较可行的有两种
1. 使用npm-run-all
```js
"start": "npm-run-all --parallel start-server start-js"
```
2. 使用start npm run xxx & start npm run xxx这种写法(如下)
```js
  "start": "start npm run server  & start npm run start-js"
```
我个人比较推荐第一种方式，就只需要下载一个包(npm install npm-run-all --save--dev)就可以比较简单的并行执行命令，而且它是跨平台的(&的话好像只能在类unix下用，在windows下使用的话，与unix的行为不一样，所以我一开始的写法在windows下就达不到预期的效果)

第二种方式的话，它其实就是同时开多个窗口，每个窗口分别执行自己的指令 

在这里，我使用npm-run-all来并行开启后端和前端，然后利用start npm run 的方式来串行的开启数据库和服务器,代码如下
```js
"start": "npm-run-all --parallel start-backend start-js",
"start-backend": "start npm run start-db && start npm run start-server",
"start-server": "node ./server/app.js",
"start-db": "mongod",
```
