const mongoose = require('mongoose')
const co = require('co')
require('../models/id')
require('../models/passage')

var Passage = mongoose.model('Passage')
var passageCtrl = require('../controller/passage')

module.exports = function(router) {
  console.log('123123')
  router
    .get('/api/passage', co.wrap(passageCtrl.get))
    .post('/api/passage', co.wrap(passageCtrl.create))
    .get('/api/passage/:pid', co.wrap(passageCtrl.getById))

}