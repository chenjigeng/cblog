var koa = require('koa')
var route = require('koa-route')
var mongoose = require('mongoose')
var config = require('./config')
const co = require('co')
const router = require('./router/index')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaBody = require('koa-body')
var serve = require('koa-static')
var fs = require('fs')

const app = new koa()


//连接数据库
mongoose.connect(config.db.path)


app.use(logger())
// app.use(bodyParser());
app.use(koaBody())

app.use(router.routes())
app.use(serve('./build'))

app.use(async (ctx, next) => {
  ctx.type = 'html'
  ctx.body = fs.createReadStream('./build/index.html')
})

app.listen(8000, function() {
  console.log('connect');
});

