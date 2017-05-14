var mongoose = require('mongoose')
var Schema = mongoose.Schema

var IdSchema = new mongoose.Schema({
  name: String,
  id: {
    type: Number,
    default: 0
  }
})

module.export = mongoose.model('Id', IdSchema);