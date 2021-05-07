'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuantitySchema = require('../models/quantityModel');


var IngredientsSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the Category'
  },
  quantities: [QuantitySchema],
  created: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = mongoose.model('Ingredients', IngredientsSchema);
