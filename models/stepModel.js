'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StepSchema = new Schema({
  step: {
    type: Number,
    min: 0,
    required: 'Kindly enter the name of the Category'
  },
  description: {
    type: String,
    required: 'Kindly enter the description of the Category'
  },
  picture: {
    data: Buffer,
    contentType: String
  },
  created: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = {
  StepsModel: mongoose.model('Step', StepSchema),
  StepSchema: StepSchema
}
