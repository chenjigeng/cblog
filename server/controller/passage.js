const mongoose = require('mongoose')
require('../models/passage')

var Passage = mongoose.model('Passage')

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
    let data = JSON.parse(ctx.request.body);
    result = yield Passage.create(data)
    console.log(result)
    ctx.body = JSON.stringify(result);
    ctx.status = 200;
  } 
}