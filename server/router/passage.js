const mongoose = require('mongoose')
const co = require('co')
require('../models/passage')

var Passage = mongoose.model('Passage')
var passageCtrl = require('../controller/passage')

module.exports = function(router) {
  router
    .get('/api/passage', co.wrap(passageCtrl.get))
    .post('/api/passage', co.wrap(passageCtrl.create));

}