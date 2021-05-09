'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var QuantitySchema = new Schema({
  quantity: {
    type: Number,
    min: 0,
    required: 'Kindly enter the name of the Category'
  },
  created: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = {
  QuantityModel: mongoose.model('Quantity', QuantitySchema),
  QuantitySchema: QuantitySchema,
}
