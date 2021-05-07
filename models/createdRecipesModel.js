'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = require('../models/recipeModel');

var CreatedRecipesSchema = new Schema({
  recipes: [RecipeSchema],
  created: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = mongoose.model('CreatedRecipes', CreatedRecipesSchema);
