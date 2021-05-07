'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const customAlphabet = require("nanoid").customAlphabet;
const skuGenerator = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 6)

var CategorySchema = require('../models/categoryModel');
var CommentSchema = require('../models/commentModel');
var StepsSchema = require('../models/stepModel');
var IngredientsSchema = require('../models/ingredientsModel');

var RecipeSchema = new Schema({
  sku: {
    type: String,
    unique: true,
    //NOTICE that This validation is not executed after the middleware pre-save
    validate: {
      validator: function(v) {
          return /^\w{6}$/.test(v);
      },
      message: 'sku is not valid!, Pattern("^\w{6}$")'
    }
  },
  name: {
    type: String,
    required: 'Kindly enter the item name'
  },
  description: {
    type: String,
    required: 'Kindly enter the description'
  },
  picture: {
    data: Buffer,
    contentType: String
  },
  preparationTime: {
    type: Number,
    required: 'Kindly enter the preparation time'
  },
  stars: {
    type: Number,
    min: 0, max: 5
  },
  difficultLevel: {
    type: Number,
    min: 0, max: 5
  },
  protein: {
    type: Number,
    min: 0,
  },
  fat: {
    type: Number,
    min: 0,
  },
  sodium: {
    type: Number,
    min: 0,
  },
  calories: {
    type: Number,
    min: 0,
  },
  linkVideo: {
    type: String
  },
  category: [CategorySchema],
  comments: [CommentSchema],
  steps: [StepsSchema],
  ingredients: [IngredientsSchema],
  created: {
    type: Date,
    default: Date.now
  }
},  { strict: false });

// Execute before each item.save() call
RecipeSchema.pre('save', function(callback) {
  var new_item = this;
  new_item.sku = skuGenerator();
  callback();
});

RecipeSchema.index({ category: 1, price: 1 }); //1 ascending,  -1 descending
RecipeSchema.index({ name: 'text', description: 'text', sku: 'text' });

module.exports = mongoose.model('Recipes', RecipeSchema);

