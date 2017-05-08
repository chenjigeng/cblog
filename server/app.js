var koa = require('koa')
var route = require('koa-route')
var mongoose = require('mongoose')
var config = require('./config')
const co = require('co')
const router = require('./router/index')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaBody = require('koa-body')
var res_api = require('koa.res.api')

const app = new koa()

//连接数据库
mongoose.connect(config.db.path)


app.use(logger())
app.use(bodyParser());
app.use(koaBody())
app.use(res_api())

app.use(router.routes())
app.listen(8000, function() {
  console.log('connect');
});

