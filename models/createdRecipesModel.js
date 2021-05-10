'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipe = require('./recipeModel');

var CreatedRecipesSchema = new Schema({
  recipes: [Schema.Types.ObjectId],
  created: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = { 
  CreatedRecipesModel: mongoose.model('CreatedRecipes', CreatedRecipesSchema),
  CreatedRecipesSchema: CreatedRecipesSchema
}
