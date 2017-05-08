var router = require('koa-router')()
var passageRouterInit = require('./passage')

passageRouterInit(router)

module.exports = router;