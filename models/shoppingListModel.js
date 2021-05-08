'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngredientsSchema = require('../models/ingredientModel');

var ShoppingListSchema = new Schema({
  size: {
    type: Number,
  },
  ingredients: [IngredientsSchema],
  created: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = mongoose.model('ShoppingLists', ShoppingListSchema);
