'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  title: {
    type: String,
    required: 'Kindly enter the title of the comment'
  },
  author:{
    type: String
  },
  body: {
    type: String,
    required: 'Kindly enter your comments'
  },
  stars: {
    type: Number,
    required: 'Kindly enter the stars',
    min: 0, max: 5
  },
  created: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = {
  CommentModel: mongoose.model('Comments', CommentSchema),
  CommentScheme: CommentSchema
}
