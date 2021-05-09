'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipe = require('./recipeModel');

var FavouriteListSchema = new Schema({
  recipes: [recipe.RecipeSchema],
  created: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = {
  FavouriteListModel: mongoose.model('FavouriteList', FavouriteListSchema),
  FavouriteListSchema: FavouriteListSchema
}
