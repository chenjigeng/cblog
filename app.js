var koa = require('koa')
var serve = require('koa-static')
var fs = require('fs')

const app = new koa()

app.use(serve('./build'))

app.use(async (ctx, next) => {
  ctx.type = 'html'
  ctx.body = fs.createReadStream('./build/index.html')
})

app.listen(80, function() {
  console.log('connect');
});