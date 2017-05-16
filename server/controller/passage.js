const mongoose = require('mongoose')
require('../models/passage')
require('../models/id')

var Passage = mongoose.model('Passage')
var Id = mongoose.model('Id')

module.exports = {
  get: function *(ctx, next) {
    console.log('123123')
    let passage = yield Passage.find({});
    ctx.type='application/json'
    console.log(JSON.stringify(passage))
    ctx.body = JSON.stringify(passage)
  },
  create: function *(ctx, next) {
    console.log(ctx.request.body)
    let data = {}
    try {
      data = JSON.parse(ctx.request.body);
      console.log(data)
    } catch(e) {
      data.title = ctx.request.body.title
      data.content = ctx.request.body.content
    }
    
    //创建自增ID
    id = yield Id.findOneAndUpdate({"name": "passage"}, {$inc:{'id':1}}).exec().then();
    id = id ? id: yield Id.create({"name": 'passage', 'id': 1 })
    data.pid = id.id
    result = yield Passage.create(data)
    ctx.body = JSON.stringify(result);
    ctx.status = 200;
  },
  getById: function *(ctx, next) {
    console.log(ctx.request.body)
    console.log(ctx.params.pid)
    let pid = ctx.params.pid
    let passage = yield Passage.find({pid: pid })
    if (passage.length === 0) {
      let response = {
        status: 404,
        body: '没有该文章'
      }
      ctx.body = JSON.stringify(response)
      ctx.status = 200
      return;
    }
    let response = {
      status: 200,
      passage: passage[0]
    }
    ctx.body = JSON.stringify(response)
    ctx.status = 200
  }
}