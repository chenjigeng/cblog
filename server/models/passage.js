var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PassageSchema = new mongoose.Schema({
  pid: Number,
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
  authorId: Schema.Types.ObjectId,
  watch: {
    type: Number,
    default: 0
  },
  comments: {
    type: Array,
    default: []
  }
})

module.export = mongoose.model('Passage', PassageSchema);