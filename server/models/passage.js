var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PassageSchema = new mongoose.Schema({
  _pid: Schema.Types.ObjectId,
  title: String,
  content: String,
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  },
  authorId: Schema.Types.ObjectId 
})

module.export = mongoose.model('Passage', PassageSchema);